import React from "react";
import "./style.css";
import API from "../../utils/API";
import AudioPlayer from 'react-h5-audio-player';

const TrackCard = ({ songname, artistname, song, image, preview }) => {
  const handleAdd = () => {
    API.addSong ({songname, artistname, song, image, preview})
    .then (response => {
      alert("Successfully added the song to playlist");
    })
    .catch(err => {
      alert('Could not add song to the playlist');
    });
  }

  return (
    <div className="card mt-2 mb-2 p-2">
      <div className="row no-gutters">
        
          <div className="col-md-4 d-flex justify-content-center">
            <img src={image || "https://via.placeholder.com/200x200.png?text=No+Image!"} alt="Avatar" style={{ width: "100%", height: "auto"}} />
          </div>

          <div className="col-md-8 d-flex justify-content-center">
            <div className="card-body">
              <p className="blackBold">Title: {songname}</p>
              <p className="blackBold">Artist: {artistname}</p>
              <p className="playlist" >Add to Playlist<i onClick={handleAdd} className="fa fa-plus-square"></i></p>
              <p className="song"><a className="songLink" href={song} target="_blank">Go to Spotify<i className="fa fa-headphones"></i></a></p>
              {preview && <AudioPlayer
                src={preview}
                onPlay={e => console.log("onPlay")}
              />}

              {!preview && <p className="blackBold">:( Sorry! There's no preview available!</p>}

            </div>
          </div>
        
      </div>
    </div>
  )};
  
export default TrackCard;