import { useState, useEffect } from "react";

const DISCLAIMER_STORAGE_KEY = "strykex_disclaimer_shown";

export const useDisclaimerPopup = () => {
  const [shouldShowDisclaimer, setShouldShowDisclaimer] = useState(false);

  // Check if disclaimer has been shown before
  const hasSeenDisclaimer = () => {
    try {
      const seen = sessionStorage.getItem(DISCLAIMER_STORAGE_KEY);
      return seen === "true";
    } catch (error) {
      console.error("Error reading from sessionStorage:", error);
      return false;
    }
  };

  // Mark disclaimer as seen
  const markDisclaimerAsSeen = () => {
    try {
      sessionStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
      setShouldShowDisclaimer(false);
    } catch (error) {
      console.error("Error writing to sessionStorage:", error);
    }
  };

  // Reset disclaimer (useful for testing or admin purposes)
  const resetDisclaimer = () => {
    try {
      sessionStorage.removeItem(DISCLAIMER_STORAGE_KEY);
      setShouldShowDisclaimer(false);
    } catch (error) {
      console.error("Error removing from sessionStorage:", error);
    }
  };

  // Check if we should show disclaimer
  const checkShouldShowDisclaimer = () => { 
    return !hasSeenDisclaimer();
  };

  return {
    shouldShowDisclaimer,
    setShouldShowDisclaimer,
    hasSeenDisclaimer,
    markDisclaimerAsSeen,
    resetDisclaimer,
    checkShouldShowDisclaimer,
  };
};
