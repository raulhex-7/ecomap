import React from 'react'
import FilterButton from './FilterButton.js'

function Filters() {
  let filters = ['Autobuz', 'Piste biciclete']

  return (
    <div className='filters_container'>
      {filters.map((filter) => {
        <FilterButton name={filter} />
      })}
    </div>
  )
}

export default Filters