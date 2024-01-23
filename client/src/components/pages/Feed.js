import React from "react";

import "../../utilities.css";
import "./Skeleton.css";
import { Link } from 'react-router-dom';


// canvas object that has dimensions (integer) & color string
// use a GET call on our database to get the dimensions and the string of hexcodes for the pixels of the canvas
// for each hexcode, we add a pixel of said color

const Feed = () => {

    // make an API call to get dimensions and string

    const canvases = ['Maseeh Hall', 'Simmons Hall', 'Sigma Nu', 'Statue of Liberty', 'The Stud']

    const feed_box = {
        width:"50vw",
        height:"30vh",
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        border: '1px solid black',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', 
    };
    const generateGrid = () => {
        const topCanvases = [];
        for (let i = 0; i < canvases.length; i++) {
            const link = `/canvas/${canvases[i]}`
            topCanvases.push(
            <Link to={link}>
                <li style={feed_box}>{i+1}. {canvases[i]}</li>
            </Link>);
        }
        return topCanvases;
    }
    return <ol class="feed-list"> {generateGrid()}</ol>;
};

export default Feed;