import React, { useState, useEffect } from 'react';
import {get} from "../../utilities";
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
    get("/api/whoami").then((user) => setCurrentUser(user));
    // if (currentUser){
    //   console.log(currentUser.placesVisited.mhall);
    //   if (currentUser.placesVisited.hasOwnProperty(community_name)){
    //     numPixels = currentUser.placesVisited.community_name;
    //   } else{
    //     numPixels = 0;
    //   }
    // } 
    
    if (canv==null){
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
      useEffect(() => {
        document.title = community_name;
        get(`/api/canvas/${community_name}`).then((response)=>{
          setCanv(response);
        });
      }, canv);

      const dimensions = canv.pixels.length;
      const colors = canv.pixels
  
  
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
              gridItems.push(<GridItem community_name = {community_name} colors = {colors} key={`${i}-${j}`} i={i} j={j} color={colors[i][j]}/>);
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