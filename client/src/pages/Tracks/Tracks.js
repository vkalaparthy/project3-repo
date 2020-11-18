import React, { useState } from 'react';
import TrackCard from "../../components/TrackCard";
import "./Tracks.css";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Spotify from "../../utils/Spotify";

function Tracks() {
  const [trackInfoArray, setTrackInfoArray]  = useState([]);

  function getInfoFromSpotify(event) {
    event.preventDefault();
    console.log("Button clicked *********** ");
    Spotify.search()
      .then(res => {
        console.log(res.tracks.items);
        setTrackInfoArray(res.tracks.items)
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="tracks-body">
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12"> 
            <Jumbotron>
              <h1 style={{marginBottom: "20px"}}> Search </h1>
              <button type="button" onClick={getInfoFromSpotify}> Search for a Track </button>
            </Jumbotron>
          </Col>
        </Row>
        { trackInfoArray && trackInfoArray.map((track, i) => (
          <TrackCard
            key={i}
            image={track.images.length && track.images[0].url}
            track={track.name}
          />
        ))}
      </Container>
    </div>
  );
}

export default Tracks;