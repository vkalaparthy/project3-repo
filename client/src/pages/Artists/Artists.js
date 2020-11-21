import React, { useContext } from "react";
import { ArtistsContext } from "../../utils/ArtistsContext";
import { Container } from "../../components/Grid";
import ArtistCard from "../../components/ArtistCard";

function Artists() {
  const { artistInfoArray, setArtistInfoArray }  = useContext(ArtistsContext);

  return (
    <Container fluid>
      { artistInfoArray && artistInfoArray.map((artist, i) => (
        <ArtistCard
          key={i}
          image={artist.images.length && artist.images[0].url}
          artistname={artist.name}
          id={artist.id}
          externallink={artist.external_urls.spotify}
          genre={artist.genres}
        />
      ))}
    </Container>
  );
}

export default Artists;