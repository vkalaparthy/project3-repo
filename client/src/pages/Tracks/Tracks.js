import React, { useContext } from "react";
import { TracksContext } from "../../utils/TracksContext";
import { Redirect } from 'react-router-dom';
import { Container } from "../../components/Grid";
import TrackCard from "../../components/TrackCard";

function Tracks() {
  const { tracksInfoArray, setTracksInfoArray }  = useContext(TracksContext);

  if (!tracksInfoArray.length) {
    return <Redirect to='/' />
  } else {
    return (
      <Container>
        { tracksInfoArray && tracksInfoArray.map((track, i) => (
          <TrackCard
            key={i}
            songname={track.name}
            artistname={track.artists[0].name}
            song={track.external_urls.spotify}
            image={track.album.images[0].url}
          />
        ))}
      </Container>
    );
  }
}

export default Tracks;
