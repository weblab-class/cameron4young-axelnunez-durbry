import React, { useState } from 'react';
import "../../utilities.css";
import "./Skeleton.css";

const CreateCommunity = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDivClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handlePalette = (event) => {
    console.log("hi");
  };

  const submit = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button onClick={handleDivClick}>
        hello
      </button>
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-container">
            <div className="dialog">
              <p>Create a new community</p>
              <input type="color" value={"#FFFFFF"} onChange={handlePalette}></input>
              <button onClick={submit}>Submit</button>
              <button onClick={handleDialogClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCommunity;