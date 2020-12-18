import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { listLogEntries } from './API';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  useEffect(() => {
    (async () => {
      try {
        const logEntries = await listLogEntries();
        console.log(logEntries);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
};

export default App;
