import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import bitcap from "../../assets/svg/bitcap.svg";
import bullish from "../../assets/svg/bullish.svg";
import bearishicon1 from "../../assets/svg/bearishicon1.svg";
import neautralicon from "../../assets/svg/neautralicon.svg";
import multiicon from "../../assets/svg/multi.svg";
import correcticon from "../../assets/svg/correcticon.svg";
import lowrisk from "../../assets/svg/lowrisk.svg";
import highrisk from "../../assets/svg/highrisk.svg";
import moderaterisk from "../../assets/svg/moderaterisk.svg";
import BacktestResultsDialog from "./BacktestResultsDialog";
import DisclaimerPopup from "./DisclaimerPopup"; // Import the new component
import { useSelectedStrategy } from "../../contexts/SelectedStrategyContext";
import { useDisclaimerPopup } from "../../hooks/useDisclaimerPopup"; // Import the hook

const StrategyCard = ({ strategies }) => {
  const navigate = useNavigate(); // Add navigation hook
  const [openDialog, setOpenDialog] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState({});
  const [showReadMore, setShowReadMore] = useState({});
  const [checkedStrategies, setCheckedStrategies] = useState(new Set());
  const [pendingStrategy, setPendingStrategy] = useState(null); // Store pending strategy

  // Use context instead of local state
  const { setSelectedStrategy } = useSelectedStrategy();

  // Use disclaimer popup hook
  const {
    shouldShowDisclaimer,
    setShouldShowDisclaimer,
    markDisclaimerAsSeen,
    checkShouldShowDisclaimer,
  } = useDisclaimerPopup();

  // Refs to check if text overflows
  const descriptionRefs = useRef({});

  // Function to check text overflow - memoized to prevent infinite loops
  const checkTextOverflow = useCallback(
    (strategyId) => {
      // Prevent checking the same strategy multiple times
      if (checkedStrategies.has(strategyId)) return;

      const element = descriptionRefs.current[strategyId];
      if (element) {
        // Force a reflow to ensure proper measurements
        element.offsetHeight;

        // Check if scrollHeight is greater than clientHeight (overflow)
        const hasOverflow = element.scrollHeight > element.clientHeight;

        setShowReadMore((prev) => ({
          ...prev,
          [strategyId]: hasOverflow,
        }));

        // Mark this strategy as checked
        setCheckedStrategies(
          (prevChecked) => new Set([...prevChecked, strategyId])
        );
      }
    },
    [checkedStrategies]
  );

  // Reset checked strategies when strategies change
  useEffect(() => {
    setCheckedStrategies(new Set());
    setShowReadMore({});
  }, [strategies]);

  // Check if description overflows 2 lines
  useEffect(() => {
    if (!strategies || strategies.length === 0) return;

    const timeoutId = setTimeout(() => {
      strategies.forEach((strategy) => {
        if (!checkedStrategies.has(strategy._id)) {
          checkTextOverflow(strategy._id);
        }
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [strategies, checkTextOverflow, checkedStrategies]);

  // Handle View Backtest button click
  const handleViewBacktestClick = (strategy) => {
    if (checkShouldShowDisclaimer()) {
      // Show disclaimer first
      setPendingStrategy(strategy);
      setShouldShowDisclaimer(true);
    } else {
      // Directly show backtest results
      proceedToBacktest(strategy);
    }
  };

  // Proceed to backtest after disclaimer
  const proceedToBacktest = (strategy) => {
    setSelectedStrategy(strategy);
    setOpenDialog(true);
  };

  // Handle disclaimer continue
  const handleDisclaimerContinue = () => {
    markDisclaimerAsSeen();
    if (pendingStrategy) {
      proceedToBacktest(pendingStrategy);
      setPendingStrategy(null);
    }
  };

  // Handle disclaimer close
  const handleDisclaimerClose = () => {
    setShouldShowDisclaimer(false);
    setPendingStrategy(null);
  };

  const openDescriptionModal = (strategyId) => {
    setShowDescriptionModal((prev) => ({
      ...prev,
      [strategyId]: true,
    }));
  };

  const closeDescriptionModal = (strategyId) => {
    setShowDescriptionModal((prev) => ({
      ...prev,
      [strategyId]: false,
    }));
  };

  // Function to truncate text and add "...Read more"
  const getTruncatedDescription = (text, strategyId) => {
    if (!showReadMore[strategyId]) {
      return text;
    }

    // Approximate character limit for 2 lines (adjust based on your design)
    const maxChars = 120; // You can adjust this number based on your card width

    if (text.length <= maxChars) {
      return text;
    }

    // Find the last space before the limit to avoid cutting words
    const truncatedText = text.substring(0, maxChars);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    const finalText = truncatedText.substring(0, lastSpaceIndex);

    return finalText;
  };

  // Helper function to get direction styling
  const getDirectionStyling = (direction) => {
    switch (direction) {
      case "bullish":
        return {
          bgColor: "bg-[#1F950C]",
          icon: bullish,
          iconClass: "w-[16px] h-[11px]",
        };
      case "bearish":
        return {
          bgColor: "bg-[#DA0909]",
          icon: bearishicon1,
          iconClass: "w-[14px] h-[8px]",
        };
      case "neutral":
        return {
          bgColor: "bg-[#407AFF]",
          icon: neautralicon,
          iconClass: "w-[16px] h-[16px]",
        };
      case "multi":
        return {
          bgColor: "bg-[#407AFF]",
          icon: multiicon,
          iconClass: "w-[16px] h-[16px]",
        };
      default:
        return {
          bgColor: "bg-[#DA0909]",
          icon: bearishicon1,
          iconClass: "w-[14px] h-[8px]",
        };
    }
  };

  return (
    <>
      {strategies?.map((strategy) => {
        const directionStyling = getDirectionStyling(strategy?.direction);

        return (
          <div
            key={strategy._id}
            className="flex flex-col md:gap-3 gap-[10px] md:mt-2 bg-white border border-[#00000029] pt-6 px-4 pb-[14px] rounded-[14px] hover:shadow-md transition-shadow w-full relative"
          >
            {/* Tags */}
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFCB15] w-fit absolute -top-3 left-4">
              {strategy?.category}
            </span>
            <span
              className={`items-center px-3 py-1 flex gap-1 rounded-full text-xs capitalize font-medium ${directionStyling.bgColor} text-white w-fit absolute -top-3 right-4`}
            >
              <img
                src={directionStyling.icon}
                alt={strategy?.direction}
                className={`object-cover ${directionStyling.iconClass}`}
              />
              {strategy?.direction}
            </span>

            {/* Icon and Title */}
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex gap-2 flex-1 items-center justify-start">
                    <img
                      src={strategy?.logo}
                      alt="strategy logo"
                      className="h-[36px] w-[36px] object-cover"
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="font-bold md:text-[16px] text-[14px] leading-[100%] text-base mb-2">
                        {strategy?.name}
                      </h3>
                      <div className="flex items-center text-sm gap-1 text-gray-500">
                        <span className="font-medium md:text-[12px] text-[10px] leading-[100%] text-[#000000BF]">
                          By Stockwiz Tech. LLP
                        </span>
                        <img src={correcticon} alt="verified" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center w-fit">
                    <img
                      src={
                        strategy?.risk_type === "high"
                          ? highrisk
                          : strategy?.risk_type === "moderate"
                          ? moderaterisk
                          : lowrisk
                      }
                      alt={`${strategy?.risk_type ?? "risk"}-icon`}
                      style={{ display: "block" }}
                    />
                    <p className="font-medium text-[10px]  whitespace-nowrap">
                      {strategy?.risk_type === "high"
                        ? "High Risk"
                        : strategy?.risk_type === "moderate"
                        ? "Moderate Risk"
                        : "Low Risk"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Amounts */}
            <div className="grid grid-cols-2 md:gap-4 bg-[#F4F5FA] rounded-[12px] p-4">
              <div>
                <div className="font-normal md:text-[12px] text-[10px] leading-[100%] mb-2 text-start">
                  Minimum Investment
                </div>
                <div className="font-inter font-bold md:text-[16px] text-[13px] leading-[100%] text-start">
                  ₹{strategy?.investment_amount}
                </div>
              </div>
              <div>
                <div className="font-normal md:text-[12px] text-[10px] leading-[100%] mb-2 text-end">
                  Recommended Investment
                </div>
                <div className="font-inter font-bold md:text-[16px] text-[13px] leading-[100%] text-end">
                  ₹{strategy?.recommended_investment_amount}
                </div>
              </div>
            </div>

            {/* Description with 2-line limit and inline "...Read more" */}
            <div className="relative">
              <p
                ref={(el) => {
                  if (el && !checkedStrategies.has(strategy._id)) {
                    descriptionRefs.current[strategy._id] = el;
                  }
                }}
                className="font-normal md:text-[14px] text-[10px] text-[#000000BF]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: "1.4",
                  maxHeight: "2.8em",
                  wordBreak: "break-word",
                }}
              >
                {getTruncatedDescription(strategy?.description, strategy._id)}
                {showReadMore[strategy._id] && (
                  <span
                    onClick={() => openDescriptionModal(strategy._id)}
                    className="text-[#407AFF] font-medium hover:underline cursor-pointer ml-1"
                  >
                    ...Read more
                  </span>
                )}
              </p>
            </div>

            {/* Statistics */}
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <span className="font-normal md:text-[14px] text-[12px] md:leading-[22px] leading-[18px] text-[#000000BF]">
                    Profit Factor:
                  </span>
                  <span className="font-bold md:text-[14px] text-[12px] md:leading-[22px] leading-[18px] text-[#1F950C]">
                    {strategy?.profit_factor}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="font-normal md:text-[14px] text-[12px] md:leading-[22px] leading-[18px] text-[#000000BF]">
                    Reward/Risk Ratio:
                  </span>
                  <span className="font-bold md:text-[14px] text-[12px] md:leading-[22px] leading-[18px]">
                    {strategy?.reward_to_risk_ratio}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 justify-end items-end">
                <div className="flex gap-1 items-center">
                  <span className="font-normal md:text-[14px] text-[12px] md:leading-[22px] leading-[18px] text-[#000000BF]">
                    Avg Monthly Return:
                  </span>
                  <span
                    className={`font-bold md:text-[14px] text-[12px] md:leading-[22px] leading-[18px] ${
                      parseFloat(strategy?.average_monthly_return) >= 0
                        ? "text-[#1F950C]"
                        : "text-[#DA0909]"
                    }`}
                  >
                    {strategy?.average_monthly_return}
                  </span>
                </div>

                <div className="flex gap-1 items-center">
                  <span className="font-normal md:text-[14px] text-[12px] md:leading-[22px] leading-[18px] text-[#000000BF]">
                    Win Rate:
                  </span>
                  <span className="font-bold md:text-[14px] text-[12px] md:leading-[22px] leading-[18px]">
                    {strategy?.win_rate}
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => handleViewBacktestClick(strategy)}
              className="md:text-[14px] text-[12px] md:leading-[21px] leading-[18px] w-full bg-[#407AFF] text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-600 transition-colors text-sm"
            >
              View Backtest Results
            </button>
          </div>
        );
      })}

      {/* Description Modal */}
      {Object.keys(showDescriptionModal).map((strategyId) => {
        if (!showDescriptionModal[strategyId]) return null;

        const strategy = strategies?.find((s) => s._id === strategyId);
        if (!strategy) return null;

        return (
          <div
            key={`modal-${strategyId}`}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={() => closeDescriptionModal(strategyId)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-start space-x-3">
                  <img
                    src={strategy?.logo}
                    alt="strategy logo"
                    className="h-[36px] w-[36px] object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold md:text-[16px] text-[14px] leading-[100%] text-base mb-2">
                      {strategy?.name}
                    </h3>
                    <div className="flex items-center text-sm gap-1 text-gray-500">
                      <span className="font-medium md:text-[12px] text-[10px] leading-[100%] text-[#000000BF]">
                        By Stockwiz Tech. LLP
                      </span>
                      <img src={correcticon} alt="verified" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => closeDescriptionModal(strategyId)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1 hover:bg-gray-100 rounded transition-colors"
                  type="button"
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <p className="font-normal text-[14px] leading-[160%] text-[#000000BF] whitespace-pre-wrap">
                  {strategy?.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Disclaimer Popup */}
      <DisclaimerPopup
        open={shouldShowDisclaimer}
        onContinue={handleDisclaimerContinue}
        onClose={handleDisclaimerClose}
      />

      <BacktestResultsDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default StrategyCard;
