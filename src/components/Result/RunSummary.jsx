import React, { useEffect, useState, useRef } from "react";
import RunChart from "./RunChart.jsx";
import api from "../../api/axios";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";
import { useSlippage } from "../../contexts/SlippageContext";
import winrateicon from "../../assets/svg/winrateicon.svg";
import profitfactoricon from "../../assets/svg/profitfactoricon.svg";
import rrratioicon from "../../assets/svg/rrratioicon.svg";

const getStat = (data, title) =>
  data?.find(
    (d) =>
      d.title &&
      d.title.toLowerCase().replace(/\s+/g, "") ===
        title.toLowerCase().replace(/\s+/g, "")
  );

// Helper function to determine color based on value
const getValueColor = (value, defaultColor = "text-gray-900") => {
  if (value === "--" || value === null || value === undefined) {
    return defaultColor;
  }
  
  // Extract numeric value from string (remove currency symbols, percentages, etc.)
  const numericValue = parseFloat(String(value).replace(/[^\d.-]/g, ''));
  
  if (!isNaN(numericValue) && numericValue < 0) {
    return "text-[#DA0909]"; // Red for negative values
  }
  
  return defaultColor;
};

const RunSummary = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const scrollContainerRef = useRef(null);

  const location = useLocation();
  const selectedId = location.state?._id;
  const dateRange = location.state?.dateRange;

  // Get selected instrument from context
  const { selectedInstrument } = useSearch();

  // Get slippage context
  const { slippageType, slippageValue, isApplied, lastAppliedAt } =
    useSlippage();

  // Get dynamic values - USE _id INSTEAD OF NAME
  const instrumentId = selectedInstrument?._id;
  const instrumentName = selectedInstrument?.instrument_name;
  const startDate = dateRange?.from || "2020-03-22";
  const endDate = dateRange?.to || "2025-08-02";

  const formatDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString("en-GB");
      const end = new Date(endDate).toLocaleDateString("en-GB");
      return `${start} - ${end}`;
    }
    return "All Time";
  };

  useEffect(() => {
    async function fetchStats() {
      if (!selectedId) {
        setStats([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let STAT_API_URL = `getWebInstrumentDetailedStatistics/${selectedId}?start_date=${startDate}&end_date=${endDate}`;

        if (selectedInstrument && selectedInstrument._id) {
          STAT_API_URL += `&chip_id=${selectedInstrument._id}`;
        }

        if (isApplied && slippageValue > 0) {
          const slippageTypeParam =
            slippageType === "%" ? "percentage" : slippageType.toLowerCase();
          STAT_API_URL += `&slippage=${slippageValue}&slippage_type=${slippageTypeParam}`;
          console.log("🚀 ~ RunSummary API call with slippage:", {
            slippageType,
            slippageValue,
          });
        }

        console.log("🚀 ~ RunSummary API URL:", STAT_API_URL);

        const res = await api.get(STAT_API_URL);
        if (Array.isArray(res.data?.data)) {
          setStats(res.data.data);
        } else {
          setStats([]);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
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

  // Handle scroll to update active dot
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const cardIndex = Math.round(scrollLeft / cardWidth);
      setActiveCard(cardIndex);
    }
  };

  // Handle dot click to scroll to specific card
  const scrollToCard = (cardIndex) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: cardIndex * cardWidth,
        behavior: "smooth",
      });
      setActiveCard(cardIndex);
    }
  };

  // Helper: extract all values from API - EXACT FIELDS FROM FIGMA
  const winRate = getStat(stats, "Win Rate")?.value ?? "--";
  const profitFactor = getStat(stats, "Profit Factor")?.value ?? "--";
  const rewardRiskRatio = getStat(stats, "Reward/Risk Ratio")?.value ?? "--";
  const totalProfit = getStat(stats, "Total Profit")?.value ?? "--";
  const totalLoss = getStat(stats, "Total Loss")?.value ?? "--";
  const avgMonthlyReturn = getStat(stats, "Avg Monthly Return")?.value ?? "--";
  const winLossRatio = getStat(stats, "Win Loss Ratio")?.value ?? "--";
  const avgProfit = getStat(stats, "Average Profit")?.value ?? "--";
  const avgLoss = getStat(stats, "Average Loss")?.value ?? "--";
  const profitableTrades = getStat(stats, "Profitable Trades")?.value ?? "--";
  const totalTrades = getStat(stats, "Total Trades")?.value ?? "--";
  const maxDrawdown = getStat(stats, "Max Drawdown")?.value ?? "--";
  const drawdownDays = getStat(stats, "Drawdown Days")?.value ?? "--";
  const winStreak = getStat(stats, "Win Steak")?.value ?? "--";
  const lossStreak = getStat(stats, "Loss Steak")?.value ?? "--";
  const maxProfit = getStat(stats, "Max Profit")?.value ?? "--";
  const maxLoss = getStat(stats, "Max Loss")?.value ?? "--";

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[380px]">
        <div className="text-gray-500">
          Loading statistics...
          {instrumentName && (
            <p className="text-sm mt-2">For: {instrumentName}</p>
          )}
          {isApplied && slippageValue > 0 && (
            <p className="text-xs text-blue-600 mt-1">
              With {slippageValue}
              {slippageType === "percentage" ? "%" : " ₹"} slippage
            </p>
          )}
        </div>
      </div>
    );
  }

  // No strategy selected state
  if (!selectedId) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[380px]">
        <div className="text-gray-500 text-center">
          <p>No strategy selected</p>
          <p className="text-sm mt-2">
            Please select a strategy to view statistics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col justify-between items-start bg-white w-full md:p-3 md:px-3 px-4 md:rounded-[12px] gap-6">
      {/* Left: Chart - 50% width */}
      <div className="md:w-1/2 w-full flex flex-col justify-between h-96">
        <div className="font-semibold mb-4 md:text-[20px] text-[16px]">
          Equity Curve
          {instrumentName && (
            <span className="text-sm text-gray-600 ml-2">
              - {instrumentName}
            </span>
          )}
        </div>
        <RunChart />
      </div>

      {/* Right: Stats (Desktop) - 50% width - Matching Figma Layout */}
      <div className="md:w-1/2 hidden md:flex flex-col gap-4">
        {/* Top Row - Key Performance Indicators */}
        <div className="grid grid-cols-3 gap-3">
          {/* Win Rate Card */}
          <div className="bg-[#F0F9EF] rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-normal">Win Rate</span>
              <div className="flex items-center text-[]">
                <img src={winrateicon} alt={winrateicon} />
              </div>
            </div>
            <div className="space-y-1">
              <div className={`text-[20px] font-bold ${getValueColor(winRate, "text-[#1F950C]")}`}>
                {winRate}
              </div>
            </div>
          </div>

          {/* Profit Factor Card */}
          <div className="bg-[#F0F9EF] space-y-1  rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-normal">Profit Factor</span>
              <div className="flex items-center text-[#1F950C]">
                <img src={profitfactoricon} alt={profitfactoricon} />
              </div>
            </div>
            <div className="space-y-1">
              <div className={`text-[20px] font-bold ${getValueColor(profitFactor, "text-gray-900")}`}>
                {profitFactor}
              </div>
            </div>
          </div>

          {/* R/R Ratio Card */}
          <div className="bg-[#F0F9EF]  space-y-1 rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-normal">R/R ratio</span>
              <div className="flex items-center text-[#1F950C]">
                <img src={rrratioicon} alt={rrratioicon} />
              </div>
            </div>
            <div className="space-y-1">
              <div className={`text-[20px] font-bold ${getValueColor(rewardRiskRatio, "text-[#1F950C]")}`}>
                {rewardRiskRatio}
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid - Exact Figma Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Profit & Total Loss */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Total Profit</div>
                <div className={`text-xl font-bold ${getValueColor(totalProfit, "text-[#1F950C]")}`}>
                  {totalProfit}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Total Loss</div>
                <div className={`text-xl font-bold ${getValueColor(totalLoss, "text-[#DA0909]")}`}>
                  {totalLoss}
                </div>
              </div>
            </div>
          </div>

          {/* Avg Monthly Return & Win Loss Ratio */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Avg Monthly Return</div>
                <div className={`text-xl font-bold ${getValueColor(avgMonthlyReturn, "text-[#1F950C]")}`}>
                  {avgMonthlyReturn}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Win Loss Ratio</div>
                <div className={`text-xl font-bold ${getValueColor(winLossRatio, "text-gray-900")}`}>
                  {winLossRatio}
                </div>
              </div>
            </div>
          </div>

          {/* Avg Profit & Avg Loss */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Avg Profit</div>
                <div className={`text-xl font-bold ${getValueColor(avgProfit, "text-[#1F950C]")}`}>
                  {avgProfit}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Avg loss</div>
                <div className={`text-xl font-bold ${getValueColor(avgLoss, "text-[#DA0909]")}`}>
                  {avgLoss}
                </div>
              </div>
            </div>
          </div>

          {/* Profitable Trades & Total Trades */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Profitable Trades</div>
                <div className={`text-xl font-bold ${getValueColor(profitableTrades, "text-gray-900")}`}>
                  {profitableTrades}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Total Trades</div>
                <div className={`text-xl font-bold ${getValueColor(totalTrades, "text-gray-900")}`}>
                  {totalTrades}
                </div>
              </div>
            </div>
          </div>

          {/* Max Drawdown & Drawdown Days */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Max Drawdown</div>
                <div className={`text-xl font-bold ${getValueColor(maxDrawdown, "")}`}>
                  {maxDrawdown}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Drawdown Days</div>
                <div className={`text-xl font-bold ${getValueColor(drawdownDays, "text-gray-900")}`}>
                  {drawdownDays}
                </div>
              </div>
            </div>
          </div>

          {/* Win Streak & Loss Streak */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Win Streak</div>
                <div className={`text-xl font-bold ${getValueColor(winStreak, "text-[#1F950C]")}`}>
                  {winStreak}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Loss Streak</div>
                <div className={`text-xl font-bold ${getValueColor(lossStreak, "text-[#DA0909]")}`}>
                  {lossStreak}
                </div>
              </div>
            </div>
          </div>

          {/* Max Profit & Max Loss */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-sm font-normal">Max Profit</div>
                <div className={`text-xl font-bold ${getValueColor(maxProfit, "text-[#1F950C]")}`}>
                  {maxProfit}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-normal">Max loss</div>
                <div className={`text-xl font-bold ${getValueColor(maxLoss, "text-[#DA0909]")}`}>
                  {maxLoss}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Stats (Mobile) - Same values, mobile-optimized layout */}
      <div className="md:hidden flex flex-col gap-4 w-full">
        <div className="font-semibold md:text-[20px] text-[16px] text-start flex justify-start items-start">
          Detailed Statistics
          {instrumentName && (
            <span className="text-sm text-gray-600 ml-2">
              - {instrumentName}
            </span>
          )}
        </div>

        <div className="w-full">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Mobile Card 1 - Primary Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm border-[1px] border-[#DCDCDC] w-full min-w-full p-3 rounded-[8px] bg-white flex-shrink-0 snap-start">
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Win Rate
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(winRate, "text-[#1F950C]")}`}>
                  {winRate}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Profit Factor
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(profitFactor, "text-gray-900")}`}>
                  {profitFactor}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  R/R Ratio
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(rewardRiskRatio, "text-[#1F950C]")}`}>
                  {rewardRiskRatio}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Total Trades
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(totalTrades, "text-gray-900")}`}>
                  {totalTrades}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Total Profit
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(totalProfit, "text-[#1F950C]")}`}>
                  {totalProfit}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Total Loss
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(totalLoss, "text-[#DA0909]")}`}>
                  {totalLoss}
                </p>
              </div>
            </div>

            {/* Mobile Card 2 - Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm border-[1px] border-[#DCDCDC] w-full min-w-full p-3 rounded-[8px] bg-white flex-shrink-0 snap-start">
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Avg Monthly Return
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(avgMonthlyReturn, "text-[#1F950C]")}`}>
                  {avgMonthlyReturn}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Win Loss Ratio
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(winLossRatio, "text-gray-900")}`}>
                  {winLossRatio}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Avg Profit
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(avgProfit, "text-[#1F950C]")}`}>
                  {avgProfit}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Avg loss
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(avgLoss, "text-[#DA0909]")}`}>
                  {avgLoss}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Profitable Trades
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(profitableTrades, "text-gray-900")}`}>
                  {profitableTrades}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Max Drawdown
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(maxDrawdown, "")}`}>
                  {maxDrawdown}
                </p>
              </div>
            </div>

            {/* Mobile Card 3 - Additional Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm border-[1px] border-[#DCDCDC] w-full min-w-full p-3 rounded-[8px] bg-white flex-shrink-0 snap-start">
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Drawdown Days
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(drawdownDays, "text-gray-900")}`}>
                  {drawdownDays}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Win Streak
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(winStreak, "text-[#1F950C]")}`}>
                  {winStreak}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Loss Streak
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(lossStreak, "text-[#DA0909]")}`}>
                  {lossStreak}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Max Profit
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(maxProfit, "text-[#1F950C]")}`}>
                  {maxProfit}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-[12px] leading-[18px] text-[#000000BF]">
                  Max loss
                </p>
                <p className={`font-bold text-[14px] leading-[18px] ${getValueColor(maxLoss, "text-[#DA0909]")}`}>
                  {maxLoss}
                </p>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-3">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  activeCard === index
                    ? "bg-[#407AFF]"
                    : "bg-[#DCDCDC] hover:bg-[#BBBBB]"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunSummary;
