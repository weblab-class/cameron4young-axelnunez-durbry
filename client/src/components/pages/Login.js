import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "484515812638-qmq9pmi6ka07fp1vem17m62to5dodu7f.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      {userId ? (
      <div>
        <div class="center">
          <img src="https://geology.com/world/world-map.gif"/>
        </div>
      <div class="landing">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        </GoogleOAuthProvider>
      </div>
    </div>
      ) : (
        <div class="down">
        <div class="center">
        <h1>placeIRL</h1>
      </div>
      <div class="landing">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        </GoogleOAuthProvider>
      </div>
    </div>
      )}
    </div>
  );
};

export default Login;
