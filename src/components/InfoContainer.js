import React, { useEffect, useState } from 'react'
import InfoSquare from './InfoSquare'
import { useFilter } from './FilterContext'
import { useMapConfig } from './MapConfigContext'

function InfoContainer() {
  const [closed, setClosed] = useState(false)

  const handleClick = () => {
    setClosed(!closed)
  }

  const classes = `info_container ${closed ? 'closed_info_container' : 'open_info_container'}`
  const [title, setTitle] = useState('Sibiu')
  const { showBusRoutes, showBikeRoutes, showChargingStations, showNoisePollution } = useMapConfig()
  const { enabledFilter } = useFilter()
  
  useEffect(() => {
    const changeTitle = (() => {
      if (showBusRoutes && showBikeRoutes && showChargingStations && showNoisePollution) {
        setTitle('Sibiu')
      } else if (showBusRoutes) {
        setTitle('Autobuz')
      } else if (showBikeRoutes) {
        setTitle('Piste biciclete')
      } else if (showChargingStations) {
        setTitle('Statii incarcare')
      } else if (showNoisePollution) {
        setTitle('Poluare fonica')
      }
    })

    changeTitle()
  }, [showBusRoutes, showBikeRoutes, showChargingStations, showNoisePollution])

  return (
    <div className={classes}>
      <h2>{title}</h2>
      <button className="close_button" onClick={handleClick}>{closed ? '>' : '<'}</button>
      <InfoSquare key={enabledFilter} info='Sibiu este un oraș molcom, cu influențe germane, situat în mijlocul României, în regiunea Transivania. Acesta este caracterizat, din punct de vedere ecologic, de politicile axate pe design urban și pe transport verde. Astfel de inițiative sunt resimțite de către cetățeni prin introducerea trotinetelor electrice, a autobuzelor verzi, construcția pistelor de biciclete, introducerea sistemului extensiv de reciclare și introducerea stațiilor de biciclete. Totuși, sunt multe aspecte care rămân încă neadreste de instituții publice și de actori din mediul privat, precum poluarea fonică și o calitate din ce în ce mai scăzută a aerului. Geografia orașului și, în special, dealul pe care este situat Centrul, pot prezenta diferite probleme ce pot duce la neajunsuri când vine vorba de construcția de infrastructură prietenă cu mediul.' img='/sibiu.png' />
    </div>
  )
}

export default InfoContainer