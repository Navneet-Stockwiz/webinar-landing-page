import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import { useSearch } from "../../contexts/SearchContext";
import { useSlippage } from "../../contexts/SlippageContext";

const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_SHORT_TO_FULL = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

// Utility function to check if a month/year should be shown (hide future dates)
const isPastOrCurrentMonth = (monthLabel, year) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based (0 = January)

  const monthIndex = MONTH_ORDER.indexOf(monthLabel);
  const yearInt = parseInt(year);

  // Hide if year is in the future
  if (yearInt > currentYear) {
    return false;
  }

  // Hide if same year but month is in the future
  if (yearInt === currentYear && monthIndex > currentMonth) {
    return false;
  }

  return true;
};

// Utility function to filter years (hide future years)
const filterPastYears = (years) => {
  const currentYear = new Date().getFullYear();
  return years.filter((year) => parseInt(year) <= currentYear);
};

// Single Progress Bar for Mobile
const SingleProgressBar = ({ hit, miss, profit, loss, name }) => {
  const total = hit + miss;
  const hitPercent = total > 0 ? (hit / total) * 100 : 0;
  const totalPnL = Math.abs(profit) + Math.abs(loss);
  const profitPercent = totalPnL > 0 ? (Math.abs(profit) / totalPnL) * 100 : 0;

  const formatCurrency = (value) => {
    const absValue = Math.abs(value);
    return `₹${absValue.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="w-full mb-4 p-4">
      {name && (
        <div className="font-medium text-[14px] leading-[100%] text-[#000000BF] mb-2">
          {name}
        </div>
      )}

      {/* Profit/Loss Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={hitPercent}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "#F0A301",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#407AFF",
          },
        }}
      />

      <div className="flex justify-between items-center mt-2">
        {/* Profit on left */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#407AFF]"></div>
          <span className="font-semibold text-[12px] leading-[160%] text-[#000000BF]">
            Profit {hit}
          </span>
        </div>

        {/* Loss on right */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#F0A301]"></div>
          <span className="font-semibold text-[12px] leading-[160%] text-[#000000BF]">
            Loss {miss}
          </span>
        </div>
      </div>

      {/* Profit/Loss Progress Bar */}
      <div className="mt-4">
        <LinearProgress
          variant="determinate"
          value={profitPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#FF1D1D",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1F950C",
            },
          }}
        />

        <div className="flex justify-between items-center mt-2">
          {/* Profit on left */}
          <span className="text-[#1F950C] font-bold text-[12px]">
            +{formatCurrency(profit)}
          </span>

          {/* Loss on right */}
          <span className="text-[#FF1D1D] font-bold text-[12px]">
            -{formatCurrency(Math.abs(loss))}
          </span>
        </div>
      </div>
    </div>
  );
};

// Double Progress Bar for Desktop (Stacked)
const DoubleProgressBarsStacked = ({ hit, miss, profit, loss, name }) => {
  const totalTrades = hit + miss;
  const hitPercent = totalTrades > 0 ? (hit / totalTrades) * 100 : 0;
  const totalPnL = Math.abs(profit) + Math.abs(loss);
  const profitPercent = totalPnL > 0 ? (Math.abs(profit) / totalPnL) * 100 : 0;

  const formatCurrency = (value) => {
    const absValue = Math.abs(value);
    return `₹${absValue.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="w-full mb-6">
      {name && (
        <div className="font-medium text-[14px] leading-[100%] text-[#000000BF] mb-3">
          {name}
        </div>
      )}

      {/* First Progress Bar - Hit/Miss */}
      <div className="mb-4">
        <LinearProgress
          variant="determinate"
          value={hitPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#F0A301",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#407AFF",
            },
          }}
        />

        <div className="flex justify-between items-center mt-2">
          {/* Profit on left */}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#407AFF]"></div>
            <span className="font-semibold text-[12px] leading-[160%] text-[#000000BF]">
              Profit {hit}
            </span>
          </div>

          {/* Loss on right */}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#F0A301]"></div>
            <span className="font-semibold text-[12px] leading-[160%] text-[#000000BF]">
              Loss {miss}
            </span>
          </div>
        </div>
      </div>

      {/* Second Progress Bar - Profit/Loss */}
      <div>
        <LinearProgress
          variant="determinate"
          value={profitPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#FF1D1D",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1F950C",
            },
          }}
        />

        <div className="flex justify-between items-center mt-2">
          {/* Profit on left */}
          <span className="text-[#1F950C] font-bold text-[12px]">
            +{formatCurrency(profit)}
          </span>

          {/* Loss on right */}
          <span className="text-[#FF1D1D] font-bold text-[12px]">
            -{formatCurrency(Math.abs(loss))}
          </span>
        </div>
      </div>
    </div>
  );
};

