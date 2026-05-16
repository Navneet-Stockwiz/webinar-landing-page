// contexts/SlippageContext.js
import React, { createContext, useContext, useState } from 'react';

const SlippageContext = createContext();

export const SlippageProvider = ({ children }) => {
  // Slippage configuration
  const [slippageType, setSlippageType] = useState('number'); // 'number' or 'percentage'
  const [slippageValue, setSlippageValue] = useState(0);
  const [isApplied, setIsApplied] = useState(false);
  const [lastAppliedAt, setLastAppliedAt] = useState(null); // Timestamp for triggering re-fetches

  // Apply slippage - called when Go button is clicked
  const applySlippage = (type, value) => {
    const apiType = type === "₹" ? "number" : "percentage";
    const numValue = parseFloat(value) || 0;
    
    setSlippageType(apiType);
    setSlippageValue(numValue);
    setIsApplied(true);
    setLastAppliedAt(Date.now());
  };

  // Reset slippage
  const resetSlippage = () => {
    setSlippageType('number');
    setSlippageValue(0);
    setIsApplied(false);
    setLastAppliedAt(null);
  };

  return (
    <SlippageContext.Provider
      value={{
        slippageType,
        slippageValue,
        isApplied,
        lastAppliedAt,
        applySlippage,
        resetSlippage,
      }}
    >
      {children}
    </SlippageContext.Provider>
  );
};

export const useSlippage = () => {
  const context = useContext(SlippageContext);
  if (!context) {
    throw new Error('useSlippage must be used within a SlippageProvider');
  }
  return context;
};
