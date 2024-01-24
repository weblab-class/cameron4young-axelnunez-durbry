import React, { useState, useEffect } from 'react';
import "../../utilities.css";
import "./Skeleton.css";
import {put} from "../../utilities";


const GridItem = ({community_name, colors, i, j, color }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newColor, setNewColor] = useState(color);

  const handleDivClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewColor(color);
  };

  const handlePalette = (event) => {
    setNewColor(event.target.value);
  };

  const submit = () => {
    // subtract a pixel from the user's count
    colors[i][j] = newColor
    put(`/api/canvas`, {name: community_name, pixels: colors}).then(res=>{
      console.log(res);
    })
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div
        key={`${i}-${j}`}
        className="grid-item"
        style={{ backgroundColor: newColor }}
        onClick={handleDivClick}
      ></div>
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-container">
            <div className="dialog">
              <p>Choose a new color for Pixel ({i}, {j}).</p>
              <input type="color" value={newColor} onChange={handlePalette}></input>
              <button onClick={submit}>Submit</button>
              <button onClick={handleDialogClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridItem;