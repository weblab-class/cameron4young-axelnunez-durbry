import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from 'react';
import { useMemo } from "react";
import { mapStyles } from "./styles";
import {get} from "../../utilities";
import { Link } from "react-router-dom";
import "./Map.css";

const Map = (location) => {
  
  const [currentLocation, setCurrentLocation] = useState(location);
  const [canvasList, setCanvasList] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCfY5EawenKkPeMYvQDFBwHKSd5EkiDnZ0",
  });

  const options = {
    styles: mapStyles,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false
  };

  async function setCanvases(){
    let canvList = [];
    try {
      let reactObjList = [];
      await get(`/api/all/canvas`).then((response)=>{
          reactObjList = response;
      });
      for (const object of reactObjList){
          canvList.push(object);
      }
    } catch (error) {
        console.log(error)
    }
    return canvList;
  }

  var center = useMemo(() => {
    if (!currentLocation || isNaN(Number(currentLocation.latitude)) || isNaN(Number(currentLocation.longitude))) {
      return { lat: 42.350155, lng: -71.09515289315415 }; // centers around MIT
    } else {
      return { lat: Number(currentLocation.latitude), lng: Number(currentLocation.longitude) };
    }
  }, [currentLocation]);

  function placeCanvasMarkers(canvases){
    // make a list of Markers with every canvas' location 
    let markers = [];
    for (let i = 0; i < canvases.length; i++) {
        let coords = canvases[i].location.coordinates
        if (coords.length!=0){
          markers.push(
            <Marker
              key={i}
              position={{lat: coords[0], lng: coords[1]}}
              onClick={(props, marker) => {
                setSelectedElement(canvases[i]);
                setActiveMarker({lat: coords[0], lng: coords[1]});
              }}>
            </Marker>
              );
        }
        
    }
    return markers;
  }

  useEffect(() => {
    try {
      setCurrentLocation(location.location)
      setCanvases().then((list)=>{
        setCanvasList(list);
      });
    } catch (error) {
      setCurrentLocation(undefined)
    }
  }, []);
  
  return (
    <div className="Map">
      {(!isLoaded) ? (
        <h1>Loading map...</h1>
      ) : (currentLocation && !isNaN(center.lat)) ? (
            <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          options={options}
          zoom={18}
        >
          <Marker
            icon = {{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 11,
              strokeWeight:0,
              fillOpacity:1,
              fillColor:"#4F89CA",
            }
            }
            position={center}
            zIndex={-1}
          />
            {placeCanvasMarkers(canvasList)}
            <Marker
            icon = {{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 15,
              strokeWeight:3,
              strokeColor:'#4F89CA ',
            }
            }
            position={center}
            zIndex={-1}
          />
          {selectedElement ? (
            <InfoWindow
              position={activeMarker}
              onCloseClick={() => {
                setSelectedElement(null);
              }}
            >
              <div>
                <Link to={`/canvas/${selectedElement.name}`}>
                  <h1>Click here to visit {selectedElement.name}!</h1>
                </Link>
              </div>
            </InfoWindow>
          ) : null}
          </GoogleMap>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          options={options}
          zoom={18}
        >
          {placeCanvasMarkers(canvasList)}
          {selectedElement ? (
            <InfoWindow
              position={activeMarker}
              onCloseClick={() => {
                setSelectedElement(null);
              }}
            >
              <div>
                <Link to={`/canvas/${selectedElement.name}`}>
                  <h1>Click here to visit {selectedElement.name}!</h1>
                </Link>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;