// Double Progress Bar for Desktop Day of Week (Horizontal)
const DoubleProgressBarsHorizontal = ({ hit, miss, profit, loss, name }) => {
  const totalTrades = hit + miss;
  const hitPercent = totalTrades > 0 ? (hit / totalTrades) * 100 : 0;
  const totalPnL = Math.abs(profit) + Math.abs(loss);
  const profitPercent = totalPnL > 0 ? (Math.abs(profit) / totalPnL) * 100 : 0;

  const formatCurrency = (value) => {
    const absValue = Math.abs(value);
    return `₹${absValue.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="w-full mb-4">
      {name && (
        <div className="font-medium text-[14px] leading-[100%] text-[#000000BF] mb-3">
          {name}
        </div>
      )}

      <div className="flex gap-4 items-center">
        {/* Hit/Miss Progress Bar */}
        <div className="flex-1">
          <LinearProgress
            variant="determinate"
            value={hitPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#F0A301",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#407AFF",
              },
            }}
          />
          <div className="flex justify-between items-center mt-1">
            {/* Profit on left */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#407AFF]"></div>
              <span className="font-semibold text-[12px] leading-[160%] text-[#000000BF]">
                Profit {hit}
              </span>
            </div>

            {/* Loss on right */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#F0A301]"></div>
              <span className="font-semibold text-[12px] leading-[160%] text-[#000000BF]">
                Loss {miss}
              </span>
            </div>
          </div>
        </div>

        {/* Profit/Loss Progress Bar */}
        <div className="flex-1">
          <LinearProgress
            variant="determinate"
            value={profitPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#FF1D1D",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1F950C",
              },
            }}
          />
          <div className="flex justify-between items-center mt-1">
            {/* Profit on left */}
            <span className="text-[#1F950C] font-bold text-[12px]">
              +{formatCurrency(profit)}
            </span>

            {/* Loss on right */}
            <span className="text-[#FF1D1D] font-bold text-[12px]">
              -{formatCurrency(Math.abs(loss))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Day Wise Stats Component
// Mobile Day Wise Stats Component - FIXED
const MobileDayWiseStats = ({ analyticsData }) => {
  console.log("🚀 ~ MobileDayWiseStats ~ analyticsData:", analyticsData);
  const [activeTab, setActiveTab] = useState("overall");
  const [selectedYear, setSelectedYear] = useState(null);
  const { selectedInstrument } = useSearch();

  const tabs = [
    { key: "overall", label: "Overall" },
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    // { key: "saturday", label: "Saturday" },
    // { key: "sunday", label: "Sunday" },
  ];

  const getCurrentData = () => {
    if (activeTab === "overall") {
      return analyticsData.overall;
    }
    return analyticsData.dayWise.find(
      (day) => day.day.toLowerCase() === activeTab
    );
  };

  const currentData = getCurrentData();

  // Sort years in descending order and set latest year as selected by default
  useEffect(() => {
    if (analyticsData.yearWise.length > 0 && !selectedYear) {
      const filteredYears = analyticsData.yearWise
        .filter((yearData) => {
          const currentYear = new Date().getFullYear();
          return yearData.year <= currentYear;
        })
        .sort((a, b) => b.year - a.year);

      if (filteredYears.length > 0) {
        setSelectedYear(filteredYears[0].year);
      }
    }
  }, [analyticsData.yearWise, selectedYear]);

  const getSelectedYearData = () => {
    return analyticsData.yearWise.find((year) => year.year === selectedYear);
  };

  const sortedYearWise = analyticsData.yearWise
    ? analyticsData.yearWise
        .filter((yearData) => {
          const currentYear = new Date().getFullYear();
          return yearData.year <= currentYear;
        })
        .sort((a, b) => b.year - a.year)
    : [];

  return (
    <div className="md:hidden bg-white rounded-lg px-4">
      <h3 className="font-bold text-[16px] mb-4">Day Wise Stats</h3>

      {/* Horizontal Scrollable Tabs */}
      <div className="overflow-x-auto w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.key
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current Data Display */}
      <div className="bg-gray-50 rounded-lg">
        {currentData && (
          <div>
            <SingleProgressBar
              hit={currentData.hit_count}
              miss={currentData.miss_count}
              profit={currentData.profit}
              loss={currentData.loss}
              name=""
            />
          </div>
        )}
      </div>

      {/* Instruments Section - FIXED */}
      <div className="mt-6 bg-gray-50 rounded-lg">
        <h4 className="font-bold text-[14px] mb-3 relative top-3 left-3">
          Instruments
        </h4>
        <div className="">
          {/* Show Overall data with correct name */}
          {analyticsData.overall && (
            <SingleProgressBar
              hit={analyticsData.overall.hit_count}
              miss={analyticsData.overall.miss_count}
              profit={analyticsData.overall.profit}
              loss={analyticsData.overall.loss}
              name={selectedInstrument?.instrument_name ?? "Overall"}
            />
          )}

          {/* Show individual instruments when "All" is selected */}
          {!selectedInstrument &&
            analyticsData.instruments &&
            analyticsData.instruments.map((instrument) => (
              <SingleProgressBar
                key={instrument.chip_id || instrument.day}
                hit={instrument.hit_count}
                miss={instrument.miss_count}
                profit={instrument.profit}
                loss={instrument.loss}
                name={instrument.day}
              />
            ))}
        </div>
      </div>

      {/* Year Section with Clickable Selection */}
      <div className="mt-6 bg-gray-50 rounded-lg">
        <h4 className="font-bold text-[14px] mb-3 relative left-3 top-3">
          Year
        </h4>
        <div className="overflow-x-auto ">
          <div className="flex gap-2 relative left-3 mt-3">
            {sortedYearWise.map((yearData) => (
              <button
                key={yearData.year}
                onClick={() => setSelectedYear(yearData.year)}
                className={`px-4 py-2 rounded-full text-[12px] font-medium flex-shrink-0 ${
                  selectedYear === yearData.year
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {yearData.year}
              </button>
            ))}
          </div>
        </div>
        {getSelectedYearData() && (
          <SingleProgressBar
            hit={getSelectedYearData().hit_count}
            miss={getSelectedYearData().miss_count}
            profit={getSelectedYearData().profit}
            loss={getSelectedYearData().loss}
            name=""
          />
        )}
      </div>
    </div>
  );
};


