import React, { useContext } from "react";
import { TracksContext } from "../../utils/TracksContext";
import { Redirect } from 'react-router-dom';
import { Row, Col, Container } from "../../components/Grid";
import TrackCard from "../../components/TrackCard";
import { Card } from "../../components/Card";
import { FormBtn } from '../../components/Form';


function Tracks() {
  const { tracksInfoArray, setTracksInfoArray }  = useContext(TracksContext);

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
            />
          ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tracks;
