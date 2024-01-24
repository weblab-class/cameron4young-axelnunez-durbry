import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useState } from 'react';
import { useMemo } from "react";
import "./Map.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCfY5EawenKkPeMYvQDFBwHKSd5EkiDnZ0",
  });
  const center = useMemo(() => ({ lat: 42.35967422233206, lng: -71.09515289315415}), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
        />
      )}
    </div>
  );
};

export default App;