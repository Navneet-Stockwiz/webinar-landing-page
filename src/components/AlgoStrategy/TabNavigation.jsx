import React from "react";
import { Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../../contexts/SearchContext";
import { CATEGORIES } from "../../constants/filterConstants";
import DirectionToggle from "./DirectionToggle";

const TabNavigation = ({ strategies, totalCount }) => {
  console.log("🚀 ~ TabNavigation ~ totalCount:", totalCount);
  console.log("🚀 ~ TabNavigation ~ CATEGORIES:", CATEGORIES); // Add this to see the category values

  const { activeTab, setActiveTab, searchQuery, setSearchQuery } = useSearch();

  const currentTabIndex = CATEGORIES.findIndex(
    (tab) => tab.value === activeTab
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(CATEGORIES[newValue].value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const strategiesCount = strategies?.length || 0;

  // Default values for counts - always show counts
  const counts = {
    equityAlgosCount: totalCount?.equityAlgosCount || 0,
    optionAlgosCount: totalCount?.optionAlgosCount || 0,
    futuresAlgosCount: totalCount?.futuresAlgosCount || 0,
  };

  console.log("🚀 ~ TabNavigation ~ counts:", counts); // Add this to verify counts

  // Function to get count for each category
  const getCountForCategory = (categoryValue) => {
    console.log("🚀 ~ getCountForCategory ~ categoryValue:", categoryValue); // Add this to see what values are being passed

    switch (categoryValue) {
      case "equity":
      case "Equity Algos": // Add alternative case
        return counts.equityAlgosCount;
      case "options":
      case "Options Algos": // Add alternative case
        return counts.optionAlgosCount;
      case "futures":
      case "Futures Algos": // Add alternative case
        return counts.futuresAlgosCount;
      case "all":
      case "All": // Add alternative case
        return (
          counts.equityAlgosCount +
          counts.optionAlgosCount +
          counts.futuresAlgosCount
        );
      default:
        console.log("🚀 ~ getCountForCategory ~ no match for:", categoryValue); // Add this to see unmatched values
        return 0;
    }
  };

  return (
    <div className="flex md:flex-row flex-col gap-4 items-center justify-between md:bg-white md:px-2 px-4 rounded-[12px] w-full">
      {/* Desktop Tabs with Count */}
      <div className="flex items-center gap-4 flex-grow md:border-none border-b">
        <Tabs
          value={currentTabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          sx={{
            flexGrow: 1,
            "& .MuiTabs-indicator": {
              backgroundColor: "#407AFF",
              height: 4,
              borderRadius: "6px 6px 0 0",
              transition: "all 0.3s ease",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#9ca3af",
              position: "relative",
              marginRight: {
                md: "24px",
                xs: "0px",
              },
              "&.Mui-selected": {
                color: "#000000",
                fontWeight: 600,
              },
              "&:hover": {
                color: "#6b7280",
              },
            },
          }}
        >
          {CATEGORIES.map((category) => {
            const categoryCount = getCountForCategory(category.value);

            return (
              <Tab
                key={category.id}
                label={
                  <div className="flex items-center gap-2">
                    <span>{category.label}</span>
                    <span
                      className="relative bottom-2 right-1 flex justify-center items-center font-bold text-[10px] h-[20px] w-[20px] leading-[100%] rounded-full
                bg-[#407AFF] text-white"
                    >
                      {categoryCount}
                    </span>
                  </div>
                }
                sx={{
                  minWidth: "auto",
                  paddingX: 1,
                }}
              />
            );
          })}
        </Tabs>
      </div>

      <div className="flex md:flex-col flex-col-reverse w-full md:w-auto gap-4">
        {/* Dynamic Direction Toggle */}
        <div className="md:hidden">
          <DirectionToggle />
        </div>
      </div>

      {/* Search Input */}
      <div className="relative py-2 md:block hidden">
        <input
          type="text"
          placeholder="Search for something"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-[365px] pl-10 pr-4 py-2 bg-gray-100 border border-[#DCDCDC] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00000040]"
        />
        <SearchIcon className="w-5 h-5 text-[#1B1B1BBF] absolute left-3 top-4" />
      </div>
    </div>
  );
};

export default TabNavigation;
