import React, { useContext } from "react";
import { TracksContext } from "../../utils/TracksContext";
import { Container } from "../../components/Grid";
import TrackCard from "../../components/TrackCard";

function Tracks() {
  const { tracksInfoArray, setTracksInfoArray }  = useContext(TracksContext);

  return (
    <Container fluid>
      { tracksInfoArray && tracksInfoArray.map((track, i) => (
        <TrackCard
          key={i}
          artistname={track.artists[0].name}
          song={track.external_urls.spotify}
        />
      ))}
    </Container>
  );
}

export default Tracks;