// Profit & Loss Section (Updated)
const ProfitLossSection = () => {
  const [yearList, setYearList] = useState([]);
  const [activeYear, setActiveYear] = useState(null);
  const [loadingYear, setLoadingYear] = useState(true);
  const [monthData, setMonthData] = useState([]);
  const [loadingMonth, setLoadingMonth] = useState(false);

  const location = useLocation();
  const selectedId = location.state?._id;
  const dateRange = location.state?.dateRange;

  const { selectedInstrument } = useSearch();
  console.log(
    "🚀 ~ ProfitLossSection ~ selectedInstrument:",
    selectedInstrument
  );
  const { slippageType, slippageValue, isApplied, lastAppliedAt } =
    useSlippage();

  const instrumentId = selectedInstrument?._id;
  const startDate = dateRange?.from;
  const endDate = dateRange?.to;

  // Fetch years
  useEffect(() => {
    async function fetchYears() {
      if (!selectedId) {
        setYearList([]);
        setActiveYear(null);
        setLoadingYear(false);
        return;
      }

      setLoadingYear(true);
      try {
        let apiUrl = `getWebInstrumentUniqueYearFilter/${selectedId}`;
        const params = [];

        if (selectedInstrument && selectedInstrument._id) {
          params.push(`chip_id=${selectedInstrument._id}`);
        }

        if (startDate) params.push(`start_date=${startDate}`);
        if (endDate) params.push(`end_date=${endDate}`);

        if (params.length > 0) apiUrl += `?${params.join("&")}`;

        console.log("🚀 ~ ProfitLoss Years API URL:", apiUrl);

        const res = await api.get(apiUrl);
        if (
          res.data?.status &&
          Array.isArray(res.data.data) &&
          res.data.data.length
        ) {
          const filteredYears = filterPastYears(res.data.data.map(String)).sort(
            (a, b) => parseInt(b) - parseInt(a)
          );

          setYearList(filteredYears);
          if (filteredYears.length > 0) {
            setActiveYear(filteredYears[0]);
          }
        } else {
          setYearList([]);
          setActiveYear(null);
        }
      } catch (error) {
        console.error("Error fetching years:", error);
        setYearList([]);
        setActiveYear(null);
      } finally {
        setLoadingYear(false);
      }
    }
    fetchYears();
  }, [selectedId, selectedInstrument?._id, startDate, endDate, lastAppliedAt]);

  // Fetch months for activeYear
  useEffect(() => {
    if (!activeYear || !selectedId) {
      setMonthData([]);
      return;
    }

    async function fetchMonths() {
      setLoadingMonth(true);
      try {
        let apiUrl = `getWebInstrumentMonthlyStats/${selectedId}?year=${activeYear}`;

        if (selectedInstrument && selectedInstrument._id) {
          apiUrl += `&chip_id=${selectedInstrument._id}`;
        }

        if (startDate) apiUrl += `&start_date=${startDate}`;
        if (endDate) apiUrl += `&end_date=${endDate}`;

        if (isApplied && slippageValue > 0) {
          const slippageTypeParam =
            slippageType === "%" ? "percentage" : slippageType.toLowerCase();
          apiUrl += `&slippage=${slippageValue}&slippage_type=${slippageTypeParam}`;
        }

        console.log("🚀 ~ ProfitLoss Monthly API URL:", apiUrl);

        const res = await api.get(apiUrl);
        let months = [];

        if (
          res.data?.status &&
          res.data.data &&
          Array.isArray(res.data.data.data)
        ) {
          const monthMap = {};
          res.data.data.data.forEach((m) => {
            const fullMonthName = MONTH_SHORT_TO_FULL[m.month] || m.month;
            monthMap[fullMonthName] = m.net_pnl;
          });

          // Only include months that have data (non-zero values)
          months = MONTH_ORDER.map((label) => {
            const pnl = monthMap[label];
            if (pnl === undefined || pnl === 0) return null; // Filter out months with no data or zero values

            let rupeeStr =
              (pnl > 0 ? "+" : pnl < 0 ? "-" : "") +
              "₹" +
              Math.abs(pnl).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              });
            return {
              label,
              value: rupeeStr,
              raw: pnl,
              positive: pnl >= 0,
            };
          }).filter(Boolean); // Remove null values
        }
        setMonthData(months);
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
        setMonthData([]);
      } finally {
        setLoadingMonth(false);
      }
    }
    fetchMonths();
  }, [
    activeYear,
    selectedId,
    selectedInstrument?._id,
    startDate,
    endDate,
    slippageType,
    slippageValue,
    isApplied,
    lastAppliedAt,
  ]);

  // Updated date formatting function
  const formatDateRange = () => {
    if (startDate && endDate) {
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };

      const start = formatDate(startDate);
      const end = formatDate(endDate);
      return `${start} - ${end}`;
    }
    return "All Time";
  };

  return (
    <div className="block bg-white p-3 md:p-6 rounded-[12px] md:flex-1 w-full">
      <div className="flex justify-between items-start sm:items-center mb-4 md:mb-6">
        <h2 className="font-semibold text-[18px] md:text-[20px] mb-2 sm:mb-0">
          Profit & Loss
        </h2>
        <span className="py-2 md:py-3 px-3 md:px-4 font-semibold text-[10px] md:text-[12px] text-[#00000066] md:border border-[#00000029] rounded-full">
          {formatDateRange()}
        </span>
      </div>

      <div className="border-b border-[#00000029] mb-4 md:mb-6 md:block hidden" />

      <div className="overflow-x-auto">
        <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 min-w-max">
          {loadingYear ? (
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[60px] md:w-[75px] h-8 md:h-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          ) : yearList.length === 0 ? (
            <div className="text-sm text-gray-500">No data available</div>
          ) : (
            yearList.map((year) => (
              <button
                key={year}
                className={`px-4 md:px-6 py-2 rounded-full font-bold text-[14px] md:text-[16px] flex-shrink-0 ${
                  String(year) === String(activeYear)
                    ? "bg-black text-white"
                    : "border border-[#00000029] hover:bg-gray-100"
                }`}
                onClick={() => setActiveYear(String(year))}
              >
                {year}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {loadingMonth
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg flex flex-col items-center justify-center py-3 md:py-4 bg-gray-100 animate-pulse h-[70px] md:h-[86px]"
              >
                &nbsp;
              </div>
            ))
          : monthData
              .filter((month) => isPastOrCurrentMonth(month.label, activeYear))
              .map((month) => (
                <div
                  key={month.label}
                  className={`rounded-lg flex flex-col items-center justify-center py-3 md:py-4 ${
                    month.positive ? "bg-[#28A7451A]" : "bg-[#FFEBEB]"
                  }`}
                >
                  <div className="font-medium text-[14px] md:text-[16px] text-[#000000BF] mb-1">
                    {month.label}
                  </div>
                  <div
                    className={`font-bold text-[16px] md:text-[20px] ${
                      month.positive ? "text-[#1F950C]" : "text-[#E01212]"
                    }`}
                  >
                    {month.value}
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

// Desktop Transaction Analytics Section - MODIFIED
const DesktopTransactionAnalyticsSection = ({ analyticsData }) => {
  const { selectedInstrument } = useSearch();
  const [selectedYear, setSelectedYear] = useState(null);

  const dayOrder = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const sortedDays = analyticsData.dayWise
    .filter((day) => dayOrder.includes(day.day.toLowerCase()))
    .sort(
      (a, b) =>
        dayOrder.indexOf(a.day.toLowerCase()) -
        dayOrder.indexOf(b.day.toLowerCase())
    );

  useEffect(() => {
    if (analyticsData.yearWise.length > 0 && !selectedYear) {
      const filteredYears = analyticsData.yearWise
        .filter((yearData) => {
          const currentYear = new Date().getFullYear();
          return yearData.year <= currentYear;
        })
        .sort((a, b) => b.year - a.year);

      if (filteredYears.length > 0) {
        setSelectedYear(filteredYears[0].year);
      }
    }
  }, [analyticsData.yearWise, selectedYear]);

  const getSelectedYearData = () => {
    return analyticsData.yearWise.find((year) => year.year === selectedYear);
  };

  const sortedYearWise = analyticsData.yearWise
    ? analyticsData.yearWise
        .filter((yearData) => {
          const currentYear = new Date().getFullYear();
          return yearData.year <= currentYear;
        })
        .sort((a, b) => b.year - a.year)
    : [];

  return (
    <div className="hidden md:block bg-white p-6 rounded-[12px] flex-1">
      <h2 className="font-semibold text-[20px] mb-6">Transaction Analytics</h2>
      <div className="border-b border-[#00000029] mb-6" />

      <div className="flex gap-8">
        {/* Left Side - Instruments & Years */}
        <div className="flex-1">
          {/* Instruments Section - MODIFIED */}
          <div className="mb-4">
            <h3 className="font-semibold text-[18px] mb-4">Instruments</h3>
            <div className="">
              {/* Show Overall data first */}
              {analyticsData.overall && (
                <DoubleProgressBarsStacked
                  hit={analyticsData.overall.hit_count}
                  miss={analyticsData.overall.miss_count}
                  profit={analyticsData.overall.profit}
                  loss={analyticsData.overall.loss}
                  name={selectedInstrument?.instrument_name ?? "Overall"}
                />
              )}

              {/* Show individual instruments when "All" is selected */}
              {!selectedInstrument &&
                analyticsData.instruments &&
                analyticsData.instruments.map((instrument) => (
                  <DoubleProgressBarsStacked
                    key={instrument.chip_id || instrument.day}
                    hit={instrument.hit_count}
                    miss={instrument.miss_count}
                    profit={instrument.profit}
                    loss={instrument.loss}
                    name={instrument.day} // instrument name
                  />
                ))}
            </div>
          </div>

          {/* Year Section */}
          <div>
            <h3 className="font-semibold text-[18px] mb-4">Year</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-2 mb-4 min-w-max">
                {sortedYearWise.map((yearData) => (
                  <button
                    key={yearData.year}
                    onClick={() => setSelectedYear(yearData.year)}
                    className={`px-6 py-2 rounded-full font-bold text-[16px] flex-shrink-0 ${
                      selectedYear === yearData.year
                        ? "bg-black text-white"
                        : "border border-[#00000029] hover:bg-gray-100"
                    }`}
                  >
                    {yearData.year}
                  </button>
                ))}
              </div>
            </div>
            {getSelectedYearData() && (
              <DoubleProgressBarsStacked
                hit={getSelectedYearData().hit_count}
                miss={getSelectedYearData().miss_count}
                profit={getSelectedYearData().profit}
                loss={getSelectedYearData().loss}
                name=""
              />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-l border-[#00000029]" />

        {/* Right Side - Day of Week */}
        <div className="flex-1">
          <h3 className="font-semibold text-[18px] mb-4">Day Of Week</h3>
          {sortedDays.map((dayData) => (
            <div key={dayData.day} className="mb-4">
              <DoubleProgressBarsHorizontal
                hit={dayData.hit_count}
                miss={dayData.miss_count}
                profit={dayData.profit}
                loss={dayData.loss}
                name={
                  dayData.day.charAt(0).toUpperCase() + dayData.day.slice(1)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Transaction Analytics Section - MODIFIED
const TransactionAnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const selectedId = location.state?._id;
  const dateRange = location.state?.dateRange;

  const { selectedInstrument } = useSearch();
  const { slippageType, slippageValue, isApplied, lastAppliedAt } =
    useSlippage();

  const instrumentId = selectedInstrument?._id;
  const startDate = dateRange?.from;
  const endDate = dateRange?.to;

  // Fetch transaction analytics data
  useEffect(() => {
    async function fetchAnalytics() {
      if (!selectedId) {
        setAnalyticsData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let apiUrl = `getWebInstrumentTransactionAnalytics/${selectedId}`;
        console.log("🚀 ~ fetchAnalytics ~ apiUrl:", apiUrl);
        const params = [];

        // Add chip_id as query parameter ONLY if selectedInstrument is available
        if (selectedInstrument && selectedInstrument._id) {
          params.push(`chip_id=${selectedInstrument._id}`);
        }

        if (startDate) params.push(`start_date=${startDate}`);
        if (endDate) params.push(`end_date=${endDate}`);

        if (isApplied && slippageValue > 0) {
          const slippageTypeParam =
            slippageType === "%" ? "percentage" : slippageType.toLowerCase();
          params.push(`slippage=${slippageValue}`);
          params.push(`slippage_type=${slippageTypeParam}`);
        }

        if (params.length > 0) apiUrl += `?${params.join("&")}`;

        console.log("🚀 ~ TransactionAnalytics API URL:", apiUrl);

        const res = await api.get(apiUrl);
        if (res.data?.status && Array.isArray(res.data.data)) {
          const data = res.data.data;

          const overall = data.find((item) => item.day === "overall");

          // Separate day-wise data (monday, tuesday, etc.) from instrument data
          const dayWise = data.filter(
            (item) =>
              item.day &&
              item.day !== "overall" &&
              !item.chip_id && // exclude instrument data
              [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].includes(item.day.toLowerCase())
          );

          // Extract instrument data (items with chip_id)
          const instruments = data.filter((item) => item.chip_id);

          const yearWise = data.filter((item) => item.year);

          setAnalyticsData({
            overall,
            dayWise,
            yearWise,
            instruments, // Add instruments data
            totalTrades: res.data.filters?.total_trades || 0,
          });
        } else {
          setAnalyticsData(null);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setAnalyticsData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [
    selectedId,
    selectedInstrument?._id,
    startDate,
    endDate,
    slippageType,
    slippageValue,
    isApplied,
    lastAppliedAt,
  ]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-[12px] flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading analytics...</p>
          {selectedInstrument?.instrument_name && (
            <p className="text-xs text-gray-400 mt-1">
              For: {selectedInstrument.instrument_name}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="bg-white p-6 rounded-[12px] flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-500">
          <p>No analytics data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MobileDayWiseStats analyticsData={analyticsData} />
      <DesktopTransactionAnalyticsSection analyticsData={analyticsData} />
    </>
  );
};

// Main TransactionAnalytics Component
const TransactionAnalytics = () => {
  const { selectedInstrument } = useSearch();
  const location = useLocation();
  const selectedId = location.state?._id;

  if (!selectedId) {
    return (
      <div className="flex md:flex-row flex-col gap-4 w-full">
        <div className="bg-white p-6 rounded-[12px] w-full flex items-center justify-center min-h-[300px]">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">No Strategy Selected</p>
            <p className="text-sm">
              Please select a strategy to view transaction analytics
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col gap-4 w-full">
      <TransactionAnalyticsSection />
      <ProfitLossSection />
    </div>
  );
};

export default TransactionAnalytics;
