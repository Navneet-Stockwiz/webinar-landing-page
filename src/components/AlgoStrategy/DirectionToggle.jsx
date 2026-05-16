import React, { useEffect } from "react";
import bearishicon from "../../assets/svg/bearishicon.svg";
import bullishicon from "../../assets/svg/bullishicon.svg";
import neutralicon from "../../assets/svg/neautralicon.svg";
import neutralicongray from "../../assets/svg/neautralicongray.svg";
import multiicon from "../../assets/svg/multi.svg";
import { DIRECTIONS } from "../../constants/filterConstants";
import { useSearch } from "../../contexts/SearchContext";

const iconColorFilter = (color) => {
  if (color === "red")
    return "invert(17%) sepia(99%) saturate(7495%) hue-rotate(354deg) brightness(106%) contrast(123%)";
  if (color === "green")
    return "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)";
  if (color === "gray") return "grayscale(100%) brightness(90%)";
  return "";
};

const DIRECTION_ICONS = {
  bullish: bullishicon,
  neutral: neutralicon,
  bearish: bearishicon,
  multi: multiicon,
};

const DIRECTION_ICONS_GRAY = {
  bullish: bullishicon,
  neutral: neutralicongray,
  bearish: bearishicon,
  multi: multiicon,
};

const DirectionToggle = ({ className = "" }) => {
  const { activeToggle, setActiveToggle, activeTab } = useSearch();
  console.log("🚀 ~ DirectionToggle ~ activeTab:", activeTab);
  
  // Filter out neutral button for Equity and Futures tabs (Multi stays)
  const getFilteredDirections = () => {
    if (activeTab === "Equity Algos" || activeTab === "Futures Algos") {
      return DIRECTIONS.filter((direction) => direction.value !== "neutral");
    }
    return DIRECTIONS;
  };

  const filteredDirections = getFilteredDirections();

  // Reset activeToggle if current value is not available in filtered directions
  useEffect(() => {
    const isActiveToggleAvailable = filteredDirections.some(
      (dir) => dir.value === activeToggle
    );
    
    if (!isActiveToggleAvailable && filteredDirections.length > 0) {
      // Set to first available direction (usually "all")
      setActiveToggle(filteredDirections[0].value);
    }
  }, [activeTab, filteredDirections, activeToggle, setActiveToggle]);

  const handleDirectionToggle = (direction) => {
    setActiveToggle(direction.value);
  };

  const getSliderPosition = () => {
    const activeIndex = filteredDirections.findIndex(
      (dir) => dir.value === activeToggle
    );
    
    // Handle case where activeToggle is not found in filtered directions
    const safeIndex = activeIndex >= 0 ? activeIndex : 0;
    const totalDirections = filteredDirections.length;
    
    if (totalDirections === 0) {
      return { left: "0%", width: "0%" };
    }
    
    const widthPercentage = 100 / totalDirections;
    return {
      left: `${safeIndex * widthPercentage}%`,
      width: `${widthPercentage}%`,
    };
  };

  const sliderPosition = getSliderPosition();

  // Function to get the correct icon source
  const getIconSource = (direction) => {
    const isActive = activeToggle === direction.value;

    if (direction.value === "neutral") {
      return isActive ? DIRECTION_ICONS[direction.value] : DIRECTION_ICONS_GRAY[direction.value];
    }

    return DIRECTION_ICONS[direction.value];
  };

  // Function to get the correct filter
  const getIconFilter = (direction) => {
    const isActive = activeToggle === direction.value;

    if (direction.value === "neutral") {
      return ""; // No filter needed for neutral as we use different SVGs
    }

    // multi.svg has white fill; when active (black bg) show as-is, when inactive use grayscale
    if (direction.value === "multi") {
      return isActive ? "" : "grayscale(100%) brightness(0.7)";
    }

    return isActive ? iconColorFilter(direction.color) : iconColorFilter("gray");
  };

  // Don't render if no directions available
  if (filteredDirections.length === 0) {
    return null;
  }

  return (
    <div
      className={`md:w-[450px] w-full border border-[#DCDCDC] rounded-[8px] p-1 ${className}`}
    >
      <div className="relative flex items-center bg-transparent">
        {/* Dynamic sliding background */}
        <span
          className="absolute top-0 h-full rounded-[7px] z-0 transition-all duration-300 ease-in-out bg-black"
          style={{
            left: sliderPosition.left,
            width: sliderPosition.width,
          }}
        ></span>

        {filteredDirections.map((direction) => (
          <button
            key={direction.id}
            className={`font-semibold text-[14px] leading-[18px] flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-[7px] transition-colors duration-300 relative z-10 ${
              activeToggle === direction.value
                ? "text-white"
                : "text-[#000000BF]"
            }`}
            onClick={() => handleDirectionToggle(direction)}
            style={{ background: "transparent" }}
          >
            {direction.value !== "all" && DIRECTION_ICONS[direction.value] && (
              <img
                src={getIconSource(direction)}
                alt={direction.label}
                style={{
                  width: 20,
                  height: 20,
                  filter: getIconFilter(direction),
                  transition: "filter 0.2s ease-in-out",
                }}
                className="md:block hidden"
              />
            )}
            {direction.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DirectionToggle;
