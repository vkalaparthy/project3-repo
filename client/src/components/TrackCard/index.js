import React from "react";

const TrackCard = ({ songname, artistname, song }) => {
  console.log(artistname);
  console.log(song);
   return (
    <div className="card">
      {/* <img src={image} alt="Avatar" style={{ width: "300px", height: "300px"}}/> */}
      <div className="container">
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px" }}>{songname}</b></h4>
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "15px", paddingBottom: "15px" }}>{artistname}</b></h4>
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}><a href={song} style={{ color: "white" }}>Listen Here</a></b></h4>
        <p></p>
      </div>
    </div>
  )};
  
export default TrackCard;