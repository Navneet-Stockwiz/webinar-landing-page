import { useMemo } from 'react';
import { CATEGORIES, DIRECTIONS, API_CATEGORY_MAPPING } from '../constants/filterConstants';
import { useSearch } from '../contexts/SearchContext';

export const useFilters = () => {
  const { activeTab, activeToggle, debouncedSearchQuery } = useSearch();

  // Get current category object
  const currentCategory = useMemo(() => 
    CATEGORIES.find(cat => cat.value === activeTab), 
    [activeTab]
  );

  // Get current direction object
  const currentDirection = useMemo(() => 
    DIRECTIONS.find(dir => dir.value === activeToggle), 
    [activeToggle]
  );

  // Get API category mapping
  const apiCategories = useMemo(() => 
    API_CATEGORY_MAPPING[activeTab] || [activeTab], 
    [activeTab]
  );

  // Check if filters are at default values
  const isDefaultState = useMemo(() => 
    activeTab === 'Equity Algos' && 
    activeToggle === 'Bullish' && 
    !debouncedSearchQuery,
    [activeTab, activeToggle, debouncedSearchQuery]
  );

  // Build API parameters
  const apiParams = useMemo(() => {
    const params = new URLSearchParams();
    
    if (activeTab) {
      params.append('category', activeTab);
    }
    
    if (activeToggle) {
      params.append('direction', activeToggle);
    }
    
    if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
      params.append('search_query', debouncedSearchQuery.trim());
    }
    
    return params;
  }, [activeTab, activeToggle, debouncedSearchQuery]);

  return {
    currentCategory,
    currentDirection,
    apiCategories,
    isDefaultState,
    apiParams,
    filters: {
      category: activeTab,
      direction: activeToggle,
      search: debouncedSearchQuery
    }
  };
};
