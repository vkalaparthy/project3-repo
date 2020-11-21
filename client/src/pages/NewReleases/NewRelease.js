import React, { useContext } from "react";
import { NewReleasesContext } from "../../utils/NewReleasesContext";
import { Redirect } from 'react-router-dom';
// import { Container } from "../../components/Grid";
import NRCard from "../../components/NewReleaseCard";
import { Container, Row, Col } from '../../components/Grid';

function NewRelease() {
  const { newReleasesArray }  = useContext(NewReleasesContext);

  if (!newReleasesArray.length) {
    return <Redirect to='/' />
  } else {
    return (
      <Container>
        <Row>
            <Col size="md-2"></Col>
            <Col size="md-8">
              { newReleasesArray && newReleasesArray.map((item, i) => (
                <NRCard
                  key={i}
                  name={item.name}
                  artists={item.artists}
                  releaseDate={item.release_date}
                  image={item.images[0].url}
                  ext_link={item.external_urls.spotify}
                />
              ))}
            </Col>
            <Col size="md-2"></Col>
          </Row>
      </Container>
    );
  }
}
export default NewRelease;