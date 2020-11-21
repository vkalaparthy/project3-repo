import React, { useContext } from "react";
import { BrowseCategContext } from "../../utils/BrowseCategContext";
import { Redirect } from 'react-router-dom';
import { NewReleasesContext } from "../../utils/NewReleasesContext";

import { Container, Row, Col } from '../../components/Grid';

function BrowseCategories() {
  const { newReleasesArray }  = useContext(NewReleasesContext);

  if (!newReleasesArray.length) {
    return <Redirect to='/' />
  } else {
    return (
      <Container>
        <Row>
            <Col size="md-2"></Col>
            <Col size="md-8">
              <h4> Under construction !!!</h4>
            </Col>
            <Col size="md-2"></Col>
          </Row>
      </Container>
    );
  }
}
export default BrowseCategories;