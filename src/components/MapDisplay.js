import React from 'react'
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import '/Users/sabin/Code/ecomap/src/styles/leaflet.css'

function MapDisplay({ data }) {
  const getStyle = (feature) => {
    const isBusRoute = feature.properties.route === 'bus'
    const isBikeRoute = feature.properties.highway === 'cycleway' || feature.properties.cycleway === 'shared_lane' || feature.properties.cycleway === 'lane' || feature.properties['cycleway:right'] || feature.properties['cycleway:left'] || feature.properties.bicycle === 'designated'

    const color = isBusRoute ? '#deb63e' : isBikeRoute ? '#a327e3' : 'blue'

    return {
      color,
      weight: 2
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
      <GeoJSON data={data} style={getStyle} />
    </MapContainer>
  )
}

export default MapDisplay