import React, { Component } from 'react';
import TrackCard from "../../components/TrackCard";
import "./Tracks.css";
import { Container } from "../../components/Grid";
// import Jumbotron from "../../components/Jumbotron";
import SearchBox from "../../components/SearchBox";
import Spotify from "../../utils/Spotify";

class Tracks extends Component {
  state = {
    search: "",
    tracks: [],
    results: [],
    error: ""
  };

  componentDidMount() {
    Spotify.getAccessToken()
      .then(res => this.setState({ tracks: res.data.message }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    Spotify.getTrack(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center" style={{marginTop: "20px", marginBottom: "20px"}}> Search for a Song </h1>
          <SearchBox
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            tracks={this.state.tracks}
          />
          <TrackCard results={this.state.results} />
        </Container>
      </div>
    );
  }
}

export default Tracks;