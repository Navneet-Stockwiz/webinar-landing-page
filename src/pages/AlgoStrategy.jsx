import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import TabNavigation from "../components/AlgoStrategy/TabNavigation";
import StrategyCard from "../components/AlgoStrategy/StrategyCard";
import HomeIcon from "@mui/icons-material/Home";
import api from "../api/axios";
import riskicon from "../assets/svg/riskicon.svg";
import highriskicon from "../assets/svg/highriskicon.svg";
import highriskicon1 from "../assets/svg/highriskicon1.svg";
import lowriskicon1 from "../assets/svg/lowriskicon1.svg";
import moderateriskicon from "../assets/svg/moderateriskicon.svg";
import moderateriskicon1 from "../assets/svg/moderateriskicon1.svg";
import contactnew from "../assets/svg/contactnew.svg";
import DirectionToggle from "../components/AlgoStrategy/DirectionToggle";

const AlgoStrategy = () => {
  const navigate = useNavigate();
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [availableRiskTypes, setAvailableRiskTypes] = useState({
    low: false,
    moderate: false,
    high: false,
  });

  // Get all filters and search from context
  const { activeTab, activeToggle, debouncedSearchQuery } = useSearch();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [itemsPerPage] = useState(12);

  // Fetch available risk types for current category
  const fetchAvailableRiskTypes = async () => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "1000", // Get a large number to check all strategies
      });

      // Add category filter
      if (activeTab) {
        params.append("category", activeTab);
      }

      const response = await api.get(`getWebStrykexStrategies?${params}`);
      const { data } = response.data;

      // Extract unique risk types from the data
      const riskTypes = new Set();
      data.forEach((strategy) => {
        if (strategy.risk_type) {
          riskTypes.add(strategy.risk_type.toLowerCase());
        }
      });

      const newAvailableRiskTypes = {
        low: riskTypes.has("low"),
        moderate: riskTypes.has("moderate"),
        high: riskTypes.has("high"),
      };
      
      setAvailableRiskTypes(newAvailableRiskTypes);
      
      // Reset active filter if it's not available in the new category
      if (activeFilter !== "all") {
        const riskTypeMap = {
          "low-risk": "low",
          "moderate-risk": "moderate",
          "high-risk": "high"
        };
        const currentRiskType = riskTypeMap[activeFilter];
        if (currentRiskType && !newAvailableRiskTypes[currentRiskType]) {
          setActiveFilter("all");
        }
      }
    } catch (err) {
      console.error("Error fetching available risk types:", err);
      // On error, show all filters as fallback
      setAvailableRiskTypes({
        low: true,
        moderate: true,
        high: true,
      });
    }
  };

  const fetchStrategies = async (page = 1) => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });

      // Add category filter
      if (activeTab) {
        params.append("category", activeTab);
      }

      // Add direction filter
      if (activeToggle && activeToggle !== "all") {
        params.append("direction", activeToggle);
      }

      // Add search query if provided
      if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
        params.append("search_query", debouncedSearchQuery.trim());
      }

      // Add risk_type filter based on activeFilter
      // Only add risk_type parameter when it's not "all"
      // When activeFilter is "all", don't send risk_type parameter (null behavior)
      if (activeFilter !== "all") {
        const riskTypeMap = {
          "low-risk": "low",
          "moderate-risk": "moderate",
          "high-risk": "high"
        };
        const riskType = riskTypeMap[activeFilter];
        if (riskType) {
          params.append("risk_type", riskType);
        }
      }
      // When activeFilter is "all", risk_type is effectively null/undefined
      // and API will return all data regardless of risk level

      console.log("API Params:", params.toString()); // For debugging

      const response = await api.get(`getWebStrykexStrategies?${params}`);
      const { data, totalDocs, totalPages, currentPage, counts } =
        response.data;

      setStrategies(data);
      setTotalCount(counts);
      setTotalDocs(totalDocs);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching strategies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available risk types when category changes
  useEffect(() => {
    if (activeTab) {
      fetchAvailableRiskTypes();
      // Reset active filter when category changes
      setActiveFilter("all");
    }
  }, [activeTab]);

  // Initial fetch
  useEffect(() => {
    fetchStrategies(1);
  }, []);

  // Handle all filter changes (search, category, direction, risk)
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when any filter changes
    fetchStrategies(1);
  }, [activeTab, activeToggle, debouncedSearchQuery, activeFilter]);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchStrategies(newPage);
    }
  };

  // Handle risk filter change
  const handleRiskFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  // Calculate display range
  const getDisplayRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalDocs);
    return { start, end };
  };

  // Helper function to generate page numbers with ellipsis
  function getPageNumbers() {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  }

  // Check if filters are in default state
  const isDefaultState =
    activeTab === "Equity Algos" &&
    activeToggle === "bullish" &&
    !debouncedSearchQuery &&
    activeFilter === "all";

  const { start, end } = getDisplayRange();

  // Risk filter options - dynamically filtered based on available risk types
  const allFilters = [
    { id: "all", label: "All", riskType: null }, // null means no risk filtering
    { id: "low-risk", label: "Low Risk", riskType: "low" },
    { id: "moderate-risk", label: "Moderate Risk", riskType: "moderate" },
    { id: "high-risk", label: "High Risk", riskType: "high" },
  ];

  // Filter to only show risk types that have data
  const filters = allFilters.filter((filter) => {
    if (filter.id === "all") return true; // Always show "All"
    return availableRiskTypes[filter.riskType];
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center md:gap-4 md:p-4">
        <p className="font-bold text-[18px] leading-[100%]  justify-start items-start w-full md:flex hidden">
          Choose Algo Strategy
        </p>
        <div className="w-full">
          {/* No props needed - TabNavigation uses context */}
          <TabNavigation strategies={strategies} totalCount={totalCount} />
        </div>

        <div className="md:p-6 md:pt-6 pt-4 px-4 w-full bg-white md:min-h-screen h-full rounded-[12px]">
          {/* Filters Section - Always Visible */}
          <div className="flex flex-col md:mb-3 mb-6 gap-6">
            <div className="flex justify-between items-center w-full">
              {/* Risk Filter Buttons */}
              <div className="flex gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleRiskFilterChange(filter.id)}
                    className={`
      md:px-6 px-4 md:py-[10px] py-[6px] rounded-full md:text-[16px] text-[14px] md:leading-[18px] leading-[16px] font-medium transition-all duration-200 flex items-center gap-2 border border-[#DCDCDC]
      ${
        activeFilter === filter.id
          ? filter.id === "low-risk"
            ? "bg-[#E6FFE2] text-[#1F950C]"
            : filter.id === "high-risk"
            ? "bg-[#FFF6F6] text-[#FF4141]"
            : filter.id === "moderate-risk"
            ? "bg-[#FFFAE4] text-[#EAB308]"
            : "bg-[#282828] text-white shadow-md"
          : "bg-[#FFFFFF] text-[#000000BF] hover:bg-gray-200"
      }
    `}
                    title={
                      filter.id === "all"
                        ? "Show all strategies regardless of risk level"
                        : `Show ${filter.label.toLowerCase()} strategies only`
                    }
                  >
                    {filter.label}
                    {filter.id !== "all" && (
                      <img
                        src={
                          activeFilter === filter.id
                            ? filter.id === "low-risk"
                              ? lowriskicon1
                              : filter.id === "high-risk"
                              ? highriskicon1
                              : filter.id === "moderate-risk"
                              ? moderateriskicon1
                              : riskicon
                            : filter.id === "low-risk"
                            ? riskicon
                            : filter.id === "high-risk"
                            ? highriskicon
                            : filter.id === "moderate-risk"
                            ? moderateriskicon
                            : riskicon
                        }
                        alt={`${filter.label} icon`}
                        className="md:w-[18px] md:h-[18px] w-4 h-4 object-contain" // Fixed size for all risk icons
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Direction Toggle - Desktop Only */}
              <div className="md:block hidden">
                <DirectionToggle />
              </div>
            </div>
          </div>
          <div className="border-b -mx-6 md:block hidden mb-5"></div>

          {/* Content Section - Loading/Error/Data */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-lg">Loading strategies...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">Error: {error}</div>
            </div>
          ) : strategies.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">
                {debouncedSearchQuery
                  ? `No strategies found for "${debouncedSearchQuery}"`
                  : "No strategies available"}
                {!isDefaultState && " with current filters"}
              </div>
            </div>
          ) : (
            <>
              {/* Strategy Cards Grid */}
              <div className="grid md:grid-cols-3 grid-cols-1 gap-8 md:gap-6">
                <StrategyCard strategies={strategies} />
              </div>

              {/* Dynamic Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <span className="md:font-semibold font-medium md:text-[14px] text-[12px] leading-[100%] text-[#00000066]">
                    Showing {start}-{end} of {totalDocs.toLocaleString()}
                    {!isDefaultState && " filtered results"}
                    {activeFilter !== "all" &&
                      ` (${filters.find((f) => f.id === activeFilter)?.label})`}
                  </span>

                  <div className="flex items-center">
                    {/* Previous button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`md:px-4 px-2 md:py-1 text-lg font-medium rounded-l-[8px] border border-[#D5D5D5] transition-all duration-200 ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "text-[#202224] hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      &lt;
                    </button>

                    {/* Page numbers */}
                    <div className="flex">
                      {getPageNumbers().map((pageNum, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            typeof pageNum === "number" &&
                            handlePageChange(pageNum)
                          }
                          disabled={pageNum === "..."}
                          className={`md:px-3 px-2 md:py-2 py-1 text-sm font-medium border-t border-b border-[#D5D5D5] transition-all duration-200 ${
                            pageNum === currentPage
                              ? "bg-blue-500 text-white font-semibold"
                              : pageNum === "..."
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-[#202224] hover:bg-gray-100 cursor-pointer"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    {/* Next button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`md:px-4 px-2  md:py-1 text-lg font-medium rounded-r-[8px] border border-[#D5D5D5] transition-all duration-200 ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "text-[#202224] hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Home Button */}
      <button
        onClick={() => navigate("/backtest/contact")}
        className="md:hidden fixed bottom-6 right-6 z-50"
      >
        <img src={contactnew} alt={contactnew} />
      </button>
    </>
  );
};

export default AlgoStrategy;
