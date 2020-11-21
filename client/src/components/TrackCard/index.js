import React from "react";
import "./style.css";
import API from "../../utils/API";

const TrackCard = ({ songname, artistname, song, image }) => {
  console.log(artistname);
  console.log(song);
  const handleAdd = () => {
    API.addSong ({songname, artistname, song})
    .then (response => {
      console.log(response.data)
    });
  }
   return (
    <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={image || "https://via.placeholder.com/200x200.png?text=No+Image!"} alt="Avatar" style={{ width: "200px", height: "200px"}} />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <p className="blackBold">Title: {songname}</p>
          <p className="blackBold">Artist: {artistname}</p>
          <p className="playlist" >Add to Playlist<i onClick={handleAdd} className="fa fa-plus-square"></i></p>
          <p className="song"><a className="songLink" href={song} target="_blank">Listen Here<i className="fa fa-headphones"></i></a></p>
        </div>
      </div>
    </div>
    </div>
  )};
  
export default TrackCard;