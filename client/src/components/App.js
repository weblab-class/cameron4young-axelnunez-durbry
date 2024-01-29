import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
//import { Link } from "react-router-dom";
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js";
import Canvas from "./pages/Canvas.js";
import Feed from "./pages/Feed.js";
import BarMenu from "./pages/BarMenu.js";
import CreateCommunity from "./pages/CreateCommunity.js";
import "../utilities.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const GOOGLE_CLIENT_ID =
    "484515812638-qmq9pmi6ka07fp1vem17m62to5dodu7f.apps.googleusercontent.com";

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

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

  const successCallback = (position) => {
    console.log(position);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

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
                    // path="/"
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    userId={userId}
                  />
                }
              />
              <Route path="/canvas/:community_name" element={<Canvas />} />
              <Route path="/feed/:type" element={<Feed />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/create" element={<CreateCommunity />} />
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
