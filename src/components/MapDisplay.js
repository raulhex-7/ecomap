import React, { useEffect, useContext } from 'react'
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from 'react-leaflet'
import { useFilter } from './FilterContext'
import { useMapConfig } from './MapConfigContext'
import L from 'leaflet'
import 'C:/vs/hackaton/ecomap/src/styles/leaflet.css'

function MapDisplay({ data }) {
  const { showBusRoutes, showBikeRoutes, showChargingStations } = useMapConfig()
  const { enabledFilter } = useFilter()
  const busIcon = new L.Icon({
    iconUrl: require('C:/vs/hackaton/ecomap/src/server/static/bus-station.png'),
    iconSize: [20, 20],
    iconAnchor: [8, 8],
    popupAnchor: [0, -32],
    opacity: 0
  })

  const chargingStationIcon = new L.Icon({
    iconUrl: require('C:/vs/hackaton/ecomap/src/server/static/charging-station.png'),
    iconSize: [28, 28],
    iconAnchor: [8, 8],
    popupAnchor: [0, -32]
  })
  
  const getStyle = (feature) => {
    const isBusRoute = feature.properties.route === 'bus'
    const isBikeRoute = feature.properties.highway === 'cycleway' || feature.properties.cycleway === 'shared_lane' || feature.properties.cycleway === 'lane' || feature.properties['cycleway:right'] || feature.properties['cycleway:left'] || feature.properties.bicycle === 'designated'
    
    let color = 'blue'
    let busRouteOpacity = 1
    let bikeRouteOpacity = 1

    if (isBusRoute) {
      color = '#005c3c'
      if (enabledFilter?.name !== 'Autobuz') {
        busRouteOpacity = 0
      }
    }
    else if (isBikeRoute) {
      color = '#a327e3'
      if (enabledFilter?.name !== 'Piste biciclete') {
        bikeRouteOpacity = 0
      }
    }

    if (enabledFilter?.name === undefined) {
      busRouteOpacity = 1
      bikeRouteOpacity = 1
    }

    return {
      color,
      weight: 2,
      opacity: isBusRoute ? busRouteOpacity : bikeRouteOpacity
    }
  }

  const getRouteNumbersPopup = (relations) => {
    let routeNumbers = []
    relations.forEach((relation) => {
      routeNumbers += `${relation.reltags.ref}, `
    })
    return routeNumbers.slice(0, -2)
  }

  const handleEachFeature = (feature, layer) => {
    // console.log(enabledFilter?.name)

    if (feature.properties.amenity === 'charging_station') {
      layer.bindPopup('Statie de incarcare electrica')
      layer.setIcon(chargingStationIcon)
      if (enabledFilter?.name !== 'Statii incarcare') {
        layer.setOpacity(0)
      }
      if (!enabledFilter?.name) {
        layer.setOpacity(1)
      }
    } else {
      let isPlatform = false
      let isStop = false
  
      feature.properties['@relations']?.forEach((relation) => {
        if (
          relation.role === 'platform' ||
          relation.role === 'platform_entry_only' ||
          relation.role === 'platform_exit_only'
        ) {
          isPlatform = true
        }
        if (
          relation.role === 'stop' ||
          relation.role === 'stop_entry_only' ||
          relation.role === 'stop_exit_only'
        ) {
          isStop = true
        }
      })
      
      if (isPlatform) {
        layer.bindPopup(`Trasee: ${getRouteNumbersPopup(feature.properties['@relations'])}`)
        layer.setIcon(busIcon)
        if (enabledFilter?.name !== 'Autobuz') {
          layer.setOpacity(0)
        }
        if (!enabledFilter?.name) {
          layer.setOpacity(1)
        }
      } else if (isStop) {
        layer.setOpacity(0)
      }
    }
  }

  return (
    <MapContainer
      center={[45.78, 24.152]}
      zoom={13}
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#ddd'
      }}
    >
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={data} style={getStyle} onEachFeature={handleEachFeature} key={enabledFilter?.name} />
    </MapContainer>
  )
}

export default MapDisplay