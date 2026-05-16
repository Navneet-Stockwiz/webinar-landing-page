import React, { createContext, useContext, useState } from 'react';

// Create Context
const SelectedStrategyContext = createContext(null);

// Context Provider Component
export const SelectedStrategyProvider = ({ children }) => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const clearSelectedStrategy = () => {
    setSelectedStrategy(null);
  };

  return (
    <SelectedStrategyContext.Provider 
      value={{ 
        selectedStrategy, 
        setSelectedStrategy, 
        clearSelectedStrategy 
      }}
    >
      {children}
    </SelectedStrategyContext.Provider>
  );
};

// Custom Hook to use the context
export const useSelectedStrategy = () => {
  const context = useContext(SelectedStrategyContext);
  if (!context) {
    throw new Error('useSelectedStrategy must be used within a SelectedStrategyProvider');
  }
  return context;
};

export default SelectedStrategyContext;
