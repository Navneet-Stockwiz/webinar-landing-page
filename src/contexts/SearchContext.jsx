import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_FILTERS } from '../constants/filterConstants';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
  // Filter states using constants
  const [activeTab, setActiveTab] = useState(DEFAULT_FILTERS.category);
  const [activeToggle, setActiveToggle] = useState(DEFAULT_FILTERS.direction);

  // Selected Instrument
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setActiveTab(DEFAULT_FILTERS.category);
    setActiveToggle(DEFAULT_FILTERS.direction);
    setSearchQuery('');
    setSelectedInstrument(null);
  };

  // Reset only selected instrument
  const resetSelectedInstrument = () => {
    setSelectedInstrument(null);
  };

  // Check if filters are in default state
  const isDefaultState = 
    activeTab === DEFAULT_FILTERS.category && 
    activeToggle === DEFAULT_FILTERS.direction && 
    !debouncedSearchQuery &&
    !selectedInstrument;

  return (
    <SearchContext.Provider
      value={{
        // Search
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        
        // Filters
        activeTab,
        setActiveTab,
        activeToggle,
        setActiveToggle,
        
        // Selected Instrument
        selectedInstrument,
        setSelectedInstrument,
        
        // Reset functions
        resetFilters,
        resetSelectedInstrument,
        
        // Helper
        isDefaultState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
