import React, { useState } from "react";
import ArtistCard from "../../components/ArtistCard";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Spotify from "../../utils/Spotify";

function Dashboard() {
  const [artistInfoArray, setArtistInfoArray]  = useState([]);

  function getInfoFromSpotify(event) {
    event.preventDefault();
    console.log("Button clicked *********** ");
    Spotify.search()
      .then(res => {
        console.log(res.artists.items);
        setArtistInfoArray(res.artists.items)
      })
      .catch(err => console.log(err));
  };
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12"> 
          <Jumbotron>
              <h1> Trying Spotify API </h1>
              <button type="button" onClick={getInfoFromSpotify}> Click Here for Elvis </button>
            </Jumbotron>
          </Col>
        </Row>
        { artistInfoArray && artistInfoArray.map((artist, i) => (
          <ArtistCard
            key={i}
            image={artist.images.length && artist.images[0].url}
            artist={artist.name}
          />
        ))}
      </Container>
    );
  }
  export default Dashboard;