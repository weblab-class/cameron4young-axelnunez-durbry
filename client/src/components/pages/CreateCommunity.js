import React, { useState, useEffect } from 'react';import { get } from "../../utilities";
import createCanvas from "../../createCanvas";
import "../../utilities.css";
import "./Skeleton.css";

const CreateCommunity = (userLocation) => {
  const [communityName, setCommunityName] = useState("");
  const [currentLocation, setCurrentLocation] = useState(location);
  const [alreadyExisting, setAlreadyExisting] = useState(false);

  useEffect(() => {
    try {
      setCurrentLocation(userLocation.userLocation)
    } catch (error) {
      setCurrentLocation(undefined)
    }
  }, []);
  
  const handleName = (event) => {
    setCommunityName(event.target.value);
  };

  async function submit() {
    setAlreadyExisting(false);

    try {
      const response = await get(`/api/canvas/${communityName}`);
      console.log(response)
      if (response != null) {
        setAlreadyExisting(true);
      } else {
        createCanvas(communityName, [currentLocation.latitude, currentLocation.longitude], 1);
      }
    } catch (error) {
      console.log(error)
      setAlreadyExisting(true);
    }
    // console.log(alreadyExisting);
    // if (alreadyExisting) {
    //   console.log("exists");
    // } else {
    //   console.log("I LOVE JAVASCRIPT");
      // window.location.href = `/canvas/${communityName}`;
    }
  

  return (
      <div>
        { currentLocation ? (
          <div>
            <p>create a new place!</p>
            <p>note: place marker will be placed at your current location.</p>
            <input type="text" value={communityName} onChange={handleName}></input>
            <button onClick={submit}>Submit</button>
            {alreadyExisting && <p>A place with this name already exists. Please try a new name.</p>}
          </div>
        ) : (
          <div>
            <p>Location not found... please wait or enable location services to create a place.</p>
          </div>
        )}
        
      </div>
  );
};

export default CreateCommunity;
