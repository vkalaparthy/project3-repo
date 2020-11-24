import React from "react";
// import { Col, Row, Container } from "../../components/Grid";
import "./style.css";

const NewReleaseCard = ({ name, artists, releaseDate, image, ext_link }) => {
  console.log(name);
  console.log(artists);
   return (
    <div className="card mb-3 p-2">
      <div className="row no-gutters">
        <div className="col-md-4 d-flex justify-content-center">
          <img src={image} alt="Avatar" style={{ width: "100%", height: "auto"}} />
        </div>

        <div className="col-md-8 d-flex justify-content-center">
          <div className="card-body">
            <h1 className="blackBold">{name}</h1>
            <span className="blackBold">Artists: </span>
            {artists.map((artist, i) =>  
              <p className="blackBold mr-4" key={i} >{artist.name}</p>
            )}
            <p className="blackBold">Release Date: {releaseDate}</p>
            <p>{ext_link}</p>
          </div>
        </div>

      </div>
    </div>
  )};
  
export default NewReleaseCard;