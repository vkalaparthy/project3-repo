import React from "react";
// import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Spotify from "../../utils/Spotify";

function Dashboard() {


  function getInfoFromSpotify(event) {
    event.preventDefault();
    console.log("Button clicked *********** ");
    Spotify.search()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12"> 
          <Jumbotron>
              <h1> Trying Spotify API </h1>
              <button type="button" onClick={getInfoFromSpotify}> Click here </button>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }

  export default Dashboard;