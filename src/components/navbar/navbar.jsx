import React from 'react';
import {link} from 'react-router-dom';
import {Container, Navbar, Nav, Button, NavDropdown, Row} from 'react-bootstrap';

import './navbar.scss'

export function Navbar() {
  const user = localStorage.getItem('user');

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  if (user) {
    return (
      <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
        <Container className="nav-container">
          <Navbar.Brand href="/" className="navbar-brand">
            <img className="d-inline-block align-top" alt="myDramas" src={"https://dl.dropboxusercontent.com/s/j8gnxagz3ia496k/logo.svg?dl=0"} crossOrigin ="anonymous" height="50" />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/" className="ml-2">
                Dramas
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto mr-4">
              <NavDropdown title={user} id="basic-nav-dropdown">
              <NavDropdown.Item href={`/users/${user}`}>Profil</NavDropdown.Item>
              <NavDropdown.Item onClick={() => {this.onLoggedOut() }}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  return (
    <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
      <Container className="nav-container">
        <Navbar.Brand href="/" className="navbar-brand">
          <img className="d-inline-block align-top" alt="myDramas" src={"https://dl.dropboxusercontent.com/s/j8gnxagz3ia496k/logo.svg?dl=0"} crossOrigin ="anonymous" height="50" />{' '}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}