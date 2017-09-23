import React from "react";

const Jumbotron = ({ children }) =>
  <div style={{ height: 175, backgroundColor: "#C7EDF3" }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
