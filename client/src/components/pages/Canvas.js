import React, { useState, useEffect } from 'react';
import {get, put} from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";
import { useParams } from 'react-router-dom';
import GridItem from "./GridItem";

// canvas object that has dimensions (integer) & color string
// use a GET call on our database to get the dimensions and the string of hexcodes for the pixels of the canvas
// for each hexcode, we add a pixel of said color

const Canvas = () => {
    
  const [canv, setCanv] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { community_name } = useParams();
  let numPixels;

  async function setUser (){
    try {
      await get("/api/whoami").then((user) => setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    document.title = community_name;
    try {
      setUser();
      get(`/api/canvas/${community_name}`).then((response)=>{
        setCanv(response);
      });
    } catch (error) {
      console.log(error)
      // return <p>Canvas not found.</p>;
    }
  }, []);

  useEffect(() => {
    document.title = community_name;
    try {
      get("/api/whoami").then((user) => setCurrentUser(user));
    } catch (error) {
      console.log(error)
    }
  }, [canv]);

  if (typeof canv==='undefined'){
    return <p>Canvas not found.</p>
  } else{
    let dimensions = canv.pixels.length;
    let colors = canv.pixels
    let input_id = `_${canv._id}`

    if (currentUser && canv){
      if (currentUser.placesVisited[input_id]!=null){
        numPixels = currentUser.placesVisited[input_id];
      } else{
        let newPlacesVisited = currentUser.placesVisited;
        newPlacesVisited[input_id] = 5;
        try {
          put(`/api/user`, {googleid: currentUser.googleid, placesVisited: newPlacesVisited}).then(res=>{
            console.log(res);
          })
        } catch (error) {
          console.log(error);
        }
        numPixels = 5;
      }
    } else {
      return <p>Canvas not found.</p>
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
            gridItems.push(<GridItem canvas_id = {canv._id} colors = {colors} key={`${i}-${j}`} i={i} j={j} color={colors[i][j]}/>);
          }
        }
        return gridItems;
    };
  return <div>
      <div style={squareGrid}>{
          generateGrid()}
      </div>
      <p>
        {community_name}
      </p>
      <p>
        Pixels left: {numPixels}
      </p>
  </div>
  }
};

export default Canvas;