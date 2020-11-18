import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col } from '../Grid';
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <Col size="md-2.5 sm-2.5">
        <Link to="/" className="navbar-brand">Home</Link>
      </Col>
      <Col size="md-2.5 sm-2.5">
        <div className="nav-tracks">
          <Link to="/tracks" className="navbar-brand">Tracks</Link>
        </div>
      </Col>
      <Col size="md-7 sm-7">
        <div className="float-right">
        {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Col>
    </nav>
  )
};

export default Nav;
