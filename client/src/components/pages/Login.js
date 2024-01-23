import React from "react";
import BarMenu from './BarMenu.js'
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link } from 'react-router-dom';

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "484515812638-qmq9pmi6ka07fp1vem17m62to5dodu7f.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      {userId ? (
      <div>
        <div class="map">
          <img src="https://geology.com/world/world-map.gif"/>
        </div>
      <div class="landing">
      <BarMenu className="button-container" style={{ border: '1px solid #ccc', padding: '10px' }}>
        <button onClick={() => console.log('Button 1 clicked')}>create your own community</button>
        <Link to="/feed">
          <button onClick={() => console.log('Button 2 clicked')}>canvas feed</button>
        </Link>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            sign out
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        </GoogleOAuthProvider>
      </BarMenu>
      </div>
    </div>
      ) : (
        <div class="down">
        <div class="map">
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
