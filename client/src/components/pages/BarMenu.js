import React from "react";

import "../../utilities.css";
import "./Skeleton.css";

const BarMenu = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default BarMenu;