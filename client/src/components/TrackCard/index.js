import React from "react";
import "./style.css";
import API from "../../utils/API";

const TrackCard = ({ songname, artistname, song }) => {
  console.log(artistname);
  console.log(song);
  const handleAdd = () => {
    API.addSong ({songname, artistname, song})
    .then (response => {
      console.log(response.data)
    });
  }
   return (
    <div className="card">
      {/* <img src={image} alt="Avatar" style={{ width: "300px", height: "300px"}}/> */}
      <div className="container">
        <h4>
          <b className="songName" >{songname}</b>
        </h4>
        <h4>
          <b className="artistName" >Artist: {artistname}</b>
        </h4>
        <h4>
          <b className="playlist" >Add to Playlist<i onClick={handleAdd} className="fa fa-plus-square"></i></b>
        </h4>
        <h4>
          <b className="song"><a className="songLink" href={song} target="_blank">Listen Here<i className="fa fa-headphones"></i></a></b>
        </h4>
        <p></p>
      </div>
    </div>
  )};
  
export default TrackCard;