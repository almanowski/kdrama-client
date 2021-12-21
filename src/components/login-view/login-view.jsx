import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, Container, Row} from 'react-bootstrap';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props. onLoggedIn(username) */
    {props.onLoggedIn(username);}
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Card className="mt-5">
          <Card.Body>
          <Card.Title className="text-center mb-4">Sign in</Card.Title>
            <Form> 
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  onChange={e => setUsername(e.target.value)} 
                  required
                  />
              </Form.Group>

              <Form.Group className="mb-5" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  onChange={e => setPassword(e.target.value)} 
                  required
                  />
              </Form.Group>
              <Button variant="outline-secondary" className="signup-button">Sign up</Button>

              <Button type="submit" onClick={handleSubmit} className="float-right">
                Sign in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

LoginView.propTypes = {
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
}
