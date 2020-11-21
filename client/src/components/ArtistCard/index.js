import React from "react";
import "./style.css";

const ArtistCard = ({ image, artistname, id, externallink, genre}) => {
  console.log( artistname, "is in the building");
  console.log(image);
   return (
    <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={image || "https://via.placeholder.com/200x200.png?text=No+Image!"} alt="Avatar" style={{ width: "200px", height: "200px"}} />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <p className="blackBold">Artist: {artistname}</p>
          <p className="blackBold">Spotify Link: {externallink}</p>
          {(genre.length !== 0) && (<ul className="blackBold">
            Genres: {genre.map((item, i) =>
              <li key={i}>{item}</li>
            )}
          </ul>)}
        </div>
      </div>
    </div>
    </div>
    
  )};

export default ArtistCard;

// id={artist.id}
// externallink={artist.external_urls.spotify}
// genre={artist.genres}

