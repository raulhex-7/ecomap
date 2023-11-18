import React from 'react'
import InfoSquare from './InfoSquare'

function InfoContainer() {
  return (
    <container className='info_container'>
      <h2>Sibiu</h2>
      <button class="close_button">x</button>
      <InfoSquare info='Sibiu este un oraș molcom, cu influențe germane, situat în mijlocul României, în regiunea Transivania. Acesta este caracterizat, din punct de vedere ecologic, de politicile axate pe design urban și pe transport verde. Astfel de inițiative sunt resimțite de către cetățeni prin introducerea trotinetelor electrice, a autobuzelor verzi, construcția pistelor de biciclete, introducerea sistemului extensiv de reciclare și introducerea stațiilor de biciclete. Totuși, sunt multe aspecte care rămân încă neadreste de instituții publice și de actori din mediul privat, precum poluarea fonică și o calitate din ce în ce mai scăzută a aerului. Geografia orașului și, în special, dealul pe care este situat Centrul, pot prezenta diferite probleme ce pot duce la neajunsuri când vine vorba de construcția de infrastructură prietenă cu mediul.' img='/sibiu.png' />
    </container>
  )
}

export default InfoContainer