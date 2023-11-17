import React from 'react'
import FilterButton from './FilterButton.js'

function Filters() {
  let filters = [
    {
      name: 'Autobuz',
      icon: '🚌'
    }, 
    {
      name: 'Piste biciclete',
      icon: '🚲'
    }
  ]

  return (
    <div className='filters_container'>
      {filters.map((filter) => {
        return <FilterButton key={filter} name={filter.name} icon={filter.icon} />
      })} 
    </div>
  )
}

export default Filters