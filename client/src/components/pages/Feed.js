import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../utilities.css";
import "./Skeleton.css";
import { Link } from 'react-router-dom';
import {get} from "../../utilities";


// canvas object that has dimensions (integer) & color string
// use a GET call on our database to get the dimensions and the string of hexcodes for the pixels of the canvas
// for each hexcode, we add a pixel of said color

const Feed = () => {

    const [currentUser, setCurrentUser] = useState();
    const { type } = useParams();

    const setUser = async () => {
        try {
            const user = await get("/api/whoami");
            setCurrentUser(user);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
       setUser();
    }, [type]);

    let canvases = [];

    if (type === "top") {
        canvases = ['Maseeh Hall', 'Simmons Hall', 'Sigma Nu', 'Statue of Liberty', 'The Stud'];
    } else if (type === "personal") {
        for (const prop in currentUser?.placesVisited) {
            let real_id = prop.slice(1)
            console.log(real_id);
            try {
                get(`/api/canvas/id/${real_id}`).then((response)=>{
                  canvases.push(response.name)
                });
              } catch (error) {
                console.log(error);
              }
        }
    } else {
        return <p>Invalid URL.</p>;
    }

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
                <li id = {i} style={feed_box}>{i+1}. {canvases[i]}</li>
            </Link>);
        }
        return topCanvases;
    }

    return <div>
        <p>{type}</p>
        <ol class="feed-list"> {generateGrid()}</ol>
    </div>

}

export default Feed;