import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { TracksContext } from "../../utils/TracksContext";
import Spotify from "../../utils/Spotify";
import "./style.css";

const ArtistCard = ({ image, artistname, id, externallink, genre}) => {
  // console.log( artistname, "is in the building");
  // console.log(externallink);
  const { setTracksInfoArray } = useContext(TracksContext);
  const [redirectTo, setRedirectTo] = useState(null);

  const getTopSongs = (value) => {
    console.log("Button clicked!" + value);
    Spotify.topSongs({artistId: value}).then(res => {
      console.log(res.tracks);
      setTracksInfoArray(res.tracks);
      setRedirectTo('/tracks');
    })
    .catch(err => console.log(err));
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={image || "https://via.placeholder.com/200x200.png?text=No+Image!"} alt="Avatar" style={{ width: "200px", height: "200px"}} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p className="blackBold">Artist: {artistname}</p>
            {(genre.length !== 0) && (<ul className="blackBold comma-list">
              Genres: {genre.slice(0,3).map((item, i) =>
                <li key={i}>{item}</li>
              )}
            </ul>)}
            <br></br>
            <p className="link"> <a href={externallink} target="_blank">Check them out on Spotify!<i className="fa fa-spotify"></i></a></p>
            <button className="btn" value={id} onClick={(event) => getTopSongs(event.target.value)}>Top Songs</button>
          </div>
        </div>
      </div>
      </div> 
    )
  }              
};

export default ArtistCard;

// id={artist.id}
// externallink={artist.external_urls.spotify}
// genre={artist.genres}

