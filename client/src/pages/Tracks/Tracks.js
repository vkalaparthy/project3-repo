import React, { useContext, useState } from "react";
import { TracksContext } from "../../utils/TracksContext";
import { Redirect } from 'react-router-dom';
import { Row, Col, Container } from "../../components/Grid";
import TrackCard from "../../components/TrackCard";
import { Card } from "../../components/Card";
import { FormBtn } from '../../components/Form';


function Tracks() {
  const { tracksInfoArray, setTracksInfoArray }  = useContext(TracksContext);

  const handleChange = (event) => {
		setSearchObject({
      ...searchObject,
			[event.target.name]: event.target.value
    });
    console.log(event.target.name + ": " + event.target.value);
  };

  const [searchObject, setSearchObject] = useState({
    type: "",
    query: ""
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submit!!!!");
    console.log(event.target.value);  
    console.log(searchObject);
    Spotify.search(searchObject).then(res => {
      if (searchObject.type === "artist") {
        console.log(res.artists.items);
        setArtistInfoArray(res.artists.items);
        setRedirectTo('/artists');
      } else  {
        // This is for tracks
        setTracksInfoArray(res.tracks.items);
        setRedirectTo('/tracks');
      }
    })
    .catch(err => console.log(err));
  };

  if (!tracksInfoArray.length) {
    return <Redirect to='/' />
  } else {
    return (
      <Container>
        <Row>
          <Col size="md-6">
            <Card title="Search">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Select search type</label>
                  <select name="type"  onChange={handleChange} className="form-control" id="exampleFormControlSelect1">
                    <option value="" defaultValue>Select an option</option>
                    <option value="artist">Artist</option>
                    <option value="tracks" >Tracks</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="search-option">Enter artist or track</label>
                  <input 
                    type="query" 
                    name="query"
                    placeholder="Name/Title"
                    value={searchObject.query}
                    onChange={handleChange}
                    className="form-control" id="artistOrTrack"></input>
                </div>
                <FormBtn onClick={handleFormSubmit}>Search</FormBtn>
              </form>
            </Card>
          </Col>

          <Col size="md-6">
          { tracksInfoArray && tracksInfoArray.map((track, i) => (
            <TrackCard
              key={i}
              songname={track.name}
              artistname={track.artists[0].name}
              song={track.external_urls.spotify}
              image={track.album.images[0].url}
              preview={track.preview_url}
            />
          ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tracks;
