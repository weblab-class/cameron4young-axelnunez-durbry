import React, { useState } from "react";
import "./Guide.css"
import "./Skeleton.css"
const Guide = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    };
    
    return (
        <div>
          <button onClick={toggleDialog} className="open-button">Help</button>
          {dialogOpen && (
            <div className="guide-dialog">
              <div className="guide-container">
                <div className="inner-container">
                  <h1>Guide</h1>
                  <p>Welcome to placeIRL, a platform for shared community artwork inspired by r/place.</p>
                  <p>Upon arriving at the homepage, users can navigate through the map to explore different canvases in their area.</p>
                  <p>To access a canvas through the map, click on any red place marker, and then click on the link pop-up to be navigated to the canvas page!</p>
                  <p>Our pixel placing system makes creating art easy while simultaneously building community in shared spaces. To place a pixel, just simply click on the canvas grid, choose your color, and then press "Place Pixel"</p> 
                  <p>In order to contribute to a canvas, the only requirement is that the user must be within a 50m radius of the marker. Because of this, enabling location services is not necessarily but very beneficial for using placeIRL!</p>
                  <p>In addition to the map, users can get inspiration by navigating through through the "Top Places" feed, which features the places that have the most visitors.</p>
                  <p>Users can also easily look at all of the places they've been under the "Places Visited" tab to see how their communities' art has evolved!</p>
                  <p>Last, but certainly not least, users can create a place wherever they are, whether it be at their school, local park, or wherever their heart desires.</p>
                  <button onClick={toggleDialog}>Close</button>

                </div>
              </div>
            </div>
          )}
        </div>
    );
};


export default Guide;
