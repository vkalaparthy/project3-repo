import React from "react";

const TrackCard = ({ image, track}) => {
  console.log(image);
   return (
    <div className="card">
      <img src={image} alt="Avatar" style={{ width: "300px", height: "300px"}}/>
      <div className="container">
        <h4><b>{track}</b></h4>
        <p></p>
      </div>
    </div>
  )};

export default TrackCard;