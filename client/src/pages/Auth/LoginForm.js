import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';

function LoginForm({login}) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  });
  const [redirectTo, setRedirectTo] = useState(null);

	const handleChange = (event) => {
		setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
    event.preventDefault();
    if (userObject.username && userObject.password) {
      login(userObject.username, userObject.password);
      setRedirectTo('/');
    }
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <Container>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
            <Card title="Welcome!">
              <form style={{marginTop: 10}}>
                {/* <label htmlFor="username">Username: </label> */}
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userObject.username}
                  onChange={handleChange}
                />
                {/* <label htmlFor="password">Password: </label> */}
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userObject.password}
                  onChange={handleChange}
                />
                <br></br>
                <Link to="/signup">Don't have an account? Sign up</Link>
                <FormBtn onClick={handleSubmit}>Login</FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-3"></Col>
        </Row>
      </Container>
    )
  }
}

export default LoginForm;