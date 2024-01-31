import React, { useState, useEffect } from 'react';
import {get, put} from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";
import { useParams } from 'react-router-dom';
import GridItem from "./GridItem";
import {getDistance} from 'geolib';

// canvas object that has dimensions (integer) & color string
// use a GET call on our database to get the dimensions and the string of hexcodes for the pixels of the canvas
// for each hexcode, we add a pixel of said color

const Canvas = () => {
  const [location, setLocation] = useState();
  const [canv, setCanv] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [canEdit, setCanEdit] = useState(false);
  const { community_name } = useParams();

  let numPixels;
 
  let difference = undefined;


  function reloadWindowEveryFiveSeconds() {
    setInterval(
        window.location.reload()
    , 5000);
  }


  useEffect(() => {
    try {
      async function setUser (){ 
        try {
          await get("/api/whoami").then((user) => {
            setCurrentUser(user)
          });
        } catch (error) {
          console.log(error);
        }
      }
      
      setUser(); // gets user

      get(`/api/canvas/${community_name}`).then((response)=>{ // gets canvas
        setCanv(response);
      });

      navigator.geolocation.getCurrentPosition( //gets location
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.log(error)
          setLocation(undefined);
      });  


    } catch (error) {
      console.log(error)
      setCanv(null)
    }
  }, [community_name]);

  useEffect(() => {
    try {
      if (location){
        let canvas_position = {latitude:canv.location.coordinates[0], longitude:canv.location.coordinates[1]} // sets editing privileges
        difference = getDistance(location, canvas_position)<50
        if (getDistance(location, canvas_position)<50){
          setCanEdit(true);
        }
      }
    } catch (error) {
      setCanEdit(false);
    }
  }, [location, canv]);

  if (!canv || canv.response){
    return <p>Canvas not found.</p>
  } else {
    let dimensions = canv.pixels.length;
    let colors = canv.pixels
    let input_id = `_${canv._id}`

    if (currentUser && canv){ // sets as a visited place if the user can edit and has not visited this location already. code can be further modified in the future to add pixel limits
      if (currentUser.placesVisited[input_id]!=null){
        numPixels = currentUser.placesVisited[input_id];
      } else{
        if (canEdit){
          let newPlacesVisited = currentUser.placesVisited;
          newPlacesVisited[input_id] = 1;
          try {
            put(`/api/user`, {googleid: currentUser.googleid, placesVisited: newPlacesVisited}).then(res=>{
              console.log(res);
            })
          } catch (error) {
            console.log(error);
          }
          numPixels = 1;
        }
      }
    } else {
      reloadWindowEveryFiveSeconds();
    }
    const squareGrid = {
        display: 'grid',
        gridTemplateColumns: `repeat(${dimensions}, 30px)`,
        gridTemplateRows: `repeat(${dimensions}, 30px)`,
        gridGap: 0
      };
    const generateGrid = () => {
    const gridItems = [];
        for (var i = 0; i < dimensions; i++) {
          for (var j = 0; j < dimensions; j++) {
            gridItems.push(<GridItem privileges = {canEdit} canvas_id = {canv._id} colors = {colors} key={`${i}-${j}`} i={i} j={j} color={colors[i][j]}/>);
          }
        }
        return gridItems;
    };
    return <div className='centered-grid'>
              <div className='buffer'>
              <p>
                {community_name}'s Canvas
              </p>
              <div style={squareGrid}>{
                  generateGrid()}
              </div>
              {canEdit ? (
                <p>You are able to edit this canvas</p>
              ):(
                <p>You are unable to edit this canvas</p>
              )}
            </div>
        </div>
    } 
};

export default Canvas;