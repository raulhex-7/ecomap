import { createContext, useContext, useEffect, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState([
    { name: 'Autobuz', icon: '🚌', enabled: false },
    { name: 'Piste biciclete', icon: '🚲', enabled: false },
    { name: 'Statii incarcare', icon: '🔌', enabled: false },
  ]);

  const handleFilterClick = (index) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter, i) => ({
        ...filter,
        enabled: i === index ? !filter.enabled : false,
      }))
    );
  };

  const enabledFilter = filters.find((filter) => filter.enabled)
  useEffect(() => {
    localStorage.setItem("enabledFilter", enabledFilter?.name)
  }, [enabledFilter])

  return (
    <FilterContext.Provider value={{ filters, handleFilterClick, enabledFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
export default FilterContext