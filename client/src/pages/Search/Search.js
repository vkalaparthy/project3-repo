import React, { useContext, useState } from "react";
import { ArtistsContext } from "../../utils/ArtistsContext";
import { TracksContext } from "../../utils/TracksContext";
import { Col, Row, Container } from "../../components/Grid";
import { FormBtn } from '../../components/Form';
import { Card } from "../../components/Card";
import Spotify from "../../utils/Spotify";
import TrackCard from "../../components/TrackCard";
import ArtistCard from "../../components/ArtistCard";


function Search() {

  const { artistInfoArray, setArtistInfoArray }  = useContext(ArtistsContext);
  const { tracksInfoArray, setTracksInfoArray } = useContext(TracksContext);

  
  const [searchObject, setSearchObject] = useState({
    type: "",
    query: ""
  })

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submit!!!!");
    // empty the content of Both artistArray and Tracks Array
    setArtistInfoArray([]);
    setTracksInfoArray([]);
    console.log(searchObject);
    console.log(event.target.value);  
    console.log(searchObject);
    Spotify.search(searchObject).then(res => {
      if (searchObject.type === "artist") {
        console.log(res.artists.items);
        setArtistInfoArray(res.artists.items);
        //setRedirectTo('/artists');
      } else  {
        // This is for tracks
        setTracksInfoArray(res.tracks.items);
        //setRedirectTo('/tracks');
      }
    })
    .catch(err => console.log(err));
  };
  
  const handleChange = (event) => {
		setSearchObject({
      ...searchObject,
			[event.target.name]: event.target.value
    });
    console.log(event.target.name + ": " + event.target.value);
  };

  return (
    <Container>
      <Row>
        <Col size="md-5">
          <Card title="Search">
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Select search type</label>
                <select name="type"  onChange={handleChange} className="form-control" id="exampleFormControlSelect1">
                  <option value="" defaultValue>Select an option</option>
                  <option value="artist">Artist</option>
                  <option value="track" >Tracks</option>
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

        <Col size="md-7">
          { tracksInfoArray && tracksInfoArray.map((track, i) => (
            <TrackCard
              key={i}
              songname={track.name}
              artistname={track.artists[0].name}
              song={track.external_urls.spotify}
              image={track.album.images[0].url}
              preview={track.preview_url}
            />
          ))
          }
          { artistInfoArray && artistInfoArray.map((artist, i) => (
            <ArtistCard
              key={i}
              image={artist.images.length && artist.images[0].url}
              artistname={artist.name}
              id={artist.id}
              externallink={artist.external_urls.spotify}
              genre={artist.genres}
            />
          ))
          }
        </Col>       
      </Row>
    </Container>
  );

}

export default Search;