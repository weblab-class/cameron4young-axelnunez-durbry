import React, { useState } from "react";
import { get } from "../../utilities";
import createCanvas from "../../createCanvas";
import "../../utilities.css";
import "./Skeleton.css";

const CreateCommunity = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [communityName, setCommunityName] = useState("");

  const handleDivClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleName = (event) => {
    setCommunityName(event.target.value);
  };

  async function submit() {
    let alreadyExisting = false;

    try {
      const response = await get(`/api/canvas/${communityName}`);
      console.log(response);

      if (response != null) {
        alreadyExisting = true;
      }
    } catch (error) {
      setIsDialogOpen(false);
    }

    console.log(alreadyExisting);

    if (alreadyExisting) {
      console.log("exists");
    } else {
      createCanvas(communityName, ["Cameron"], 1);
    }

    setIsDialogOpen(false);
  }

  return (
    <div>
      <button onClick={handleDivClick}>create new community</button>
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-container">
            <div className="dialog">
              <p>Create a new community</p>
              <input type="text" value={communityName} onChange={handleName}></input>
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
