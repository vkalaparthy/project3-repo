import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ backgroundColor: "#edc7b7", height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
