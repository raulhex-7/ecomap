import React, { useState } from 'react'
import InfoSquare from './InfoSquare'

function InfoContainer() {
  const [closed, setClosed] = useState(false)

  const handleClick = () => {
    setClosed(!closed)
  }

  const classes = `info_container ${closed ? 'closed_info_container' : 'open_info_container'}`

  return (
    <div className={classes}>
      <h2>Sibiu</h2>
      <button className="close_button" onClick={handleClick}>{closed ? '>' : '<'}</button>
      <InfoSquare info='orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' img='/sibiu.png' />
    </div>
  )
}

export default InfoContainer