import React, { useEffect, useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import { MapContainer, GeoJSON, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { useFilter } from './FilterContext'
import L from 'leaflet'
import '../styles/leaflet.css'

function MapDisplay({ data }) {
  const { enabledFilter } = useFilter()

  // const noisePollutionCoords = [[45.798725, 24.157422], [45.792702, 24.145884], [45.792509, 24.135366], [45.793337, 24.115724], [45.785554, 24.132103]]

  const noisePollutionCoords = [[45.798725, 24.157422], [45.792702, 24.145884], [45.792509, 24.135366], [45.793337, 24.115724], [45.785554, 24.132103], [45.802344, 24.145622], [45.800158, 24.139801], [45.792243, 24.139884], [45.793836, 24.139831], [45.791832, 24.144929], [45.793836, 24.147961], [45.795069, 24.145626], [45.789526, 24.140869], [45.788851, 24.143230], [45.788190, 24.153051], [45.785752, 24.148990], [45.780313, 24.152987], [45.778411, 24.159078], [45.774730, 24.151216], [45.775332, 24.146477], [45.771692, 24.143601], [45.776411, 24.141182]]
  
  const busIcon = new L.Icon({
    iconUrl: require('../server/static/bus-station.png'),
    iconSize: [20, 20],
    iconAnchor: [8, 8],
    popupAnchor: [0, -32],
    opacity: 0
  })
  
  const chargingStationIcon = new L.Icon({
    iconUrl: require('../server/static/charging-station.png'),
    iconSize: [18, 25],
    iconAnchor: [8, 8],
    popupAnchor: [0, 0]
  })
  
  const noisePollutionIcon = new L.Icon({
    iconUrl: require('../server/static/noise-pollution.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -32],
    opacity: 0  
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
    if (!Array.isArray(relations)) {
      return ''
    }
  
    let routeNumbers = ''
    relations.forEach((relation) => {
      routeNumbers += `${relation.reltags.ref}, `
    })
  
    return routeNumbers.slice(0, -2)
  }

  const handleEachFeature = (feature, layer) => {
    if (feature.properties.amenity === 'charging_station') {
      layer.setIcon(chargingStationIcon)
      if (enabledFilter?.name !== 'Statii incarcare') {
        layer.setOpacity(0)
      }
      if (!enabledFilter?.name) {
        layer.bindPopup(feature.properties.name || feature.properties.description)
        layer.setOpacity(1)
      } else if (enabledFilter?.name === 'Statii incarcare') {
        layer.bindPopup(feature.properties.name || feature.properties.description)
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

      const BusPopup = ({ relations }) => {
        const routeNumbers = getRouteNumbersPopup(relations)
        const routeNumberArray = routeNumbers.split(', ')
      
        return (
          <div>
            <span>Trasee: </span>
            {routeNumberArray.map((routeNumber, index) => (
              <div key={index}>
                <a href={`https://tursib.ro/traseu/${routeNumber}`} target='blank'>{routeNumber}</a>
              </div>
            ))}
          </div>
        )
      }
      
      if (isPlatform) {
        layer.setIcon(busIcon)
        if (enabledFilter?.name !== 'Autobuz') {
          layer.setOpacity(0)
        }
        if (!enabledFilter?.name) {
          const popupContainer = L.DomUtil.create('div');
          const root = createRoot(popupContainer);
          root.render(<BusPopup relations={feature.properties['@relations']} />);

          layer.bindPopup(popupContainer)
          layer.setOpacity(1)
        } else if (enabledFilter?.name === 'Autobuz') {
          const popupContainer = L.DomUtil.create('div');
          const root = createRoot(popupContainer);
          root.render(<BusPopup relations={feature.properties['@relations']} />);
          
          layer.bindPopup(popupContainer)
          layer.setOpacity(1)
        }
      } else if (isStop) {
        layer.setOpacity(0)
      }
    }
  }

  const [noisePollutionOpacity, setNoisePollutionOpacity] = useState(1);

  useEffect(() => {
    const updateNoisePollutionOpacity = () => {
      setNoisePollutionOpacity((prevOpacity) => {
        if (enabledFilter?.name !== 'Poluare fonica' && enabledFilter?.name) {
          return 0;
        }
        if (!enabledFilter?.name) {
          return 1;
        } else if (enabledFilter?.name === 'Poluare fonica') {
          return 1;
        }
        return prevOpacity;
      });
    };

    updateNoisePollutionOpacity();
  }, [enabledFilter?.name]);
  
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
      {noisePollutionCoords.map((coordSet, index) => (
        <Marker key={index} position={{ lat: coordSet[0], lng: coordSet[1] }} icon={noisePollutionIcon} opacity={noisePollutionOpacity}>
          <Circle key={enabledFilter?.name} center={{ lat: coordSet[0], lng: coordSet[1] }} radius={200} weight={0} fillColor='red' fillOpacity={enabledFilter?.name !== 'Poluare fonica' && enabledFilter?.name ? 0 : 0.5} />
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapDisplay