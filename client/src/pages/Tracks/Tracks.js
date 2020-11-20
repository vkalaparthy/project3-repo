import React, { useContext } from "react";
import { TracksContext } from "../../utils/TracksContext";
import { Container } from "../../components/Grid";
import TrackCard from "../../components/TrackCard";

function Tracks() {
  const { trackInfoArray, settrackInfoArray }  = useContext(TracksContext);

  return (
    <Container fluid>
      { trackInfoArray && trackInfoArray.map((track, i) => (
        <TrackCard
          key={i}
          image={track.images.length && track.images[0].url}
          track={track.name}
        />
      ))}
    </Container>
  );
}

export default Tracks;