import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
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
        setLogEntries(logEntries);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <div key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <svg
              className="marker-blue"
              style={{
                height: '24px',
                width: '24px',
              }}
              version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
              <g>
                <g>
                  <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                </g>
              </g>
            </svg>
          </Marker>
          {
            showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h4>{entry.title}</h4>
                  <p>{entry.comments}</p>
                  <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                </div>
              </Popup>
            ) : null
          }
        </div>
      ))}
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <svg
                className="marker-red"
                style={{
                  height: '24px',
                  width: '24px',
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <h3>Add your new log entry here!</h3>
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
};

export default App;
