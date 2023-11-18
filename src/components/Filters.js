import React, { useContext, useState } from 'react';
import FilterButton from './FilterButton';
import FilterContext from './FilterContext';

function Filters() {
  const { filters, handleFilterClick, enabledFilter } = useContext(FilterContext);

  const displayFilters = filters.map((filter, index) => (
    <FilterButton
      key={filter.name}
      name={filter.name}
      icon={filter.icon}
      enabled={filter.enabled}
      onClick={() => handleFilterClick(index)}
    />
  ));

  return <div className='filters_container'>{displayFilters}</div>;
}

export default Filters;