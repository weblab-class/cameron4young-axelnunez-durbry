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
    
    // make an API call to get dimensions and string
  const [canv, setCanv] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { community_name } = useParams();
  let numPixels;

  async function setUser (){
    try {
      get("/api/whoami").then((user) => setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  }
    
  if (typeof canv==='undefined'){
    useEffect(() => {
      document.title = community_name;
      try {
        get(`/api/canvas/${community_name}`).then((response)=>{
          setCanv(response);
        });
      } catch (error) {
        return <p>Canvas not found.</p>;
      }
      
    }, canv);
    return <></>;


  } else{
    let dimensions = canv.pixels.length;
    let colors = canv.pixels
    let input_id = `_${canv._id}`

    setUser();

    useEffect(() => {
      document.title = community_name;
      get(`/api/canvas/${community_name}`).then((response)=>{
        setCanv(response);
      });
      // if (currentUser===undefined){
      //   console.log("wait")
      // } else{
      //   let newPlacesVisited = currentUser.placesVisited;
      //   newPlacesVisited[`_${canv._id}`]--;
      //   put(`/api/user`, {googleid: currentUser.googleid, placesVisited: newPlacesVisited}).then(res=>{
      //     console.log(res.updatedUser);
      //   })
      // }
    }, currentUser);

    if (currentUser){
      if (currentUser.placesVisited[input_id]!=null){
        numPixels = currentUser.placesVisited[input_id];
      } else{
        let newPlacesVisited = currentUser.placesVisited;
        // console.log(newPlacesVisited);
        newPlacesVisited[input_id] = 5;
        // console.log(newPlacesVisited);
        try {
          put(`/api/user`, {googleid: currentUser.googleid, placesVisited: newPlacesVisited}).then(res=>{
            console.log(res);
          })
        } catch (error) {
          console.log(error);
        }
        numPixels = 5;
      }
    } 
    const squareGrid = {
        display: 'grid',
        gridTemplateColumns: `repeat(${dimensions}, 30px)`,
        gridTemplateRows: `repeat(${dimensions}, 30px)`,
        gridGap: 0
      };
    // let theUser = JSON.stringify(currentUser);
    let theUser = currentUser
    const generateGrid = () => {
    const gridItems = [];
        for (var i = 0; i < dimensions; i++) {
          for (var j = 0; j < dimensions; j++) {
            gridItems.push(<GridItem user = {theUser} canvas_id = {canv._id} colors = {colors} key={`${i}-${j}`} i={i} j={j} color={colors[i][j]}/>);
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