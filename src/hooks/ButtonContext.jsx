import React, { createContext, useContext } from "react";

// Create context
const ButtonContext = createContext();

// Provider
export const ButtonProvider = ({ children }) => {
  const buttonUrl = "https://your-link-or-dynamic-url.com"; // 👈 your global URL

  return (
    <ButtonContext.Provider value={{ buttonUrl }}>
      {children}
    </ButtonContext.Provider>
  );
};

// Hook for easier usage
export const useButton = () => useContext(ButtonContext);
