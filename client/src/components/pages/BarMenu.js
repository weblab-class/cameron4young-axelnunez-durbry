import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";
import CreateCommunity from "./CreateCommunity.js";
import "./BarMenu.css";
const GOOGLE_CLIENT_ID = "484515812638-qmq9pmi6ka07fp1vem17m62to5dodu7f.apps.googleusercontent.com";

// { children, className, style } cams props
const BarMenu = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title ">Place IRL</div>
      <div className="NavBar-linkContainer">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/feed/top" className="NavBar-link">
          Canvas Feed
        </Link>
        <Link to="/feed/personal" className="NavBar-link">
          Your communities
        </Link>
        <Link to="/create" className="NavBar-link">
          Create New community
        </Link>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Link
            className="NavBar-link"
            onClick={() => {
              googleLogout();
              props.handleLogout();
            }}
            to="/"
          >
            Sign out
          </Link>
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default BarMenu;
