import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import { useSearch } from "../../contexts/SearchContext";
import { useSlippage } from "../../contexts/SlippageContext";

/* ========================= Helpers ========================= */
const EPS = 1e-6;

// ✅ Format numbers with commas instead of K/M/Cr/L
const formatWithCommas = (n, symbol = "₹") => {
  if (!Number.isFinite(n)) return "-";
  if (n === 0) return "₹0";
  
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(n);
  
  // Format with commas and 2 decimal places
  const formatted = v.toLocaleString("en-IN", { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
  
  return `${sign}${symbol}${formatted}`;
};

// ✅ Parse API date string directly (no timezone conversion)
const parseApiDate = (dateString) => {
  if (!dateString) return null;
  
  // Parse format like "2024-10-16T11:45:00.000Z"
  const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return null;
  
  const [, year, month, day, hours, minutes] = match;
  
  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    hours: parseInt(hours),
    minutes: parseInt(minutes)
  };
};

// ✅ Format date using API data directly
const formatDate = (dateString) => {
  const parsed = parseApiDate(dateString);
  if (!parsed) return "";
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return `${String(parsed.day).padStart(2, '0')} ${monthNames[parsed.month - 1]} ${parsed.year}`;
};

// ✅ Format time using API data directly (shows IST time as-is)
const formatTime = (dateString) => {
  const parsed = parseApiDate(dateString);
  if (!parsed) return "";
  
  return `${String(parsed.hours).padStart(2, '0')}:${String(parsed.minutes).padStart(2, '0')}`;
};

// ✅ Format for X-axis using API data directly
const fmtMonthYear = (dateString) => {
  const parsed = parseApiDate(dateString);
  if (!parsed) return "";
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const dateStr = `${monthNames[parsed.month - 1]} ${parsed.year}`;
  const timeStr = `${String(parsed.hours).padStart(2, '0')}:${String(parsed.minutes).padStart(2, '0')}`;
  
  return `${dateStr}\n${timeStr}`;
};

/** Insert a synthetic point at y=0 for each sign change and build pos/neg series with nulls */
function prepareForAreas(items) {
  if (!items?.length) return [];
  const out = [];
  for (let i = 0; i < items.length; i++) {
    const cur = { ...items[i] };
    const val = Math.abs(cur.equity) < EPS ? 0 : cur.equity;

    if (i > 0) {
      const prev = out[out.length - 1];
      if (prev && prev.equity !== 0 && val !== 0 && (prev.equity > 0) !== (val > 0)) {
        const dy = val - prev.equity;
        const dt = cur.ts - prev.ts || 1;
        const ratio = Math.abs(prev.equity) / Math.abs(dy);
        const ts0 = Math.round(prev.ts + ratio * dt);
        out.push({ ...prev, ts: ts0, equity: 0 });
      }
    }
    out.push({ ...cur, equity: val });
  }

  return out.map((d) => ({
    ...d,
    greenLine: d.equity > 0 ? d.equity : d.equity === 0 ? 0 : null,
    redLine: d.equity < 0 ? d.equity : d.equity === 0 ? 0 : null,
  }));
}

/* ========================= Tooltip ========================= */
const CustomTooltip = ({ active, payload, label }) => {
  if (!(active && payload && payload.length)) return null;
  const p = payload[0]?.payload;
  const val = p?.equity ?? 0;
  
  // ✅ Use original API date string for formatting
  const originalDateString = p?.originalApiDate;
  
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-lg px-4 py-3 min-w-[200px]">
      <div className="flex flex-col gap-2">
        <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">
          Profit / Loss
        </div>
        <div className={`font-bold text-lg ${val >= 0 ? "text-[#1F950C]" : "text-[#DA0909]"}`}>
          {formatWithCommas(val)}
        </div>
        {/* ✅ Show Date and Time using API time (IST) */}
        <div className="flex gap-4 justify-center items-center text-xs text-gray-500">
          <div>
            Date: <span className="font-medium">{formatDate(originalDateString)}</span>
          </div>
          <div>
            Time: <span className="font-medium">{formatTime(originalDateString)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================= Component ========================= */
const RunChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // zoom / pan
  const [zoomDomain, setZoomDomain] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [isPointerOver, setIsPointerOver] = useState(false);

  const chartContainerRef = useRef(null);
  const chartCanvasRef = useRef(null);

  const location = useLocation();
  const selectedId = location.state?._id;
  const dateRange = location.state?.dateRange;

  const { selectedInstrument } = useSearch();
  const { slippageType, slippageValue, isApplied, lastAppliedAt } = useSlippage();

  const instrumentId = selectedInstrument?._id;
  const startDate = dateRange?.from || "2020-03-22";
  const endDate = dateRange?.to || "2025-08-02";

  /* ---------- fetch data ---------- */
  useEffect(() => {
    async function fetchChartData() {
      if (!selectedId) {
        setChartData([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(undefined);

      try {
        let apiUrl = `getWebInstrumentChartData/${selectedId}?start_date=${startDate}&end_date=${endDate}`;
        if (instrumentId) apiUrl += `&chip_id=${instrumentId}`;
        if (isApplied && slippageValue > 0) {
          const t =
            slippageType === "%" || slippageType === "percentage"
              ? "percentage"
              : String(slippageType).toLowerCase();
          apiUrl += `&slippage=${slippageValue}&slippage_type=${t}`;
        }

        const res = await api.get(apiUrl);
        const resData = res.data;

        if (resData?.status && Array.isArray(resData.data)) {
          const formatted = resData.data.map((d, index) => {
            const dateObj = new Date(d.date); // Still need this for chart positioning
            const equity = Number(d.equity) || 0;
            return {
              ...d,
              index,
              ts: dateObj.getTime(), // numeric X axis for chart
              equity,
              originalDate: dateObj,
              originalApiDate: d.date, // ✅ Keep original API date string
              displayDate: d.date, // ✅ For X-axis display
            };
          });

          formatted.sort((a, b) => a.ts - b.ts);
          setChartData(prepareForAreas(formatted));
          setZoomDomain(null);
        } else {
          setError("No chart data found");
          setChartData([]);
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Failed to load chart data");
        setChartData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchChartData();
  }, [selectedId, instrumentId, startDate, endDate, slippageType, slippageValue, isApplied, lastAppliedAt]);

  const hasNegativeValues = chartData.some((d) => d.equity < 0);
  const hasPositiveValues = chartData.some((d) => d.equity > 0);

  /* ---------- zoom helpers ---------- */
  const getCurrentData = () => {
    if (!zoomDomain || !chartData.length) return chartData;
    const { startIndex, endIndex } = zoomDomain;
    const pad = Math.max(1, Math.floor((endIndex - startIndex) * 0.1));
    const s = Math.max(0, startIndex - pad);
    const e = Math.min(chartData.length - 1, endIndex + pad);
    return chartData.slice(s, e + 1);
  };

  const getYAxisDomain = () => {
    const cur = getCurrentData();
    if (!cur.length) return [-1000, 1000];
    const vals = cur.map((d) => d.equity).filter((x) => Number.isFinite(x));
    if (!vals.length) return [-1000, 1000];

    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const span = max - min || Math.max(Math.abs(max), Math.abs(min)) || 1;
    const pad = Math.max(span * 0.1, Math.abs(max) * 0.05, Math.abs(min) * 0.05, 100);

    let lo = min - pad;
    let hi = max + pad;
    if (min >= 0) lo = Math.min(lo, -pad * 0.3);
    if (max <= 0) hi = Math.max(hi, pad * 0.3);
    return [lo, hi];
  };

  const generateYAxisTicks = () => {
    const [minVal, maxVal] = getYAxisDomain();
    const range = maxVal - minVal;
    const zoomLevel = zoomDomain ? chartData.length / (zoomDomain.endIndex - zoomDomain.startIndex + 1) : 1;
    const tickCount = Math.min(10, Math.max(5, Math.floor(8 * Math.log10(zoomLevel + 1))));
    const step = range / tickCount;
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) ticks.push(minVal + step * i);
    if (minVal <= 0 && maxVal >= 0 && !ticks.some((t) => Math.abs(t) < step * 0.1)) ticks.push(0);
    return ticks.sort((a, b) => a - b).map((t) => (Math.abs(t) < 0.01 ? 0 : Math.round(t)));
  };

  const canZoomInDirection = useCallback(
    (isIn) => {
      if (!chartData.length) return false;
      if (!zoomDomain) return isIn;
      const currentRange = zoomDomain.endIndex - zoomDomain.startIndex + 1;
      const minRange = Math.max(5, Math.floor(chartData.length * 0.05));
      return isIn ? currentRange > minRange : currentRange < chartData.length;
    },
    [chartData, zoomDomain]
  );

  /* ---------- Wheel (zoom) – hard block page scroll ---------- */
  const wheelZoom = useCallback(
    (e) => {
      const el = chartCanvasRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const { clientX: x, clientY: y } = e;
      const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      if (!inside) return;

      // Always block page scroll when over chart
      e.preventDefault();
      e.stopPropagation();

      if (!chartData.length || isZooming) return;

      const isZoomIn = e.deltaY < 0;
      const canZoom = canZoomInDirection(isZoomIn);
      if (!canZoom) return;

      setIsZooming(true);

      const current = zoomDomain || { startIndex: 0, endIndex: chartData.length - 1 };
      const currentRange = current.endIndex - current.startIndex + 1;
      const minRange = Math.max(5, Math.floor(chartData.length * 0.05));
      const maxRange = chartData.length;
      const sensitivity = e.ctrlKey ? 0.16 : 0.08;

      const newRange = isZoomIn
        ? Math.max(minRange, Math.floor(currentRange * (1 - sensitivity)))
        : Math.min(maxRange, Math.ceil(currentRange * (1 + sensitivity)));

      const mouseRatio = (x - rect.left) / rect.width;
      const center = current.startIndex + currentRange * mouseRatio;

      let start = Math.round(center - newRange / 2);
      let end = start + newRange - 1;
      if (start < 0) { start = 0; end = newRange - 1; }
      if (end >= chartData.length) { end = chartData.length - 1; start = Math.max(0, end - newRange + 1); }

      if (newRange >= chartData.length) setZoomDomain(null);
      else setZoomDomain({ startIndex: start, endIndex: end });

      setTimeout(() => setIsZooming(false), 30);
    },
    [chartData, zoomDomain, isZooming, canZoomInDirection]
  );

  // Attach non-passive listeners (capture) + global safety block when pointer is over chart
  useEffect(() => {
    const el = chartCanvasRef.current;
    if (!el) return;

    const onEnter = () => setIsPointerOver(true);
    const onLeave = () => setIsPointerOver(false);

    el.addEventListener("wheel", wheelZoom, { passive: false, capture: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // Safety: if parent container intercepts the wheel, still block page scroll while pointer is over chart
    const blockWindowScroll = (e) => {
      if (!isPointerOver) return;
      e.preventDefault();
    };
    window.addEventListener("wheel", blockWindowScroll, { passive: false, capture: true });

    return () => {
      el.removeEventListener("wheel", wheelZoom, { capture: true });
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("wheel", blockWindowScroll, { capture: true });
    };
  }, [wheelZoom, isPointerOver]);

  /* ---------- Pan (mouse drag) ---------- */
  const handleMouseDown = useCallback(
    (e) => {
      if (!zoomDomain || isPanning) return;
      const el = chartCanvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      e.preventDefault();
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      el.style.cursor = "grabbing";
    },
    [zoomDomain, isPanning]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isPanning || !lastPanPoint || !zoomDomain) return;
      e.preventDefault();
      const deltaX = e.clientX - lastPanPoint.x;
      const containerWidth = chartContainerRef.current?.offsetWidth || 800;
      const currentRange = zoomDomain.endIndex - zoomDomain.startIndex + 1;
      const sensitivity = (currentRange / containerWidth) * 0.8;
      const indexDelta = Math.round(-deltaX * sensitivity);

      let start = zoomDomain.startIndex + indexDelta;
      let end = zoomDomain.endIndex + indexDelta;
      const actualRange = end - start;

      if (start < 0) { start = 0; end = actualRange; }
      if (end >= chartData.length) { end = chartData.length - 1; start = end - actualRange; }

      setZoomDomain({ startIndex: Math.max(0, start), endIndex: Math.min(chartData.length - 1, end) });
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    },
    [isPanning, lastPanPoint, zoomDomain, chartData]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!isPanning) return;
      e.preventDefault();
      setIsPanning(false);
      setLastPanPoint(null);
      if (chartCanvasRef.current) chartCanvasRef.current.style.cursor = zoomDomain ? "grab" : "default";
    },
    [isPanning, zoomDomain]
  );

  useEffect(() => {
    if (!isPanning) return;
    const mm = (e) => handleMouseMove(e);
    const mu = (e) => handleMouseUp(e);
    document.addEventListener("mousemove", mm, { passive: false });
    document.addEventListener("mouseup", mu);
    document.addEventListener("mouseleave", mu);
    return () => {
      document.removeEventListener("mousemove", mm);
      document.removeEventListener("mouseup", mu);
      document.removeEventListener("mouseleave", mu);
    };
  }, [isPanning, handleMouseMove, handleMouseUp]);

  /* ---------- Loading / error UI ---------- */
  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[320px]">
        <div className="text-center px-4">
          <div className="text-sm text-gray-400">Loading chart...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[320px]">
        <div className="text-sm text-gray-400">{error}</div>
      </div>
    );

  if (!selectedId)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[320px]">
        <div className="text-sm text-gray-400">No strategy selected</div>
      </div>
    );

  if (!chartData.length)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[320px]">
        <div className="text-sm text-gray-400">No chart data available</div>
      </div>
    );

  const yAxisTicks = generateYAxisTicks();
  const currentData = getCurrentData();

  /* ---------- Render ---------- */
  return (
    <>
      <style jsx>{`
        .chart-container * { outline: none !important; }
        .chart-container { user-select: none; touch-action: none; transition: cursor 0.1s ease; }
        .chart-canvas { position: relative; width: 100%; height: 100%; overflow: hidden; overscroll-behavior: contain; }
        .chart-wrapper { position: relative; width: 100%; height: 100%; isolation: isolate; }
        .chart-container { cursor: ${isPanning ? "grabbing" : zoomDomain ? "grab" : "default"}; }
      `}</style>

      <div className="chart-wrapper" ref={chartContainerRef}>
        <div
          ref={chartCanvasRef}
          className="chart-canvas chart-container w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] xl:min-h-[450px]"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 20, right: 16, left: 10, bottom: 58 }}>
              <defs>
                <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(22,163,74,0.28)" />
                  <stop offset="100%" stopColor="rgba(22,163,74,0.06)" />
                </linearGradient>
                <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(220,38,38,0.26)" />
                  <stop offset="100%" stopColor="rgba(220,38,38,0.06)" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#F0F0F0" strokeWidth={0.8} vertical={false} />

              {/* ✅ X-axis using API date for display */}
              <XAxis
                dataKey="displayDate"
                type="category"
                tickFormatter={(v) => fmtMonthYear(v)}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 400 }}
                height={55}
                angle={-45}
                textAnchor="end"
                minTickGap={40}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 400 }}
                width={90}
                domain={getYAxisDomain()}
                ticks={yAxisTicks}
                allowDataOverflow={false}
                tickFormatter={(v) => formatWithCommas(v)}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }} />

              {hasPositiveValues && (
                <Area
                  type="linear"
                  dataKey="greenLine"
                  stroke="#1F950C"
                  strokeWidth={2.2}
                  fill="url(#positiveGradient)"
                  dot={false}
                  isAnimationActive={false}
                  connectNulls={false}
                />
              )}

              {hasNegativeValues && (
                <Area
                  type="linear"
                  dataKey="redLine"
                  stroke="#DA0909"
                  strokeWidth={2.2}
                  fill="url(#negativeGradient)"
                  dot={false}
                  isAnimationActive={false}
                  connectNulls={false}
                />
              )}

              <ReferenceLine y={0} stroke="#374151" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default RunChart;
