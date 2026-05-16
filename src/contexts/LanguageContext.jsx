// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null); // null, 'english', or 'hindi'

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const clearLanguage = () => {
    setSelectedLanguage(null);
  };

  const value = {
    selectedLanguage,
    selectLanguage,
    clearLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export default LanguageContext;
