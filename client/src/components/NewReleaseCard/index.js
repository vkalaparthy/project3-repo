import React, { useContext } from "react";
import { TracksContext } from "../../utils/TracksContext";
import { AlbumContext } from "../../utils/AlbumContext";
import Spotify from "../../utils/Spotify";
import "./style.css";

const NewReleaseCard = ({ name, artists, releaseDate, image, id, ext_link }) => {
  // console.log(name);
  // console.log(artists);
  const { setTracksInfoArray } = useContext(TracksContext);
  const { setAlbumImage } = useContext(AlbumContext);

  const getAlbumSongs = (event) => {
    setTracksInfoArray([]);
    // console.log("id: " + event.target.value);
    // console.log("image: " + event.target.getAttribute("data-image"));
    //  This API does not provide any image, so we are trying to save the album image to use in Playlist display!
    Spotify.browse({artistId: event.target.value}).then(res => {
      console.log(res.items);
      setTracksInfoArray(res.items);
      setAlbumImage(image);
      window.scrollTo(0, 0);
    })
    .catch(err => console.log(err));
  };

   return (
    <div className="card mb-3 p-2">
      <div className="row no-gutters">
        <div className="col-md-4 p-2 d-flex justify-content-center">
          <img src={image || "https://via.placeholder.com/200x200.png?text=No+Image!"} alt="Album" style={{ width: "100%", height: "auto"}} />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h1 className="blackBold">{name}</h1>
            <span className="blackBold">Artists: </span>
            {artists.map((artist, i) =>  
              <p className="blackBold mr-4" key={i} >{artist.name}</p>
            )}
            <p className="blackBold">Release Date: {releaseDate}</p>
            <button className="btn" value={id} data-image={image} onClick={(event) => getAlbumSongs(event)}>Album Songs</button>
            <p><a className="songLink" href={ext_link} target="_blank">Go to Spotify<i className="fa fa-headphones"></i></a></p>
          </div>
        </div>

      </div>
    </div>
  )};
  
export default NewReleaseCard;