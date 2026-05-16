import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import downloadicon from "../../assets/svg/downloadicon.svg";
import qty from "../../assets/svg/qty.svg";
import { useSearch } from "../../contexts/SearchContext";
import { useSlippage } from "../../contexts/SlippageContext";

const PAGE_LIMIT = 10;

const TransactionOrderDetails = () => {
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [expandedRow, setExpandedRow] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [downloadingCSV, setDownloadingCSV] = useState(false);

  const location = useLocation();
  const selectedId = location.state?._id;
  const dateRange = location.state?.dateRange;

  const { selectedInstrument } = useSearch();
  const { slippageType, slippageValue, isApplied, lastAppliedAt } = useSlippage();
  const instrumentId = selectedInstrument?._id;

  // Helper function to calculate total profit for a group
  const calculateGroupTotalProfit = (group) => {
    // Use group_total_profit from the main transaction if available
    if (group.mainTransaction.group_total_profit !== undefined) {
      return parseFloat(group.mainTransaction.group_total_profit || 0);
    }
    
    // Fallback to calculating from sub_transactions
    return group.allTransactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.profit || 0);
    }, 0);
  };

  // ✅ Updated: Parse date directly without timezone conversion
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    
    // Parse the ISO string directly without timezone conversion
    const isoMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
    if (!isoMatch) return dateString;
    
    const [, year, month, day, hours, minutes] = isoMatch;
    
    // Convert month number to uppercase 3-letter format
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthName = monthNames[parseInt(month) - 1];
    
    return `${day} ${monthName} ${year} ${hours}:${minutes}`;
  };

  // ✅ UPDATED: Handle new response structure with sub_transactions
  const groupTransactionsByTxnId = (transactions) => {
    return transactions.map((transaction) => {
      const subTransactions = transaction.sub_transactions || [];
      
      // If only one sub_transaction, treat as single transaction
      if (subTransactions.length <= 1) {
        return {
          transactionId: transaction.transaction_id,
          allTransactions: subTransactions.length > 0 ? subTransactions : [transaction],
          mainTransaction: transaction,
          count: 1,
          isGrouped: false
        };
      }
      
      // If multiple sub_transactions, treat as grouped
      return {
        transactionId: transaction.transaction_id,
        allTransactions: subTransactions,
        mainTransaction: transaction,
        count: subTransactions.length,
        isGrouped: true
      };
    });
  };

  // ✅ MODIFIED: All groups collapsed by default (both desktop and mobile)
  useEffect(() => {
    if (groupedTransactions.length > 0) {
      // Start with all groups collapsed by default
      setExpandedGroups(new Set());
    }
  }, [groupedTransactions]);

  // ✅ FIXED: Auto-close child details when parent group is collapsed
  useEffect(() => {
    // When groups are collapsed, clear any expanded row details
    setExpandedRow(null);
  }, [expandedGroups]);

  // ✅ FIXED: Fetch transactions WITHOUT sorting - preserve backend order
  useEffect(() => {
    async function fetchTransactions() {
      if (!selectedId) {
        setTransactions([]);
        setGroupedTransactions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        let apiUrl = `getWebInstrumentTransactions/${selectedId}?page=${currentPage}&limit=${PAGE_LIMIT}`;
        if (selectedInstrument && selectedInstrument._id) {
          apiUrl += `&chip_id=${selectedInstrument._id}`;
        }
        if (dateRange?.from) apiUrl += `&start_date=${dateRange.from}`;
        if (dateRange?.to) apiUrl += `&end_date=${dateRange.to}`;
        if (isApplied && slippageValue > 0) {
          const slippageTypeParam = slippageType === "%" ? "percentage" : slippageType.toLowerCase();
          apiUrl += `&slippage=${slippageValue}&slippage_type=${slippageTypeParam}`;
        }
        const res = await api.get(apiUrl);
        console.log("🚀 ~ fetchTransactions ~ res:", res)
        if (res.data?.success && Array.isArray(res.data.data)) {
          const fetchedTransactions = res.data.data;
          // ✅ NO SORTING - use data as-is from backend
          setTransactions(fetchedTransactions);
          // Group while preserving backend order
          const grouped = groupTransactionsByTxnId(fetchedTransactions);
          setGroupedTransactions(grouped);
          setTotalDocs(res.data.totalDocs || 0);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setTransactions([]);
          setGroupedTransactions([]);
          setTotalDocs(0);
          setTotalPages(1);
        }
      } catch (err) {
        setTransactions([]);
        setGroupedTransactions([]);
        setTotalDocs(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, [
    selectedId,
    selectedInstrument?._id,
    currentPage,
    dateRange?.from,
    dateRange?.to,
    slippageType,
    slippageValue,
    isApplied,
    lastAppliedAt,
  ]);

  // ✅ FIXED: Toggle expand with auto-close of child details
  const toggleGroupExpansion = (transactionId) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(transactionId)) {
      newExpandedGroups.delete(transactionId);
      // Auto-close any expanded row details when parent is collapsed
      setExpandedRow(null);
    } else {
      newExpandedGroups.add(transactionId);
    }
    setExpandedGroups(newExpandedGroups);
  };

  // ✅ FIXED: Row expansion only works when parent is expanded or for single transactions
  const toggleRowExpansion = (rowId, groupId, isSingleTransaction = false) => {
    // For single transactions, always allow toggle
    if (isSingleTransaction) {
      setExpandedRow(expandedRow === rowId ? null : rowId);
      return;
    }
    
    // For multiple transactions, only allow if parent group is expanded
    if (expandedGroups.has(groupId)) {
      setExpandedRow(expandedRow === rowId ? null : rowId);
    }
  };

  // ✅ NEW: Format profit with + sign for positive values
  const formatProfit = (val) => {
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return val;
    
    if (numVal > 0) {
      // Positive values with + sign
      return `+₹${numVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    } else if (numVal < 0) {
      // Negative values with - sign
      return `-₹${Math.abs(numVal).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    } else {
      // Zero values
      return `₹${numVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    }
  };

  // Format Rupees (for entry/exit prices)
  const rupees = (val) => {
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return val;
    return numVal < 0
      ? `-₹${Math.abs(numVal).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
      : `₹${numVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  // ✅ FIXED: Download CSV WITHOUT sorting - preserve backend order
  const handleDownloadCSV = async () => {
    if (!selectedId) {
      alert("No strategy selected");
      return;
    }
    setDownloadingCSV(true);
    try {
      let apiUrl = `getWebInstrumentTransactions/${selectedId}?page=1&limit=-1`;
      if (selectedInstrument && selectedInstrument._id) {
        apiUrl += `&chip_id=${selectedInstrument._id}`;
      }
      if (dateRange?.from) apiUrl += `&start_date=${dateRange.from}`;
      if (dateRange?.to) apiUrl += `&end_date=${dateRange.to}`;
      if (isApplied && slippageValue > 0) {
        const slippageTypeParam = slippageType === "%" ? "percentage" : slippageType.toLowerCase();
        apiUrl += `&slippage=${slippageValue}&slippage_type=${slippageTypeParam}`;
      }
      const res = await api.get(apiUrl);
      if (!res.data?.success || !Array.isArray(res.data.data)) {
        alert("Failed to fetch transaction data");
        return;
      }
      // ✅ NO SORTING - use data as-is from backend
      const allTransactions = res.data.data;
      
      // CSV headers
      const headers = [
        "T.Id",
        "Instrument",
        "Contract Name",
        "Qty",
        "Entry",
        "Entry Time",
        "Exit",
        "Exit Time",
        "Profit",
        "Cumulative Profit",
      ];
      if (isApplied && slippageValue > 0) {
        headers.push("Original Entry", "Original Exit", "Slippage Applied");
      }
       const csvRows = [headers.join(",")];
       
       // Handle new response structure with sub_transactions
       allTransactions.forEach((transaction) => {
         const subTransactions = transaction.sub_transactions || [];
         
         if (subTransactions.length > 0) {
           // Export each sub_transaction as a separate row
           subTransactions.forEach((subTxn) => {
             const row = [
               transaction.transaction_id,
               transaction.scrip_name,
               `"${subTxn.contract_name}"`,
               Math.floor(subTxn.quantity || 0),
               subTxn.entry,
               `"${formatDateTime(subTxn.entry_time)}"`,
               subTxn.exit,
               `"${formatDateTime(subTxn.exit_time)}"`,
               subTxn.profit,
               transaction.cumulative_profit,
             ];
             if (isApplied && subTxn.original_entry && subTxn.original_exit) {
               row.push(subTxn.original_entry, subTxn.original_exit, subTxn.slippage_applied);
             }
             csvRows.push(row.join(","));
           });
         } else {
           // Fallback for transactions without sub_transactions
           const row = [
             transaction.transaction_id,
             transaction.scrip_name,
             `"${transaction.contract_name || transaction.scrip_name}"`,
             Math.floor(transaction.quantity),
             transaction.entry || "",
             `"${formatDateTime(transaction.entry_time)}"`,
             transaction.exit || "",
             `"${formatDateTime(transaction.exit_time)}"`,
             transaction.profit || "",
             transaction.cumulative_profit,
           ];
           if (isApplied && transaction.original_entry && transaction.original_exit) {
             row.push(transaction.original_entry, transaction.original_exit, transaction.slippage_applied);
           }
           csvRows.push(row.join(","));
         }
       });
      const csvData = csvRows.join("\n");
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().split("T")[0];
      const instrumentName = selectedInstrument?.instrument_name || "strategy";
      const filename = `transaction_orders_${instrumentName}_${allTransactions.length}records_${timestamp}.csv`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download CSV. Please try again.");
    } finally {
      setDownloadingCSV(false);
    }
  };

  const DetailedView = ({ item }) => (
    <div className="bg-[#F8F9FA] p-4 mx-0 border-b border-[#E3E7FF]">
      <div className="flex justify-between items-start">
        {/* Entry */}
        <div className="flex-1">
          <div className="mb-3">
            <p className="text-[12px] leading-[100%] mb-1">
              Buy: <span className="font-semibold">{rupees(item.entry)}</span>
              {isApplied && item.original_entry && (
                <span className="text-[10px] text-gray-500 ml-2">
                  (Original: {rupees(item.original_entry)})
                </span>
              )}
            </p>
            <p className="font-normal text-[10px] leading-[100%] text-[#000000BF]">
              ({formatDateTime(item.entry_time)})
            </p>
          </div>
          <div>
            <p className="font-normal text-[12px] leading-[100%] text-[#000000BF]">
              Txn ID: <span className="font-semibold">{item.transaction_id}</span>
            </p>
          </div>
        </div>
        {/* Exit */}
        <div className="flex-1 text-right">
          <div className="mb-3">
            <p className="font-normal text-[12px] leading-[100%] mb-1">
              Sell: <span className="font-semibold">{rupees(item.exit)}</span>
              {isApplied && item.original_exit && (
                <span className="text-[10px] text-gray-500 ml-2">
                  (Original: {rupees(item.original_exit)})
                </span>
              )}
            </p>
            <p className="font-normal text-[10px] leading-[100%] text-[#000000BF]">
              ({formatDateTime(item.exit_time)})
            </p>
          </div>
          <div className="flex items-center justify-end gap-1">
            <img src={qty} alt="quantity icon" className="w-3 h-3 flex-shrink-0" />
            <p className="font-normal text-[12px] leading-[100%] text-[#000000BF]">
              Qty: <span className="font-semibold">{Math.floor(item.quantity)}</span>
            </p>
          </div>
        </div>
      </div>
      {isApplied && item.slippage_applied && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-[10px] text-gray-600">
            Slippage Applied: {item.slippage_applied}
            {slippageType === "percentage" ? "%" : " ₹"}
          </p>
        </div>
      )}
    </div>
  );

  const ExpandIcon = ({ isExpanded, count }) => (
    <div className="flex items-center gap-2">
      {count > 1 && (
        <>
          <svg
            className={`md:w-4 w-3 md:h-4 h-3 transition-transform duration-200 ${
              isExpanded ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </>
      )}
    </div>
  );

  // Pagination
  function getPageNumbers() {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) if (!pages.includes(i)) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  }

  const rangeStart = (currentPage - 1) * PAGE_LIMIT + 1;
  const rangeEnd = Math.min(currentPage * PAGE_LIMIT, totalDocs);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="bg-white md:p-6 rounded-[12px] flex flex-col gap-4 md:gap-6 shadow w-full">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center md:px-0 px-4 w-full">
        <div>
          <div className="h-6 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse md:hidden"></div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse hidden md:block"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>

      <div className="border-[1px]"></div>

      {/* Desktop Table Skeleton */}
      <div className="overflow-x-auto rounded-[8px] hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-[#F4F5FA]">
            <tr className="border border-[#E3E7FF]">
              <th className="text-left px-4 py-3 w-12"></th>
              <th className="text-left px-4 py-3">T.Id</th>
              <th className="text-left px-4 py-3 border-r">Instrument</th>
              <th className="text-left px-4 py-3 border-r">Entry</th>
              <th className="text-left px-4 py-3 border-r">Exit</th>
              <th className="text-left px-4 py-3 border-r">Profit & Loss</th>
              <th className="text-left px-4 py-3">Cumulative Profit</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(Math.min(PAGE_LIMIT, totalDocs || PAGE_LIMIT))].map((_, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-4 w-12">
                  <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </td>
                <td className="px-4 py-4 border-r">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </td>
                <td className="px-4 py-4 border-r">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </td>
                <td className="px-4 py-4 border-r">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </td>
                <td className="px-4 py-4 border-r">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="md:hidden">
        {[...Array(Math.min(PAGE_LIMIT, totalDocs || PAGE_LIMIT))].map((_, index) => (
          <div key={index} className="bg-white p-4 border-b border-[#E3E7FF]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 flex-1">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
              <div className="text-right flex flex-col gap-2">
                <div className="h-3 bg-gray-200 rounded w-8 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="text-right ml-4 flex flex-col gap-2">
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton - only show if there will be pagination */}
      {(totalDocs > PAGE_LIMIT || totalPages > 1) && (
        <div className="md:px-0 px-4 flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="flex items-center gap-1">
            <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!selectedId) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-[12px] shadow w-full">
        <div className="text-center py-8">
          <p className="text-gray-500">No strategy selected</p>
          <p className="text-sm text-gray-400 mt-2">
            Please select a strategy to view transaction details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white md:p-6 rounded-[12px] flex flex-col gap-4 md:gap-6 shadow w-full">
      {/* Header */}
      <div className="flex justify-between items-center md:px-0 px-4 w-full">
        <div>
          <h2 className="font-semibold md:text-[20px] text-[16px] leading-[100%] md:block hidden">
            Transaction Order Details
            {selectedInstrument?.instrument_name && (
              <span className="text-sm text-gray-600 ml-2">
                - {selectedInstrument.instrument_name}
              </span>
            )}
          </h2>
          <h2 className="font-semibold text-lg leading-[100%] md:hidden">
            Order Book
            {selectedInstrument?.instrument_name && (
              <span className="text-sm text-gray-600 ml-2">
                - {selectedInstrument.instrument_name}
              </span>
            )}
          </h2>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="font-normal text-sm md:text-[16px] leading-[100%] text-[#000000BF] hidden md:block">
            <span className="font-semibold text-black">{totalDocs}</span>{" "}
            Transactions
          </p>
          <button
            className={`flex font-semibold text-sm md:text-[16px] leading-[100%] text-white items-center gap-2 p-3 rounded-md transition duration-150 ${
              downloadingCSV
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#407AFF] hover:bg-[#1565C0]"
            }`}
            onClick={handleDownloadCSV}
            disabled={!transactions.length || downloadingCSV}
            type="button"
          >
            <img
              src={downloadicon}
              alt="downloadicon"
              className="w-4 h-4 md:block hidden"
            />
            <span>{downloadingCSV ? "Downloading..." : "Download CSV"}</span>
          </button>
        </div>
      </div>

      <div className="border-[1px]"></div>

      {/* Desktop Table */}
      <div className="overflow-x-auto rounded-[8px] hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-[#F4F5FA] font-normal text-[16px] leading-[100%]">
            <tr className="border border-[#E3E7FF]">
              <th className="text-left px-4 py-3 w-12"></th>
              <th className="text-left px-4 py-3">T.Id</th>
              <th className="text-left px-4 py-3 border-r">Instrument</th>
              <th className="text-left px-4 py-3 border-r">Entry</th>
              <th className="text-left px-4 py-3 border-r">Exit</th>
              <th className="text-left px-4 py-3 border-r">Profit & Loss</th>
              <th className="text-left px-4 py-3">Cumulative Profit</th>
            </tr>
          </thead>
          <tbody>
            {groupedTransactions.map((group, groupIndex) => {
              // Calculate total profit for the group
              const groupTotalProfit = calculateGroupTotalProfit(group);
              
              // ✅ FIXED: For single transactions, always show as expanded
              const isExpanded = group.count === 1 || expandedGroups.has(group.transactionId);
              
              return (
                <React.Fragment key={group.transactionId}>
                  <tr
                    className="hover:bg-gray-50 transition cursor-pointer border"
                    onClick={() => {
                      // Only allow expansion for grouped transactions
                      if (group.isGrouped) {
                        toggleGroupExpansion(group.transactionId);
                      }
                    }}
                  >
                    <td className="px-4 py-4 w-12">
                      <ExpandIcon
                        isExpanded={isExpanded}
                        count={group.count}
                      />
                    </td>
                    <td className="px-4 py-4 font-normal text-[16px] leading-[100%]">
                      {group.mainTransaction.transaction_id}
                    </td>
                    {/* Instrument Column */}
                    <td className="px-4 py-4 text-gray-900 font-semibold border-r">
                      {!isExpanded ? (
                        // Collapsed view - show only contract_name (LEFT ALIGNED)
                        <div className="flex justify-start items-center h-full">
                          <p className="font-semibold text-[16px] leading-[100%]">
                            {group.mainTransaction.scrip_name}
                          </p>
                        </div>
                      ) : (
                         // Expanded view - show full details
                         <div className="flex justify-between h-full">
                           <div className="flex flex-col gap-4">
                             <p className="font-semibold text-[16px] leading-[100%]">
                               {group.allTransactions[0]?.contract_name || group.mainTransaction.contract_name}
                             </p>
                             <p className="font-normal text-[14px] leading-[100%]">
                               {group.mainTransaction.scrip_name}
                             </p>
                           </div>
                           <div className="flex flex-col gap-4 items-end">
                             <p className="font-semibold text-[16px] leading-[100%]">
                               {Math.floor(group.allTransactions[0]?.quantity || 0)}
                             </p>
                             <p className="font-normal text-[14px] leading-[100%] text-[#000000BF]">
                               Qty
                             </p>
                           </div>
                         </div>
                      )}
                    </td>
                    {/* Entry Column */}
                    <td className="px-4 py-4 border-r">
                      {!isExpanded ? (
                        // Collapsed view - show only date (LEFT ALIGNED)
                        <div className="flex justify-start items-center h-full">
                          <div className="font-semibold text-[12px] leading-[100%] text-[#00000066]">
                            {formatDateTime(group.allTransactions[0]?.entry_time)}
                          </div>
                        </div>
                      ) : (
                        // Expanded view - show full details
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                           <div className="font-semibold text-[16px] leading-[100%] relative">
                             {rupees(group.allTransactions[0]?.entry || "")}
                           </div>
                           {group.allTransactions[0] && (
                             <div
                               className={`font-semibold relative top-2 text-[12px] leading-[100%] inline-block text-xs mt-1 px-4 py-2 w-fit rounded-[4px] ${
                                 group.allTransactions[0].entry_type?.toLowerCase() === "buy"
                                   ? "bg-[#407AFF1F] text-[#407AFF]"
                                   : "bg-[#FF40401F] text-[#E01212]"
                               }`}
                             >
                               {group.allTransactions[0].entry_type}
                             </div>
                           )}
                          </div>
                          <div className="font-semibold text-[12px] leading-[100%] text-[#00000066]">
                            {formatDateTime(group.allTransactions[0]?.entry_time)}
                          </div>
                        </div>
                      )}
                    </td>
                    {/* Exit Column */}
                    <td className="px-4 py-4 border-r">
                      {!isExpanded ? (
                        // Collapsed view - show only date (LEFT ALIGNED)
                        <div className="flex justify-start items-center h-full">
                          <div className="font-semibold text-[12px] leading-[100%] text-[#00000066]">
                            {formatDateTime(group.allTransactions[0]?.exit_time)}
                          </div>
                        </div>
                      ) : (
                        // Expanded view - show full details
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                           <div className="font-semibold text-[16px] leading-[100%]">
                             {rupees(group.allTransactions[0]?.exit || "")}
                           </div>
                           {group.allTransactions[0] && (
                             <div
                               className={`font-semibold text-[12px] relative top-2 leading-[100%] inline-block text-xs mt-1 w-fit px-4 py-2 rounded-[4px] ${
                                 group.allTransactions[0].exit_type?.toLowerCase() === "buy"
                                   ? "bg-[#407AFF1F] text-[#407AFF]"
                                   : "bg-[#FF40401F] text-[#E01212]"
                               }`}
                             >
                               {group.allTransactions[0].exit_type}
                             </div>
                           )}
                          </div>
                          <div className="font-semibold text-[12px] leading-[100%] text-[#00000066]">
                            {formatDateTime(group.allTransactions[0]?.exit_time)}
                          </div>
                        </div>
                      )}
                    </td>
                    {/* ✅ UPDATED: Profit Column with + sign for positive values */}
                    <td
                      className={`px-4 py-4 font-semibold text-[16px] leading-[100%] border-r w-[220px] ${
                        // When collapsed, use group_total_profit; when expanded, use first sub_transaction profit
                        !isExpanded 
                          ? (parseFloat(group.mainTransaction.group_total_profit || 0) < 0 ? "text-[#DA0909]" : "text-[#1F950C]")
                          : (parseFloat(group.allTransactions[0]?.profit || group.mainTransaction.profit || 0) < 0 ? "text-[#DA0909]" : "text-[#1F950C]")
                      }`}
                    >
                       {!isExpanded 
                         ? formatProfit(group.mainTransaction.group_total_profit ?? 0) // ✅ Show group_total_profit when collapsed
                         : formatProfit((group.allTransactions[0]?.profit || group.mainTransaction.profit) ?? 0) // ✅ Show first transaction profit when expanded
                       }
                    </td>
                    {/* ✅ UPDATED: Cumulative Profit with + sign for positive values */}
                    <td
                      rowSpan={
                        isExpanded ? group.count : 1
                      }
                      className={`px-4 py-4 font-semibold text-[16px] leading-[100%] w-[220px] text-center align-middle ${
                        parseFloat(group.mainTransaction.cumulative_profit) < 0
                          ? "text-[#DA0909]"
                          : "text-[#1F950C]"
                      }`}
                    >
                      {formatProfit(group.mainTransaction.cumulative_profit)} {/* ✅ Use formatProfit for + sign */}
                    </td>
                  </tr>
                  {/* Expanded rows in each group */}
                  {isExpanded &&
                    group.allTransactions.slice(1).map((transaction, txnIndex) => (
                      <tr
                        key={`${group.transactionId}-${txnIndex}`}
                        className="border"
                        style={{ backgroundColor: "#f9fafb" }}
                        onClick={() => {
                          if (group.isGrouped) {
                            toggleGroupExpansion(group.transactionId);
                          }
                        }}
                      >
                        <td className="px-4 py-4 w-12"></td>
                        <td className="px-4 py-4 font-normal text-[16px] leading-[100%] text-gray-600">
                          {/* {transaction.transaction_id} */}
                        </td>
                        <td className="px-4 py-4 text-gray-900 font-semibold border-r">
                          <div className="flex justify-between h-full">
                            <div className="flex flex-col gap-4">
                              <p className="font-semibold text-[16px] leading-[100%]">
                                {transaction.contract_name}
                              </p>
                               <p className="font-normal text-[14px] leading-[100%]">
                                 {group.mainTransaction.scrip_name}
                               </p>
                            </div>
                            <div className="flex flex-col gap-4 items-end">
                              <p className="font-semibold text-[16px] leading-[100%]">
                                {Math.floor(transaction.quantity || 0)}
                              </p>
                              <p className="font-normal text-[14px] leading-[100%] text-[#000000BF]">
                                Qty
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 border-r">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <div className="font-semibold text-[16px] leading-[100%]">
                                {rupees(transaction.entry)}
                              </div>
                              <div
                                className={`font-semibold relative top-2 text-[12px] leading-[100%] inline-block text-xs mt-1 w-fit px-4 py-2 rounded-[4px] ${
                                  transaction.entry_type?.toLowerCase() === "buy"
                                    ? "bg-[#407AFF1F] text-[#407AFF]"
                                    : "bg-[#FF40401F] text-[#E01212]"
                                }`}
                              >
                                {transaction.entry_type}
                              </div>
                            </div>
                             <div className="font-semibold text-[12px] leading-[100%] text-[#00000066]">
                               {formatDateTime(transaction.entry_time)}
                             </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 border-r">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <div className="font-semibold text-[16px] leading-[100%]">
                                {rupees(transaction.exit)}
                              </div>
                              <div
                                className={`font-semibold relative top-2 text-[12px] leading-[100%] inline-block text-xs mt-1 w-fit px-4 py-2 rounded-[4px] ${
                                  transaction.exit_type?.toLowerCase() === "buy"
                                    ? "bg-[#407AFF1F] text-[#407AFF]"
                                    : "bg-[#FF40401F] text-[#E01212]"
                                }`}
                              >
                                {transaction.exit_type}
                              </div>
                            </div>
                             <div className="font-semibold text-[12px] leading-[100%] text-[#00000066]">
                               {formatDateTime(transaction.exit_time)}
                             </div>
                          </div>
                        </td>
                        {/* ✅ UPDATED: Expanded row profit with + sign */}
                        <td
                          className={`px-4 py-4 font-semibold text-[16px] leading-[100%] border-r w-[220px] ${
                            parseFloat(transaction.profit) < 0
                              ? "text-[#DA0909]"
                              : "text-[#1F950C]"
                          }`}
                        >
                          {formatProfit(transaction.profit ?? 0)} {/* ✅ Use formatProfit for + sign */}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ FIXED: Mobile Card Layout with proper parent-child relationship */}
      <div className="md:hidden">
        {groupedTransactions.map((group, groupIndex) => {
          // Calculate total profit for the group
          const groupTotalProfit = calculateGroupTotalProfit(group);
          const isGroupExpanded = expandedGroups.has(group.transactionId);
          const isSingleTransaction = group.count === 1;
          
          return (
            <div key={group.transactionId} className="">
              {/* Main card */}
              <div className="bg-white p-4 border-b border-[#E3E7FF]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 flex-1">
                    {/* Expand/Collapse Icon - only for grouped transactions */}
                    {group.isGrouped && (
                      <div
                        onClick={() => toggleGroupExpansion(group.transactionId)}
                        className="cursor-pointer p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <ExpandIcon
                          isExpanded={isGroupExpanded}
                          count={group.count}
                        />
                      </div>
                    )}
                    {/* Card content click - only works for single transactions or when parent is expanded */}
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => toggleRowExpansion(groupIndex, group.transactionId, isSingleTransaction)}
                    >
                       <h3 className="font-semibold md:text-[16px] text-[11px] md:leading-[120%] leading-[100%] text-black mb-1">
                         {group.allTransactions[0]?.contract_name || group.mainTransaction.contract_name}
                       </h3>
                      {(!isGroupExpanded && group.isGrouped) ? (
                        // Collapsed view - show only exit date
                        <p className="md:text-[14px] text-[10px] md:leading-[120%] leading-[100%] text-[#000000BF]">
                          Exit: {formatDateTime(group.allTransactions[0]?.exit_time)}
                        </p>
                      ) : (
                        // Expanded view or single transaction - show entry date
                        <p className="md:text-[14px] text-[10px] md:leading-[120%] leading-[100%] text-[#000000BF]">
                          Entry: {formatDateTime(group.allTransactions[0]?.entry_time)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex flex-col gap-2">
                    <p className="md:text-[12px] text-[10px] leading-[120%] text-[#000000BF]">
                      P & L
                    </p>
                    {/* ✅ UPDATED: Mobile P&L with + sign for positive values */}
                    <p
                      className={`font-semibold md:text-[16px] text-[13px] md:leading-[120%] leading-[100%] ${
                         // When collapsed, use group_total_profit; when expanded, use first sub_transaction profit
                         !isGroupExpanded 
                           ? (parseFloat(group.mainTransaction.group_total_profit || 0) < 0 ? "text-[#DA0909]" : "text-[#1F950C]")
                           : (parseFloat(group.allTransactions[0]?.profit || group.mainTransaction.profit || 0) < 0 ? "text-[#DA0909]" : "text-[#1F950C]")
                       }`}
                     >
                       {!isGroupExpanded 
                         ? formatProfit(group.mainTransaction.group_total_profit ?? 0) // ✅ Show group_total_profit when collapsed
                         : formatProfit((group.allTransactions[0]?.profit || group.mainTransaction.profit) ?? 0) // ✅ Show first transaction profit when expanded
                       }
                    </p>
                  </div>
                  <div className="text-right ml-4 flex flex-col gap-2">
                    <p className="md:text-[12px] text-[10px] md:leading-[120%] leading-[100%] text-[#000000BF]">
                      Cumulative
                    </p>
                    {/* ✅ UPDATED: Mobile cumulative with + sign for positive values */}
                    <p
                      className={`font-semibold md:text-[16px] text-[13px] md:leading-[120%] leading-[100%] ${
                        parseFloat(group.mainTransaction.cumulative_profit) < 0
                          ? "text-[#DA0909]"
                          : "text-[#1F950C]"
                      }`}
                    >
                      {formatProfit(group.mainTransaction.cumulative_profit)} {/* ✅ Use formatProfit for + sign */}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* ✅ FIXED: Show detailed view for main transaction - only for single transactions or when individually clicked */}
              {((isSingleTransaction || isGroupExpanded) && expandedRow === groupIndex) && (
                <div className="animate-slideDown">
                  <DetailedView item={group.isGrouped ? {
                    ...group.allTransactions[0],
                    transaction_id: group.mainTransaction.transaction_id
                  } : group.mainTransaction} />
                </div>
              )}
              
              {/* ✅ FIXED: All transactions expanded - only show when parent group is expanded */}
              {isGroupExpanded && (
                <div className="animate-slideDown">
                  {group.allTransactions.slice(1).map((transaction, txnIndex) => (
                    <div key={`${group.transactionId}-all-${txnIndex + 1}`}>
                      <div
                        className="bg-gray-50 p-4 cursor-pointer transition-colors duration-200 border-b border-[#E3E7FF]"
                        onClick={() => toggleRowExpansion(`${groupIndex}-${txnIndex + 1}`, group.transactionId)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold md:text-[16px] text-[12px] md:leading-[120%] leading-[100%] text-black mb-1">
                              {transaction.contract_name}
                            </h3>
                              <p className="md:text-[14px] text-[10px] md:leading-[120%] leading-[100%] text-[#000000BF]">
                                Entry: {formatDateTime(transaction.entry_time)}
                              </p>
                          </div>
                          <div className="text-right flex flex-col gap-2">
                            <p className="md:text-[12px] text-[10px] leading-[120%] text-[#000000BF]">
                              P & L
                            </p>
                            {/* ✅ UPDATED: Child transaction profit with + sign */}
                            <p
                              className={`font-semibold md:text-[16px] text-[13px] md:leading-[120%] leading-[100%] ${
                                parseFloat(transaction.profit) < 0
                                  ? "text-[#DA0909]"
                                  : "text-[#1F950C]"
                              }`}
                            >
                              {formatProfit(transaction.profit ?? 0)} {/* ✅ Use formatProfit for + sign */}
                            </p>
                          </div>
                          <div className="text-right ml-4 flex flex-col gap-2">
                            <p className="md:text-[12px] text-[10px] md:leading-[120%] leading-[100%] text-[#000000BF]">
                              Cumulative
                            </p>
                             {/* ✅ UPDATED: Child transaction cumulative with + sign */}
                             <p
                               className={`font-semibold md:text-[16px] text-[13px] md:leading-[120%] leading-[100%] ${
                                 parseFloat(group.mainTransaction.cumulative_profit) < 0
                                   ? "text-[#DA0909]"
                                   : "text-[#1F950C]"
                               }`}
                             >
                               {formatProfit(group.mainTransaction.cumulative_profit)} {/* ✅ Use formatProfit for + sign */}
                             </p>
                          </div>
                        </div>
                      </div>
                      {/* ✅ FIXED: Only show detailed view if parent group is expanded AND individual row is clicked */}
                      {expandedRow === `${groupIndex}-${txnIndex + 1}` && (
                        <div className="animate-slideDown">
                          <DetailedView item={{
                            ...transaction,
                            transaction_id: group.mainTransaction.transaction_id
                          }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="md:px-0 px-4 flex items-center justify-between">
          <span className="md:font-semibold font-medium md:text-[14px] text-[12px] leading-[100%] text-[#00000066]">
            {`Showing ${rangeStart}-${rangeEnd} of ${totalDocs}`}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`md:px-4 px-2 md:py-1 text-lg font-medium rounded-l-[8px] border border-[#D5D5D5] transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-[#202224] hover:bg-gray-100 cursor-pointer"
              }`}
            >
              &lt;
            </button>
            <div className="flex">
              {getPageNumbers().map((pageNum, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof pageNum === "number" && setCurrentPage(pageNum)}
                  disabled={pageNum === "..."}
                  className={`md:px-3 px-2 md:py-2 py-1 text-sm font-medium border-t border-b transition-all duration-200 ${
                    pageNum === currentPage
                      ? "bg-blue-500 text-white font-semibold border border-blue-500"
                      : pageNum === "..."
                      ? "text-gray-400 cursor-not-allowed border-[#D5D5D5]"
                      : "text-[#202224] hover:bg-gray-100 cursor-pointer border-[#D5D5D5]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`md:px-4 px-2 md:py-1 text-lg font-medium rounded-r-[8px] border border-[#D5D5D5] transition-all duration-200 ${
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
      <style jsx>{`
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionOrderDetails;
