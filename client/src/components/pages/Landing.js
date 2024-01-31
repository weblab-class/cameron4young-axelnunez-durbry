import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import Guide from "./Guide.js";
import Map from "./Map.js";
import "../../utilities.css";
import "./Skeleton.css";
import pin_clip from './pin_clip.png'

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "484515812638-qmq9pmi6ka07fp1vem17m62to5dodu7f.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, location }) => {
  return (
    <div>
      {userId ? (
        <div>
          <Guide />
          <div class="landing">
            <div id="map">
              <Map location={location}/>
            </div>
          </div>
        </div>
      ) : (
        <div className="down">
          <div className="map">
            <h1 className="glow-text" style={{fontSize: "8vw"}}>placeIRL</h1>
            <p className="glow-text" style={{fontSize: "3vw"}}>shared community artwork</p>
            <img className="pin-clip1" src={pin_clip}/>
            <img className="pin-clip2" src={pin_clip}/>
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
