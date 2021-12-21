import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, Container, Row} from 'react-bootstrap'

import './registration-view.scss'

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props. onLoggedIn(username) */
    /*{props.onLoggedIn(username);}*/
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Card className="mt-5">
          <Card.Body>
          <Card.Title className="text-center mb-4">Sign up</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required
                placeholder="Enter a Username"
                />
                <Form.Text id="usernameHelpBlock" size="sm" muted>
                  You can use letters and numbers
                </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
                minLength="8"
                placeholder="Enter a Password"
              />
              <Form.Text id="passwordHelpBlock" size="sm" muted>
                Use 8 or more characters with a mix of letters and numbers
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
              />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Label>Birthday <span className="font-italic"> - optional</span></Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" onClick={handleSubmit}>Sign up</Button>
          </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

RegistrationView.propTypes = {
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Birthday: PropTypes.string.isRequired,
};
