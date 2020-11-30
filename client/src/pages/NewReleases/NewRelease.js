import React, { useEffect, useContext } from "react";
import { NewReleasesContext } from "../../utils/NewReleasesContext";
import { TracksContext } from "../../utils/TracksContext";
import { AlbumContext } from "../../utils/AlbumContext";
import NRCard from "../../components/NewReleaseCard";
import TrackCard from "../../components/TrackCard";
import { Container, Row, Col } from '../../components/Grid';
import Spotify from "../../utils/Spotify";

function NewRelease() {
  const { newReleasesArray, setNewReleasesArray }  = useContext(NewReleasesContext);
  const { tracksInfoArray } = useContext(TracksContext);
  const { albumImage } = useContext(AlbumContext);

  useEffect(() => {
    Spotify.browse({browseType: "newReleases"}).then(res => {
      setNewReleasesArray(res.albums.items);
    })
  }, []);

  return (
    <Container>
      <Row>
          <Col size="md-5">
            { newReleasesArray && newReleasesArray.map((item, i) => (
              <NRCard
                key={i}
                name={item.name}
                artists={item.artists}
                releaseDate={item.release_date}
                image={item.images[0].url}
                id={item.id}
                ext_link={item.external_urls.spotify}
              />
            ))}
          </Col>
          <Col size="md-7">
            { tracksInfoArray && tracksInfoArray.map((track, i) => (
              <TrackCard
                key={i}
                songname={track.name}
                artistname={track.artists[0].name}
                song={track.external_urls.spotify}
                image={albumImage}
                preview={track.preview_url}
              />
            ))
            }
          </Col>
        </Row>
    </Container>
    );
  // }
}
export default NewRelease;