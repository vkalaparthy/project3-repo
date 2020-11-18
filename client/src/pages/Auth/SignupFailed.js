import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
function SignupFailed() {
  return (
    <Container>
      <Row>
        <Col size="md-3"></Col>
        <Col size="md-6">
          <Card title="Sorry! Already a user exists!">
            <Link to="/">Main</Link>
            <span style={{ float: "right" }}><Link to="/signup">Register</Link></span>
          </Card>
        </Col>
        <Col size="md-3"></Col>
      </Row>
    </Container>
  )
}
export default SignupFailed;