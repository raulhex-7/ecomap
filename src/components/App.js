import React, { useState, useEffect } from 'react';
import MapDisplay from './MapDisplay';

function App() {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const urls = [
          'http://localhost:5000/bicycle.geojson',
          'http://localhost:5000/bus-routes.geojson',
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));

        const errorResponses = responses.filter(response => !response.ok);
        if (errorResponses.length > 0) {
          throw new Error(`Error in fetching data: ${errorResponses.map(response => response.status).join(', ')}`);
        }

        // Parse JSON from each response
        const dataPromises = responses.map(response => response.json());

        // Wait for all data to be fetched and parsed
        const dataArray = await Promise.all(dataPromises);

        // Combine features from all datasets
        const combinedFeatures = dataArray.flatMap(data => data.features);

        // Update state with the combined features
        setMapData(combinedFeatures);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {mapData && <MapDisplay data={mapData} />}
    </>
  );
}

export default App;
