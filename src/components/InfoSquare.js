import React from 'react'
  

function InfoSquare({ info, img }) {
  return (
    <div className='info_square'>
      <img className='info_image' src={img} alt='imagine' />
      <div className='info_text_container'>
    
      <p className='info_text'>{info}</p>
      </div>
    </div>
  )
}

export default InfoSquare