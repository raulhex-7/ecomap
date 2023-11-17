import React, { useContext, useState } from 'react';
import FilterButton from './FilterButton';
import FilterContext from './FilterContext';

function Filters() {
  const { filters, handleFilterClick, enabledFilter } = useContext(FilterContext);

  // const [tmpFilters, setTmpFilters] = useState([
  //   { name: 'Autobuz', icon: '🚌', enabled: false },
  //   { name: 'Piste biciclete', icon: '🚲', enabled: false },
  //   { name: 'Statii incarcare', icon: '🔌', enabled: false },
  // ]);

  // const tmpEnabledFilter = tmpFilters.find((filter) => filter.enabled)

  // const handleFilterClick = (index) => {
  //   setTmpFilters((prevFilters) =>
  //     prevFilters.map((filter, i) => ({
  //       ...filter,
  //       enabled: i === index ? !filter.enabled : false,
  //       // enabled: true
  //     }))
  //   );
  //   console.log(tmpFilters)
  // };

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