import React from 'react'
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import '/Users/sabin/Code/ecomap/src/styles/leaflet.css'

function MapDisplay({ data }) {
  const busIcon = new L.Icon({
    iconUrl: require('/Users/sabin/Code/ecomap/src/server/static/bus-station.png'),
    iconSize: [20, 20],
    iconAnchor: [8, 8],
    popupAnchor: [0, -32]
  });
  
  const getStyle = (feature) => {
    const isBusRoute = feature.properties.route === 'bus'
    const isBikeRoute = feature.properties.highway === 'cycleway' || feature.properties.cycleway === 'shared_lane' || feature.properties.cycleway === 'lane' || feature.properties['cycleway:right'] || feature.properties['cycleway:left'] || feature.properties.bicycle === 'designated'
    
    const color = isBusRoute ? '#deb63e' : isBikeRoute ? '#a327e3' : 'blue'

    return {
      color,
      weight: 2
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
    if (feature.properties['@relations']) {
      feature.properties['@relations'].forEach(
        (relation) => {
          if (
            relation.role === 'platform' ||
            relation.role === 'platform_entry_only' ||
            relation.role === 'platform_exit_only'
          ) {
            layer.bindPopup(`Trasee: ${getRouteNumbersPopup(feature.properties['@relations'])}`);
            layer.setIcon(busIcon)
          } else if (relation.role === 'stop' || relation.role === 'stop_entry_only' || relation.role === 'stop_exit_only') {
            layer.setOpacity(0)
          }
        }
      );
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
      <GeoJSON data={data} style={getStyle} onEachFeature={handleEachFeature} />
    </MapContainer>
  )
}

export default MapDisplay