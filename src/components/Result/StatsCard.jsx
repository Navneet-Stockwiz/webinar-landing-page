import React, { useEffect, useState } from "react";
import profit from "../../assets/svg/profit.svg";
import totalplnegaticeicon from "../../assets/svg/totalplnegaticeicon.svg";
import runtype from "../../assets/svg/runtype.svg";
import completed from "../../assets/svg/completed.svg";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DateRangeEditDialog from "../AlgoStrategy/DateRangeEditDialog";
import { useSlippage } from "../../contexts/SlippageContext";
import { useSearch } from "../../contexts/SearchContext";

const StatsCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedId = location.state?._id;
  const [dateRange, setDateRange] = useState(location.state?.dateRange || null);
  const [totalProfit, setTotalProfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Get slippage context
  const { slippageType, slippageValue, isApplied, lastAppliedAt } =
    useSlippage();

  // Get selected instrument from global context
  const { selectedInstrument } = useSearch();

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format date string with ordinal suffix
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";

    const date = dayjs(dateString);
    const dayValue = date.date();
    const suffix = getOrdinalSuffix(dayValue);
    const month = date.format("MMM");
    const year = date.format("YYYY");

    return `${dayValue}${suffix} ${month} ${year}`;
  };

  // Get formatted date range for display
  const getDisplayDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return "Select date range";
    const fromFormatted = formatDisplayDate(dateRange.from);
    const toFormatted = formatDisplayDate(dateRange.to);
    return `${fromFormatted} - ${toFormatted}`;
  };

  // Handle edit date range click
  const handleEditDateRange = () => {
    setEditDialogOpen(true);
  };

  // Handle date range save
  const handleDateRangeSave = (newDateRange) => {
    setDateRange(newDateRange);

    // Update the navigation state to reflect the new date range
    const updatedState = {
      ...location.state,
      dateRange: newDateRange,
    };

    // Replace current location state with updated date range
    navigate(location.pathname, {
      state: updatedState,
      replace: true,
    });
  };

  useEffect(() => {
    const fetchProfit = async () => {
      if (!selectedId) return;

      setLoading(true);
      try {
        // Use date range from state or fallback defaults
        const formattedFromDate = dateRange?.from;
        const formattedToDate = dateRange?.to;

        // Build API URL with all query parameters
        let apiUrl = `getWebStrategyTotalProfit/${selectedId}?start_date=${formattedFromDate}&end_date=${formattedToDate}`;

        // Add chip_id as query parameter ONLY if selectedInstrument is available
        if (selectedInstrument && selectedInstrument._id) {
          apiUrl += `&chip_id=${selectedInstrument._id}`;
        }

        // Add slippage parameters if applied
        if (isApplied && slippageValue > 0) {
          const slippageTypeParam =
            slippageType === "%" ? "percentage" : slippageType.toLowerCase();
          apiUrl += `&slippage=${slippageValue}&slippage_type=${slippageTypeParam}`;
        }

        console.log("🚀 ~ API URL:", apiUrl);

        // GET API call - no body needed since everything is in query parameters
        const res = await api.get(apiUrl);

        setTotalProfit(
          typeof res.data?.total_profit === "number"
            ? res.data.total_profit
            : null
        );
      } catch (error) {
        console.error("Error fetching profit:", error);
        setTotalProfit(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfit();
  }, [
    selectedId,
    selectedInstrument?._id,
    dateRange?.from,
    dateRange?.to,
    slippageType,
    slippageValue,
    isApplied,
    lastAppliedAt,
  ]);

  const formatRupees = (profit) =>
    typeof profit === "number" ? `₹${profit.toLocaleString("en-IN")}` : "--";

  // Function to get text color based on profit value
  const getProfitTextColor = () => {
    if (totalProfit === null || loading) return "text-[#1F950C]"; // Default green for loading/null
    return totalProfit < 0 ? "text-[#DA0909]" : "text-[#1F950C]"; // Red for negative, green for positive
  };

  return (
    <>
      <div className="bg-white w-full md:p-3 md:px-3 px-4 rounded-[12px] gap-4">
        <div className="grid grid-cols-2 md:flex md:flex-row md:gap-4 gap-2">
          {/* Profit */}
          <div className="bg-white flex justify-between items-start border-[1px] border-[#00000029] md:p-4 p-3 rounded-[12px] md:flex-1 relative">
            <div className="flex flex-col md:gap-3 gap-2">
              <p className="font-normal md:text-[14px] text-[12px] leading-[100%]">
                Total P&L
              </p>
              <p
                className={`font-semibold md:text-[18px] text-[13px] leading-[100%] ${getProfitTextColor()}`}
              >
                {loading
                  ? "Loading..."
                  : totalProfit !== null
                  ? formatRupees(totalProfit)
                  : "--"}
              </p>
            </div>
            <div>
              <img
                src={totalProfit < 0 ? totalplnegaticeicon : profit} // Show negative icon if profit is negative else normal profit icon
                alt="profit"
                className="absolute top-2 right-2 w-[32px] h-[32px]"
              />
            </div>
          </div>

          {/* Run Type */}
          <div className="bg-white flex justify-between items-start border-[1px] border-[#00000029] md:p-4 p-3 rounded-[12px] md:flex-1 relative">
            <div className="flex flex-col md:gap-3 gap-2">
              <p className="font-normal md:text-[14px] text-[12px] leading-[100%]">
                Run Type
              </p>
              <p className="font-semibold md:text-[18px] text-[13px] leading-[100%] text-[#407AFF]">
                Historic
              </p>
            </div>
            <div>
              <img
                src={runtype}
                alt="runtype"
                className="absolute top-2 right-2 w-[32px] h-[32px]"
              />
            </div>
          </div>

          {/* Date Range - Editable Date Range */}
          <div
            className="bg-white flex justify-between items-start border-[1px] border-[#00000029] md:p-4 p-3 rounded-[12px] md:flex-1 relative cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleEditDateRange}
          >
            <div className="flex flex-col md:gap-3 gap-2">
              <p className="font-normal md:text-[14px] text-[12px] leading-[100%]">
                Date Range
              </p>
              <p className="font-semibold md:text-[18px] text-[10px] leading-[100%]">
                {getDisplayDateRange()}
              </p>
            </div>
            <div className="absolute md:top-2 top-1 right-2">
              <EditIcon
                sx={{
                  fontSize: { xs: 16, md: 20 },
                  color: "#407AFF",
                  "&:hover": {
                    color: "#407AFF",
                  },
                }}
              />
            </div>
          </div>

          {/* Status */}
          <div
            className="flex justify-between items-start border border-[#00000029] md:p-4 p-3 rounded-[12px] md:flex-1 relative"
            style={{
              background:
                "linear-gradient(274.86deg, #55EF3D -61.74%, #0F2F0B 96.31%)",
            }}
          >
            <div className="flex flex-col md:gap-3 gap-2">
              <p className="font-normal md:text-[14px] text-[12px] leading-[100%] text-white">
                Status
              </p>
              <p className="font-semibold md:text-[18px] text-[13px] leading-[100%] text-white">
                Completed
              </p>
            </div>
            <div>
              <img
                src={completed}
                alt="completed"
                className="absolute top-2 right-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Edit Dialog */}
      <DateRangeEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        currentDateRange={dateRange}
        onSave={handleDateRangeSave}
      />
    </>
  );
};

export default StatsCard;
