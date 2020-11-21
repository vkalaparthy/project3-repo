import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';

function SignupForm() {
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    redirectTo: null
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
		// TODO - validate!
		AUTH.signup({
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      username: userObject.username,
      password: userObject.password
    }).then(response => {
      // console.log(response);
      if (!response.data.errmsg) {
        setRedirectTo('/');
      } else {
        console.log("redirecting to signup failed");
        setRedirectTo('/Signupfailed');
        // console.log('duplicate');
      }
    });
  };
  
  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  }
  
  return (
    <Container>
      <Row>
        <Col size="md-3"></Col>
        <Col size="md-6">
          <Card title="Register">
            <form style={{marginTop: 10}}>
              {/* <label htmlFor="username">First name: </label> */}
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={userObject.firstName}
                onChange={handleChange}
              />
              {/* <label htmlFor="username">Last name: </label> */}
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={userObject.lastName}
                onChange={handleChange}
              />
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
              {/* <label htmlFor="confirmPassword">Confirm Password: </label> */}
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={userObject.confirmPassword}
                onChange={handleChange}
              />
              <br></br>
              <Link to="/">Existing user? Login</Link>
              <FormBtn onClick={handleSubmit}>Register</FormBtn>
            </form>
          </Card>
        </Col>
        <Col size="md-3"></Col>
      </Row>
    </Container>
  )
}

export default SignupForm;
