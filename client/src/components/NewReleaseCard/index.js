import React from "react";
// import { Col, Row, Container } from "../../components/Grid";
import "./style.css";

const NewReleaseCard = ({ name, artists, releaseDate, image, ext_link }) => {
  console.log(name);
  console.log(artists);
   return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={image} alt="Avatar" style={{ width: "200px", height: "200px"}} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p className="blackBold">{name}</p>
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