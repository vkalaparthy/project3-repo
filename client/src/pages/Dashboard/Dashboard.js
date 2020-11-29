import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import { ArtistsContext } from "../../utils/ArtistsContext";
import { TracksContext } from "../../utils/TracksContext";
import { NewReleasesContext } from "../../utils/NewReleasesContext";
import { PlaylistContext } from "../../utils/PlaylistContext";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import Spotify from "../../utils/Spotify";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import API from "../../utils/API";

function Dashboard() {
  const { setArtistInfoArray }  = useContext(ArtistsContext);
  const { setTracksInfoArray } = useContext(TracksContext);
  const { setNewReleasesArray } = useContext(NewReleasesContext);
  const { playlistArray, setPlaylistArray } = useContext(PlaylistContext);
  
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    API.getSongs().then(res => {
      setPlaylistArray(res.data);
    });
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    setPlaylistArray([]);
    let id = event.target.getAttribute("data-id")
    console.log(id);
    API.deleteSong(id);
    API.getSongs().then(res => {
      setPlaylistArray(res.data);
    });
  };

  const browseNewReleases = () => {
    Spotify.browse({browseType: "newReleases"}).then(res => {
      setNewReleasesArray(res.albums.items);
      setRedirectTo('/newreleases');
    })
  };

  const handleSearch = () => {
    setRedirectTo('/search');
  }

  const browseCategories = () => {
    console.log("In browse catergoies");
    // Spotify.browse({browseType: "categories"}).then(res => {
    //   console.log(res.albums.items);
    //   setNewReleasesArray(res.albums.items);
    //   setRedirectTo('/categories');
    // })
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <Container>

        <Row><Col size="md-12"><h1 className="text-center justify-content-center">Welcome back!</h1></Col></Row>

        <Row className="playlistCard">
          <Col size="md-12">
            <Card title="My Songs">
              { playlistArray.map((ele, i) =>
                <Row key={i}>
                  <Col size="md-3">
                    <h6>{ele.artistname}</h6>
                    <img src={ele.image} alt="song_cover" style={{ width: "100px", height: "auto"}}></img>
                  </Col>
                  <Col size="md-4">
                    <h4>{ele.title}</h4>
                    <a className="songLink" href={ele.url} target="_blank">Go to Spotify<i className="fa fa-headphones"></i></a>
                  </Col>
                  <Col size="md-3">
                    {ele.preview && <AudioPlayer
                      src={ele.preview}
                      onPlay={e => console.log("onPlay")}
                    />}
                    {!ele.preview && 
                      <p className="blackBold">{`:(`} Sorry! There's no preview available!</p>
                    }
                  </Col>
                  <Col size="md-2">
                    {/* <a className="pr-4" style={{ float: "right"}}><i className="fa fa-trash" onClick={() => handleDelete(ele._id)}></i></a> */}
                    <span className="pr-4" style={{ float: "right"}}><i className="fa fa-trash" data-id={ele._id} onClick={(event) => handleDelete(event)}></i></span>
                  </Col>
                  <Col size="md-12">
                    <hr></hr>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
        </Row>
        
      </Container>
    );      
  }
  }

  export default Dashboard;