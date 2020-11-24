import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Container } from '../Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <nav className="navbar navbar-dark p-3">
  
      <Col size="md-1">
        <Link to="/" className="navbar-brand">Home</Link>
      </Col>
      <Col size="md-1">
        <div className="nav-tracks">
          <Link to="/tracks" className="navbar-brand">Tracks</Link>
        </div>
      </Col>
      <Col size="md-10">
        <div className="d-flex justify-content-end">
        {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Col>
    </nav>
  )
};

export default Nav;