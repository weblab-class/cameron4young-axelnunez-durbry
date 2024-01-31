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
      console.log(response.response)
      if (response.response == undefined) {
        setAlreadyExisting(true);
        console.log("UM")
      } else {
        console.log("HELLO")
        createCanvas(communityName, [currentLocation.latitude, currentLocation.longitude], 1);
        window.location.href = `/canvas/${communityName}`;
      }
    } catch (error) {
      setAlreadyExisting(true);
    }
  }
  

  return (
      <div>
        { currentLocation ? (
          <div className='creation-container'>
            <div className='inner-container'>
              <p>create a new place!</p>
              <p className='note'>note: place marker will be placed at your current location.</p>
              <div >
                <input className="formInput" type="text" value={communityName} onChange={handleName}></input>
              </div>
              <button className="submit-button" onClick={submit}>Submit</button>
              {alreadyExisting && <p>A place with this name already exists. Please try a new name.</p>}
            </div>
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
