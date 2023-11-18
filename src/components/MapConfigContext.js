import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFilter } from './FilterContext';

const MapConfigContext = createContext();

export const MapConfigProvider = ({ children }) => {
  const { enabledFilter } = useFilter()
  
  const [showBusRoutes, setShowBusRoutes] = useState(true);
  const [showBikeRoutes, setShowBikeRoutes] = useState(true);
  const [showChargingStations, setShowChargingStations] = useState(true);

  useEffect(() => {
    switch (enabledFilter?.name) {
      case 'Autobuz':
        setShowBusRoutes(true)
        setShowBikeRoutes(false)
        setShowChargingStations(false)
        break
      case 'Piste biciclete':
        setShowBusRoutes(false)
        setShowBikeRoutes(true)
        setShowChargingStations(false)
        break
      case 'Statii incarcare':
        setShowBusRoutes(false)
        setShowBikeRoutes(false)
        setShowChargingStations(true)
        break
      default:
        setShowBusRoutes(true)
        setShowBikeRoutes(true)
        setShowChargingStations(true)
        break
      }
  }, [enabledFilter])

  return (
    <MapConfigContext.Provider
      value={{
        showBusRoutes,
        setShowBusRoutes,
        showBikeRoutes,
        setShowBikeRoutes,
        showChargingStations,
        setShowChargingStations,
      }}
    >
      {children}
    </MapConfigContext.Provider>
  );
};

export const useMapConfig = () => {
  const context = useContext(MapConfigContext);
  if (!context) {
    throw new Error('useMapConfig must be used within a MapConfigProvider');
  }
  return context;
};