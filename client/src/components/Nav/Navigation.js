import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Nav.css';

const Navigation = (props) => {
  let greeting;

  if (props.user === null) {
    greeting = <p>Hello guest</p>
  } else if (props.user.firstName) {
    greeting = (
      <Fragment>
        Hello, <strong>{props.user.firstName}</strong>
      </Fragment>
    )
  } else if (props.user.username) {
    greeting = (
      <Fragment>
        Hello, <strong>{props.user.username} </strong>
      </Fragment>
    )
  }
  
  return (

    <Navbar collapseOnSelect expand="md" className="navigation">
      <Navbar.Brand className="navBrand" href="/">Music</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav activeKey={window.location.pathname} className="mr-auto navLinks">
        <Nav.Link className="navHome" href="/home">Home</Nav.Link>
        </Nav>
        <Nav size="mr-sm-2">
          <div className="float-right navLogout">
          {greeting} -- <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Navigation;
