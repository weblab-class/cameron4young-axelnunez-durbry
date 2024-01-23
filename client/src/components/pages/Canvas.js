import React from "react";

import "../../utilities.css";
import "./Skeleton.css";
import { useParams } from 'react-router-dom';
import GridItem from "./GridItem";

// canvas object that has dimensions (integer) & color string
// use a GET call on our database to get the dimensions and the string of hexcodes for the pixels of the canvas
// for each hexcode, we add a pixel of said color

const Canvas = () => {
    
    // make an API call to get dimensions and string

    const dimensions = 3
    const colors = [['#000000', '#FFFFFF', '#000000'],['#000000', '#FFFFFF', '#000000'],['#000000', '#FFFFFF', '#000000']]

    const { community_name } = useParams();

    const squareGrid = {
        display: 'grid',
        gridTemplateColumns: `repeat(${dimensions}, 10vw)`,
        gridTemplateRows: `repeat(${dimensions}, 10vw)`,
      };

    const generateGrid = () => {
        const gridItems = [];
        for (var i = 0; i < dimensions; i++) {
          for (var j = 0; j < dimensions; j++) {
            gridItems.push(<GridItem key={`${i}-${j}`} i={i} j={j} color={colors[i][j]}/>);
          }
        }
        return gridItems;
    };
    return <div>
        <div style={squareGrid}>{
            generateGrid()}
            <p>
                {community_name}
            </p>
        </div>
    </div>
};

export default Canvas;