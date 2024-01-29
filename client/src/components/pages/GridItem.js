import React, { useState, useEffect } from 'react';
import "../../utilities.css";
import "./Skeleton.css";
import {get, put} from "../../utilities";
import { parse } from 'ipaddr.js';


const GridItem = ({canvas_id, colors, i, j, color }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newColor, setNewColor] = useState(color);
  const [currentUser, setCurrentUser] = useState();

  async function setUser (){
    try {
      await get("/api/whoami").then((user) => setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      setUser()
      console.log(currentUser);
    } catch (error) {
      console.log(error)
      // return <p>Canvas not found.</p>;
    }
  }, []);

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
  async function submit() {
    // subtract a pixel from the user's count
    setUser();
    let input_id = `_${canvas_id}`
    let newVisited = currentUser.placesVisited;
    newVisited[input_id]--;
    put(`/api/user`, {googleid: currentUser.googleid, placesVisited: newVisited}).then(res=>{
      setCurrentUser(res.updatedUser);
      console.log(res);
    })
    // change the pixel
    colors[i][j] = newColor
    put(`/api/canvas`, {_id: canvas_id, pixels: colors}).then(res=>{
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