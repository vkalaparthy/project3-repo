import React from "react";
import "./style.css";

const ArtistCard = ({ image, artistname, song }) => {
  console.log( artistname, "is in the building");
  console.log(image);
   return (
    <div className="card artistCard">
      <div class="col-md-3" className="flex-container" style={{ width: "300px", height: "300px", justifyContent: "center"}}>
      <img src={image} alt="Avatar" style={{ width: "300px", height: "300px"}}/>
      </div>

      <div class="col-md-9" className="container" >
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}>Artist: {artistname}</b></h4>
        <h4><b style={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}>Add to Playlist<i class="fa fa-plus-square"></i></b></h4>
        <h4><b style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}><a className="songLink" href={song} target="_blank" style={{ color: "white" }}>Listen Here<i class="fa fa-headphones"></i></a></b></h4>
      
      </div>
    </div>
  )};

export default ArtistCard;