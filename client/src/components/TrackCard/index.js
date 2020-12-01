import React, { useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import API from "../../utils/API";
import AudioPlayer from 'react-h5-audio-player';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';


const TrackCard = ({ songname, artistname, song, image, preview }) => {
  console.log(artistname);
  console.log(song);

  const [tooltipText, setTooltipText] = useState('Simple tooltip');

  const renderTooltip = (props) => (
      <Tooltip {...props}>
        {tooltipText}
      </Tooltip>
    );

  const handleAdd = () => {
    console.log("In handleAdd");
    console.log(` ****  ${songname}  ${artistname}  ${song} ${image}  ${preview}`)
    API.addSong ({songname, artistname, song, image, preview})
    .then (response => {
      setTooltipText ("Song added succesfully!")
      console.log(response.data);
    })
    .catch(err => {
      setTooltipText ("Song could not be added")
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
              <p>
              <OverlayTrigger
              trigger="focus"
              placement="right"
              delay={{ show: 1000, hide: 2000 }}
              overlay={renderTooltip}
              >
              <a id="toolTipButton" href={"#a"} onClick={handleAdd}>Add to Playlist<i className="fa fa-plus-square"></i></a>
              </OverlayTrigger></p>
              {preview && <AudioPlayer
                src={preview}
                onPlay={e => console.log("onPlay")}
              />}
              {!preview && <p className="blackBold">:( Sorry! There's no preview available!</p>}
              <p className="song"><a className="songLink" href={song} target="_blank">Go to Spotify<i className="fa fa-headphones"></i></a></p>
            </div>
          </div>
        
      </div>
    </div>
  )};
  
export default TrackCard;