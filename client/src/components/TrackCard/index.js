import React from "react";
import "./style.css";

const TrackCard = ({ songname, artistname, song }) => {
  console.log(artistname);
  console.log(song);
  const handleAdd = () => {
    API.addSong ()
    .then (response => {
      console.log(response.data)
    });
  }
   return (
    <div className="card">
      {/* <img src={image} alt="Avatar" style={{ width: "300px", height: "300px"}}/> */}
      <div className="container">
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px" }}>{songname}</b></h4>
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "15px", paddingBottom: "15px" }}>Artist: {artistname}</b></h4>
        <h4><b style={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}>Add to Playlist<i onClick={handleAdd} className="fa fa-plus-square"></i></b></h4>
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}><a className="songLink" href={song} target="_blank" style={{ color: "white" }}>Listen Here<i className="fa fa-headphones"></i></a></b></h4>
        <p></p>
      </div>
    </div>
  )};
  
export default TrackCard;