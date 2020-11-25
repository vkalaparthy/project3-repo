import React from "react";

export const Card = (props) => (
  <div className="card mt-5">
    <div className="card-header">
      <h1>{props.title}</h1>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
