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

  const handleDelete = (id) => {
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
        
        <Row>
          <Col size="md-4">
            <div className="mt-5 d-flex justify-content-center"><button className="btn" onClick={browseNewReleases}>Browse New Releases</button></div>
          </Col>
          <Col size="md-4">
            <div className="mt-5 d-flex justify-content-center"><button className="btn" onClick={browseCategories}>Browse Categories</button></div>
          </Col>
          <Col size="md-4">
            <div className="mt-5 d-flex justify-content-center"><button className="btn" onClick={handleSearch}>Search</button></div>
          </Col>
        </Row>

        <Row className="playlistCard">
          <Col size="md-12">
            <Card title="My Playlists">
              { playlistArray.map((ele, i) =>
                <div className="p-2" key={i}> 
                  <img src={ele.image} alt="song_cover" style={{ width: "100px", height: "auto"}}></img>
                  <h5>
<<<<<<< HEAD
                    {ele.preview && <AudioPlayer
                      src={ele.preview}
                      onPlay={e => console.log("onPlay")}
                    />}
                    {ele.title}
=======
                  {ele.preview && <AudioPlayer
                    src={ele.preview}
                    onPlay={e => console.log("onPlay")}
                  />}
                  {!ele.preview && <p className="blackBold">:( Sorry! There's no preview available!</p>}
                    <a className="pr-1" ><i className="fa fa-play"></i></a> <span></span> 
                    {ele.title} <span></span> 
>>>>>>> 256cf97734e5faab4e5288c49e65a2b19159bed6
                    <a className="pr-4" style={{ float: "right"}}><i className="fa fa-trash" onClick={() => handleDelete(ele._id)}></i></a>
                  </h5> 

                  <h6>
                    <div className="pl-4">{ele.artistname}</div> 
                  </h6>
                  <hr></hr>
                </div>
              )}
            </Card>
          </Col>
        </Row>
        
      </Container>
    );      
  }
  }
  export default Dashboard;