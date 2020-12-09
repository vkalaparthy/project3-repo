import React, { Fragment } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Nav.css';

const Navigation = (props) => {
  let greeting;
  const location = useLocation();

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
      <Navbar.Brand className="navBrand">&#127928;</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav activeKey={window.location.pathname} className="mr-auto navLinks">
        <Nav.Link href="/home" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          &#119136; Home
        </Nav.Link>
        <Nav.Link href="/search" className={location.pathname === "/search" ? "nav-link active" : "nav-link"}>
          &#119070; Search
        </Nav.Link>
        <Nav.Link href="/newreleases" className={location.pathname === "/newreleases" ? "nav-link active" : "nav-link"}>
          &#119074; New Releases
        </Nav.Link>
        </Nav>
        <Nav size="mr-sm-2">
          <div className="float-right navLogout">
          {greeting} -- <Link to="/" className="logout" onClick={props.logout}>Logout</Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Navigation;
