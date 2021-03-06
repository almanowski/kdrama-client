import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Form, Button, Card, Row, Col} from 'react-bootstrap';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(username.length < 5){
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 8){
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
    /* Send a request to the server for authentication */
      axios.post('https://mykdrama-api.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12}  md={6} lg={4}>
        <Card className="mt-5 log-card">
          <Card.Body>
            <Card.Title className="text-center mb-5 mt-2">Sign in</Card.Title>
            <Form> 
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group className="mb-5" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  value={password} onChange={e => setPassword(e.target.value)} />
                {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Button href="/register" variant="outline-secondary" className="signup-button mt-2">
                Sign up
              </Button>

              <Button type="submit" onClick={handleSubmit} className="float-right mt-2">
                Sign in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired, 
};
