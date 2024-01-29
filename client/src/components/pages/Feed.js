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
    const [canvasList, setCanvasList] = useState([]);
    const { type } = useParams();

    

    async function setUser(){
        try {
            const user = await get("/api/whoami");
            setCurrentUser(user);
        } catch (error) {
            console.log(error);
        }
    };

    async function setCanvases(){
        let canvList = [];
        try {
            if (type==="top"){
                let reactObjList = [];
                await get(`/api/all/canvas`).then((response)=>{
                    reactObjList = response;
                });
                console.log(reactObjList);
                for (const object of reactObjList){
                    console.log(object.name, object.visitors)
                    canvList.push(object.name);
                }
                console.log(canvList);
            } else if (type === "personal") {
                for (const prop in currentUser?.placesVisited) {
                    let real_id = prop.slice(1)
                    await get(`/api/canvas/id/${real_id}`).then((response)=>{
                        canvList.push(response.name)
                    });
                }
            } else {
                console.log("Unexpected URL.");
            }
        } catch (error) {
            console.log(error)
        }
        return canvList;
    }

    function generateGrid(canvases){
        const topCanvases = [];
        for (let i = 0; i < canvases.length; i++) {
            const link = `/canvas/${canvases[i]}`
            topCanvases.push(
            <Link key={i} to={link}>
                <li id = {i} style={feed_box}>{i+1}. {canvases[i]}</li>
            </Link>);
        }
        return topCanvases;
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


    useEffect(() => {
        setUser();
        setCanvases().then((canvases)=>{
            setCanvasList(canvases);
        })
    },[]);

    useEffect(() => {
        if (currentUser){
            if (type === "top" || type =="personal") {
                setCanvases().then((canvases)=>{
                    setCanvasList(canvases);                
                });
            } else {
                return <p>Invalid URL.</p>;
            }
        }
    },[currentUser, type] );
    if (type ==="top" || type==="personal"){
        return <>
                <p>{type}</p>
                <ol className="feed-list"> {generateGrid(canvasList)}</ol>
                </>
    } else{
        return <p>Invalid URL.</p>
    }
    
}

export default Feed;