import React from "react";

const TrackCard = ({ artistname, song }) => {
  console.log(artistname);
  console.log(song);
   return (
    <div className="card">
      {/* <img src={image} alt="Avatar" style={{ width: "300px", height: "300px"}}/> */}
      <div className="container">
        <h4><b style={{ color: "black" }}>{artistname}</b></h4>
        <h4><b style={{ color: "black" }}>{song}</b></h4>
        <p></p>
      </div>
    </div>
  )};
  
export default TrackCard;