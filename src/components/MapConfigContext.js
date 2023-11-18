import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFilter } from './FilterContext';

const MapConfigContext = createContext();

export const MapConfigProvider = ({ children }) => {
  const { enabledFilter } = useFilter()
  
  const [showBusRoutes, setShowBusRoutes] = useState(true);
  const [showBikeRoutes, setShowBikeRoutes] = useState(true);
  const [showChargingStations, setShowChargingStations] = useState(true);
  const [showNoisePollution, setShowNoisePollution] = useState(true);

  useEffect(() => {
    switch (enabledFilter?.name) {
      case 'Autobuz':
        setShowBusRoutes(true)
        setShowBikeRoutes(false)
        setShowChargingStations(false)
        setShowNoisePollution(false)
        break
      case 'Piste biciclete':
        setShowBusRoutes(false)
        setShowBikeRoutes(true)
        setShowChargingStations(false)
        setShowNoisePollution(false)
        break
      case 'Statii incarcare':
        setShowBusRoutes(false)
        setShowBikeRoutes(false)
        setShowChargingStations(true)
        setShowNoisePollution(false)
        break
      case 'Poluare fonica':
        setShowBusRoutes(false)
        setShowBikeRoutes(false)
        setShowChargingStations(false)
        setShowNoisePollution(true)
      default:
        setShowBusRoutes(true)
        setShowBikeRoutes(true)
        setShowChargingStations(true)
        setShowNoisePollution(true)
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