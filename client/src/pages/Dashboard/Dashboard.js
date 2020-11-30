import React, { useContext, useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { PlaylistContext } from "../../utils/PlaylistContext";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import API from "../../utils/API";

function Dashboard() {
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
                  <Col size="md-2">
                    <h4 style={{ paddingTop: "10px" }}>{ele.title}</h4>
                    <a className="songLink" href={ele.url} target="_blank">Go to Spotify<i className="fa fa-headphones"></i></a>
                  </Col>
                  <Col size="md-5">
                    {ele.preview && <AudioPlayer
                      src={ele.preview}
                      onPlay={e => console.log("onPlay")}
                    />}
                    {!ele.preview && 
                      <p style={{ paddingTop: "15px"}} className="blackBold">{`:(`} Sorry! There's no preview available!</p>
                    }
                  </Col>
                  <Col size="md-2">
                    <span className="pr-4" style={{ float: "left", paddingTop: "15px"}}><i className="fa fa-trash fa-lg" data-id={ele._id} onClick={(event) => handleDelete(event)}></i></span>
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