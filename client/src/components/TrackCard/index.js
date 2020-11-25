import React from "react";
import "./style.css";
import API from "../../utils/API";

const TrackCard = ({ songname, artistname, song, image, preview }) => {
  console.log(artistname);
  console.log(song);
  const handleAdd = () => {
    API.addSong ({songname, artistname, song, image, preview})
    .then (response => {
      console.log(response.data)
    });
  }
   return (
    <div className="card mb-3 p-2">
      <div className="row no-gutters">
        
          <div className="col-md-4 d-flex justify-content-center">
            <img src={image || "https://via.placeholder.com/200x200.png?text=No+Image!"} alt="Avatar" style={{ width: "100%", height: "auto"}} />
          </div>

          <div className="col-md-8 d-flex justify-content-center">
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