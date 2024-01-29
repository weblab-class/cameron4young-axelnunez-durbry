import React from "react";
import BarMenu from "./BarMenu.js";
import CreateCommunity from "./CreateCommunity.js";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Map from "./Map.js";
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "484515812638-qmq9pmi6ka07fp1vem17m62to5dodu7f.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      {userId ? (
        <div>
          <div class="landing">
            <div id="map">
              <Map />
            </div>
          </div>
        </div>
      ) : (
        <div class="down">
          <div class="map">
            <h1>placeIRL</h1>
          </div>
          <div class="landing">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            </GoogleOAuthProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
