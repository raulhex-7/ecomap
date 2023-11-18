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
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')
  const [img, setImg] = useState()

  const { showBusRoutes, showBikeRoutes, showChargingStations, showNoisePollution } = useMapConfig()
  const { enabledFilter } = useFilter()
  
  useEffect(() => {
    const changeTitle = (() => {
      if (showBusRoutes && showBikeRoutes && showChargingStations && showNoisePollution) {
        setTitle('Sibiu')
        setInfo('Sibiu este un oraș molcom, cu influențe germane, situat în mijlocul României, în regiunea Transivania. Acesta este caracterizat, din punct de vedere ecologic, de politicile axate pe design urban și pe transport verde. Astfel de inițiative sunt resimțite de către cetățeni prin introducerea trotinetelor electrice, a autobuzelor verzi, construcția pistelor de biciclete, introducerea sistemului extensiv de reciclare și introducerea stațiilor de biciclete. Totuși, sunt multe aspecte care rămân încă neadreste de instituții publice și de actori din mediul privat, precum poluarea fonică și o calitate din ce în ce mai scăzută a aerului. Geografia orașului și, în special, dealul pe care este situat Centrul, pot prezenta diferite probleme ce pot duce la neajunsuri când vine vorba de construcția de infrastructură prietenă cu mediul.')
        setImg('/sibiu.png')
      } else if (showBusRoutes) {
        setTitle('Autobuz')
        setInfo('Sistemul de autobuze din județul Sibiu reprezintă o rețea bine structurată și eficientă, contribuind semnificativ la mobilitatea locală. Cu autobuze moderne și confortabile, acest sistem acoperă o varietate de rute, conectând orașul cu suburbiile și satele din împrejurimi. Autobuzele sunt echipate cu facilități precum Wi-Fi și aer condiționat, asigurând că călătorii beneficiază de un confort sporit. Operatorii de transport public implementează programe regulate și strategii pentru optimizarea traseelor, facilitând accesul facil al locuitorilor la diverse zone ale județului. Prin gestionarea eficientă a acestui sistem, se încurajează utilizarea transportului public și se reduce presiunea asupra infrastructurii rutiere.')
        setImg('/autobuz.png')
      } else if (showBikeRoutes) {
        setTitle('Piste biciclete')
        setInfo('În județul Sibiu, stațiile de biciclete reprezintă o infrastructură vitală pentru promovarea mobilității durabile. Dispersate strategic în oraș și împrejurimi, aceste stații oferă utilizatorilor acces ușor și comod la biciclete pentru a explora zonele locale. Cu un sistem de închiriere eficient, rezidenții și turiștii pot închiria biciclete și să le returneze la oricare dintre stațiile din rețea. Această inițiativă nu doar încurajează un mod sănătos de deplasare, ci și susține eforturile de reducere a emisiilor de carbon și îmbunătățire a calității aerului în județul Sibiu.')
        setImg('/piste-biciclete.png')
      } else if (showChargingStations) {
        setTitle('Statii incarcare')
        setInfo('În județul Sibiu, infrastructura pentru mașini electrice este în plină expansiune, iar stațiile de încărcare devin tot mai accesibile și răspândite. Cu o rețea bine dezvoltată de încărcătoare, proprietarii de mașini electrice beneficiază de posibilitatea de a-și încărca vehiculele în mod convenabil și eficient. Stațiile de încărcare sunt amplasate strategic în zone-cheie, precum centre comerciale, parcuri de afaceri și locații publice, facilitând un proces fluid de încărcare. Această inițiativă reflectă angajamentul județului Sibiu față de mobilitatea durabilă și contribuie la promovarea adoptării vehiculelor electrice în comunitate.')
        setImg('/statii-incarcare.png')
      } else if (showNoisePollution) {
        setTitle('Poluare fonica')
        setInfo('Poluarea fonica în județul Sibiu este o problemă tot mai acută, afectând calitatea vieții locuitorilor și ecosistemul local. Centrul istoric al Sibiului, cu străzile sale înguste și construcțiile vechi, se confruntă cu un trafic intens și zgomot constant, generat de autovehicule și activități comerciale. Zonele rezidențiale sunt, de asemenea, afectate de poluarea sonoră datorată traficului rutier crescut și a construcțiilor în expansiune. Impactul negativ al poluării fonice asupra sănătății și bunăstării locuitorilor devine din ce în ce mai evident, iar eforturile pentru implementarea măsurilor de reducere a acestui fenomen sunt imperios necesare.')
        setImg('/poluare-fonica.png')
      }
    })

    changeTitle()
  }, [showBusRoutes, showBikeRoutes, showChargingStations, showNoisePollution])

  return (
    <div className={classes}>
      <h2>{title}</h2>
      <button className="close_button" onClick={handleClick}>{closed ? '>' : '<'}</button>
      <InfoSquare key={enabledFilter} info={info} img={img} />
    </div>
  )
}

export default InfoContainer