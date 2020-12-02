import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import API from "../../utils/API";
import AudioPlayer from 'react-h5-audio-player';
import "./style.css";

const TrackCard = ({ songname, artistname, song, image, preview }) => {
  const handleAdd = () => {
    API.addSong ({songname, artistname, song, image, preview})
    .then (response => {
      // alert("Successfully added the song to playlist");
      store.addNotification({      
        message: 'Song successfully added to the playlist!',
        type: 'awesome',                         // 'default', 'success', 'info', 'warning'
        container: 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {duration: 3000}
      })
    })
    .catch(err => {
      // alert('Could not add song to the playlist');
      store.addNotification({     
        title: "Error", 
        message: 'Song could not be added to the playlist',
        type: 'danger',                         // 'default', 'success', 'info', 'warning'
        container: 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {duration: 3000}
      });
      console.log(err);
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
              {/* <p className="playlist" >Add to Playlist<i onClick={handleAdd} className="fa fa-plus-square"></i></p> */}
              <button className="btn songBtn" onClick={handleAdd}>Add to playlist</button>
              <p className="song"><a className="songLink" href={song} target="_blank">Go to Spotify<i className="fa fa-headphones"></i></a></p>
              {preview && <AudioPlayer
                src={preview}
                onPlay={e => console.log("onPlay")}
              />}
              {!preview && <p className="blackBold">😞 Sorry! There's no preview available!</p>}
            </div>
          </div>
        
      </div>
    </div>
  )};
  
export default TrackCard;