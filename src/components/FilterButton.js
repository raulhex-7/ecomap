import React from 'react'

function FilterButton({ name, icon }) {
  return (
    <div className='filter_button'>{icon} {name}</div>
  )
}

export default FilterButton