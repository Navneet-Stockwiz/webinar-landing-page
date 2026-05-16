// Filter Constants
export const CATEGORIES = [
  { id: "equity", label: "Equity Algos", value: "Equity Algos" },
  { id: "futures", label: "Futures Algos", value: "Futures Algos" },
  { id: "options", label: "Options Algos", value: "Options Algos" },
];

export const DIRECTIONS = [
  {
    id: "all",
    label: "All",
    value: "all",
    icon: "all",
    color: "",
  },
  {
    id: "neutral",
    label: "Neutral",
    value: "neutral",
    icon: "neutral",
    color: "gray",
  },
  {
    id: "bullish",
    label: "Bullish",
    value: "bullish",
    icon: "bullish",
    color: "green",
  },

  {
    id: "bearish",
    label: "Bearish",
    value: "bearish",
    icon: "bearish",
    color: "red",
  },
];

// Default filter values
export const DEFAULT_FILTERS = {
  category: "Equity Algos",
  // category: "Futures Algos",
  direction: "all",
};

// API Category Mapping (for reference)
export const API_CATEGORY_MAPPING = {
  "Equity Algos": ["Equity Algos"],
  "Futures Algos": ["Futures Selling", "Futures Buying"],
  "Options Algos": ["Option Selling", "Option Buying"],
};
