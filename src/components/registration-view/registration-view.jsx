import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Form, Button, Card, Row, Col} from 'react-bootstrap'
/* import {Link} from 'react-router-dom'; */

import './registration-view.scss'

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

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
    if(!email){
      setEmailErr('Email Required');
      isReq = false;
    }else if(email.indexOf('@') === -1){
      setEmailErr('Email is invalid');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://mykdrama-api.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        window.open('/', '_self'); //the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6} lg={4}>
        <Card className="mt-4 registration-card">
          <Card.Body>
            <Card.Title className="text-center mb-4">Sign up</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Text id="usernameHelpBlock" size="sm" muted>
                  Use 5 or more characters with a mix of letters and numbers
                </Form.Text>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter a Username" />
                {/* code added here to display validation error */}
                {usernameErr && <p className="invalid">{usernameErr}</p>}
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Text id="passwordHelpBlock" size="sm" muted>
                  Use 8 or more characters with a mix of letters and numbers
                </Form.Text>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a Password" />
                {/* code added here to display validation error */}
                {passwordErr && <p className="invalid">{passwordErr}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" />
                {/* code added here to display validation error */}
                {emailErr && <p className="invalid">{emailErr}</p>}
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label>Birthday<span className="font-italic"> - optional</span></Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
              
              <Button href="/" variant="outline-secondary" className="signin-button">Sign in</Button>

              <Button type="submit" onClick={handleSubmit} className="float-right">Sign up</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
};
