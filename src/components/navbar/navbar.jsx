import React from 'react';
import {link} from 'react-router-dom';
import {Container, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap';

export function Navbar() {
  const user = localStorage.getItem('user');

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  return (
    <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
      <Container className="nav-container">
      <Navbar.Brand href="/" className="ml-5">
          <img className="d-inline-block align-top" alt="myDramas" src={"https://dl.dropboxusercontent.com/s/j8gnxagz3ia496k/logo.svg?dl=0"} crossOrigin ="anonymous" height="50" />{' '}
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title={user} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/users/${user}`}>Profil</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {this.onLoggedOut() }}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}