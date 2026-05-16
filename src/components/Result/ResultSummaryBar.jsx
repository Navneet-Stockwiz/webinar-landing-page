import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import { useSearch } from "../../contexts/SearchContext";
import { useSlippage } from "../../contexts/SlippageContext";
import info from "../../assets/svg/alert.svg";

const ResultSummaryBar = () => {
  const [slippageType, setSlippageType] = useState("₹");
  const [slippageValue, setSlippageValue] = useState("");
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSlippageApplied, setIsSlippageApplied] = useState(false);
  const [errorInputField, setErrorInputField] = useState(false);

  const location = useLocation();
  const selectedId = location.state?._id;

  // Get selected instrument from global context
  const { selectedInstrument, setSelectedInstrument } = useSearch();
  console.log(
    "🚀 ~ ResultSummaryBar ~ selectedInstrument:",
    selectedInstrument
  );

  // Get slippage context
  const { applySlippage } = useSlippage();

  useEffect(() => {
    if (!selectedId) {
      setInstruments([]);
      setSelectedInstrument(null);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const res = await api.get(`getWebInstrumentChips/${selectedId}`);

        if (res.data && res.data.status && Array.isArray(res.data.data)) {
          const instrumentData = res.data.data.filter(
            (inst) => inst.instrument_name && inst.instrument_name.trim() !== ""
          );

          setInstruments(instrumentData);

          // Modified to select "All" by default
          setSelectedInstrument(null); // Always select "All" by default
        } else {
          setInstruments([]);
          setSelectedInstrument(null);
        }
      } catch (err) {
        console.error("Error fetching instruments:", err);
        setInstruments([]);
        setSelectedInstrument(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedId, setSelectedInstrument]);

  // Handle Go button click - Apply slippage globally
  const handleGoClick = () => {
    const numValue = parseFloat(slippageValue);

    // Add maximum value validation for percentage
    if (slippageType === "%" && numValue > 100) {
      setErrorInputField(true);
      return;
    }

    // Clear error state on successful validation
    setErrorInputField(false);

    // Apply slippage globally - this will trigger re-fetches in all components
    applySlippage(slippageType, slippageValue);
    setIsSlippageApplied(true);

    console.log("🚀 ~ Go clicked - slippage applied:", {
      type: slippageType,
      value: slippageValue,
    });
  };

  // Handle Clear button click - Clear slippage value and send null to slippage
  const handleClearClick = () => {
    setSlippageValue("");
    setErrorInputField(false);
    setIsSlippageApplied(false);
    // Clear the slippage globally - pass empty/null values
    applySlippage(slippageType, "");

    console.log("🚀 ~ Clear clicked - slippage cleared");
  };

  // Unified button handler - determines whether to Go or Clear
  const handleButtonClick = () => {
    if (isSlippageApplied) {
      handleClearClick();
    } else {
      handleGoClick();
    }
  };

  // Handle "All" button click - set selected instrument to null
  const handleAllClick = () => {
    setSelectedInstrument(null);
    console.log("🚀 ~ All clicked - selected instrument set to null");
  };

  // Handle instrument selection
  const handleInstrumentClick = (instrument) => {
    setSelectedInstrument(instrument);
    console.log("🚀 ~ Selected instrument object:", instrument);
  };

  // Handle keyboard navigation for instruments
  const handleInstrumentKeyDown = (e, instrument) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInstrumentClick(instrument);
    }
  };

  // Handle keyboard navigation for "All" button
  const handleAllKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAllClick();
    }
  };

  // Handle input key down for dynamic button behavior
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  // Handle input value change - reset applied state when user modifies input
  const handleInputChange = (e) => {
    setSlippageValue(e.target.value);
    setErrorInputField(false);

    // If user changes input after applying slippage, reset the applied state
    if (isSlippageApplied && e.target.value !== slippageValue) {
      setIsSlippageApplied(false);
    }
  };

  // Determine button text and state
  const getButtonText = () => {
    if (isSlippageApplied) {
      return "Clear";
    } else {
      return "Go";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg md:p-3 md:px-3 px-4 flex md:flex-row flex-col items-center justify-between gap-4 md:gap-0">
      {/* Slippage Input Section */}
      <div className="flex items-center gap-2 bg-[#F4F5FA] border-[1px] border-[#0000000F] rounded-[8px] md:p-[9px] p-2 md:w-fit w-full">
        <span className="font-semibold text-[14px] leading-[100%] whitespace-nowrap">
          Slippage
        </span>
        <img src={info} alt={info} />
        <div
          className={`flex border bg-white rounded-md overflow-hidden flex-1 md:flex-initial ${
            errorInputField
              ? "border-red-500 ring-2 ring-red-200"
              : "border-gray-300"
          }`}
        >
          {/* Toggle Button */}
          <div className="bg-[#0000000F] m-1 p-1 rounded-[5px] flex">
            <button
              className={`px-[10px] py-1 rounded-[4px] transition-colors text-[12px] font-medium ${
                slippageType === "₹"
                  ? "bg-[#407AFF] text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSlippageType("₹")}
              tabIndex={-1}
              type="button"
            >
              ₹
            </button>
            <button
              className={`px-[10px] py-1 rounded-[4px] transition-colors text-[12px] font-medium ${
                slippageType === "%"
                  ? "bg-[#407AFF] text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSlippageType("%")}
              tabIndex={-1}
              type="button"
            >
              %
            </button>
          </div>
          <input
            type="number"
            className={`md:w-[190px] w-[110px] md:px-[10px] px-2 md:py-1 py-2 outline-none border-0 text-[14px] ${
              errorInputField ? "bg-red-50 placeholder-red-400" : ""
            }`}
            value={slippageValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Enter value"
            min="0"
            step="0.01"
            max={slippageType === "%" ? "100" : undefined}
          />
        </div>
        <button
          onClick={handleButtonClick}
          className={`font-semibold text-[12px] leading-[100%] md:py-3 py-[14px] px-4 rounded-[4px] transition-colors flex-shrink-0 ${
            isSlippageApplied
              ? "text-black border-[1px] border-[#000000]"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
          type="button"
        >
          {getButtonText()}
        </button>
      </div>

      {/* Instruments Section */}
      <div className="flex flex-col items-start gap-2 w-full md:w-auto">
        <span className="md:block hidden font-medium md:text-[14px] text-[12px] leading-[100%] text-[#000000BF] md:mr-2 mr-1 flex-shrink-0">
          Instruments:
        </span>
        <div
          className="flex items-center gap-1 overflow-x-auto min-w-0 flex-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={(e) => {
            e.currentTarget.style.setProperty("scrollbar-width", "none");
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {loading ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="animate-pulse bg-gray-200 rounded-full h-8 w-20 flex-shrink-0"></div>
              <div className="animate-pulse bg-gray-200 rounded-full h-8 w-16 flex-shrink-0"></div>
              <div className="animate-pulse bg-gray-200 rounded-full h-8 w-18 flex-shrink-0"></div>
            </div>
          ) : instruments.length === 0 ? (
            <span className="text-gray-500 text-sm flex-shrink-0">No Data</span>
          ) : (
            <div className="flex items-center gap-1 md:gap-2 pr-2">
              {/* All Button */}
              <span
                onClick={handleAllClick}
                onKeyDown={handleAllKeyDown}
                className={`cursor-pointer font-semibold md:text-[14px] text-[11px] leading-[100%] rounded-full md:py-[10px] py-2 md:px-4 px-3 transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedInstrument === null
                    ? "bg-[#000000] text-white"
                    : "bg-[#F4F5FA] text-black hover:bg-[#E8E9F0]"
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={selectedInstrument === null}
              >
                All
              </span>

              {/* Individual Instrument Buttons */}
              {instruments.map((inst) => (
                <span
                  key={inst._id}
                  onClick={() => handleInstrumentClick(inst)}
                  onKeyDown={(e) => handleInstrumentKeyDown(e, inst)}
                  className={`cursor-pointer font-semibold md:text-[14px] text-[11px] leading-[100%] rounded-full md:py-[10px] py-2 md:px-4 px-3 transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedInstrument?._id === inst._id
                      ? "bg-[#000000] text-white"
                      : "bg-[#F4F5FA] text-black hover:bg-[#E8E9F0]"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedInstrument?._id === inst._id}
                >
                  {inst.instrument_name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSummaryBar;
