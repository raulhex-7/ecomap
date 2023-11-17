import React, { useState, useEffect } from 'react'
import MapDisplay from './MapDisplay'
import Logo from './Logo'
import Filters from './Filters'
import InfoContainer from './InfoContainer'

function App() {
  const [mapData, setMapData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const urls = [
          'http://localhost:5000/bicycle.geojson',
          'http://localhost:5000/bus-routes.geojson',
          'http://localhost:5000/charging-stations.geojson'
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)))

        const errors = responses.filter(response => !response.ok)
        if (errors.length > 0) {
          throw new Error('Errors: ', errors.map(response => response.status))
        }

        const dataPromises = responses.map(response => response.json())
        const dataArray = await Promise.all(dataPromises)
        
        const combinedFeatures = dataArray.flatMap(data => data.features)
        setMapData(combinedFeatures)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Logo />
        {mapData && <MapDisplay data={mapData} />}
      <Filters />
      <InfoContainer />
    </>
  )
}

export default App
