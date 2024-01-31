import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Guide from "./pages/Guide.js"
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js";
import Canvas from "./pages/Canvas.js";
import Feed from "./pages/Feed.js";
import BarMenu from "./pages/BarMenu.js";
import CreateCommunity from "./pages/CreateCommunity.js";
import "../utilities.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";


const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [currentUser, setCurrentUser] = useState();
  const [location, setLocation] = useState();
  useEffect(() => {
    document.title = "placeIRL";
    get("/api/whoami").then((user) => {
      setCurrentUser(user);
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        setLocation(undefined);
    });
  }, [userId, location]);
  

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      console.log(socket.id);
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <div>
        {userId ? (
          <div className="home">
            <BarMenu handleLogout={handleLogout} />
            <Routes>
              <Route
                path="/"
                element={
                  <Landing
                    handleLogin={handleLogin}
                    userId={userId}
                    location = {location}
                  />
                }
              />
              <Route path="/canvas/:community_name" element={<Canvas />} />
              <Route path="/feed/:type" element={<Feed />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/create" element={<CreateCommunity userLocation={location}/>} />
            </Routes>
          </div>
        ) : (
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <Landing handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
