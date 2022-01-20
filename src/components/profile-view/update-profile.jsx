import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'

export default function UpdateProfile() {
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

  const editUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const usernamet = localStorage.getItem('user');

    const isReq = validate();
    if(isReq) {
      axios.put(`https://mykdrama-api.herokuapp.com/users/${usernamet}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }, { 
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      })
      .then(response => {
        localStorage.setItem('user', response.data.Username);
        alert('Your profile has been updated.');
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
    }
  }


  return (
    <Form className="formDisplay" onSubmit={editUser} >

      <h4>Edit Profile</h4>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' name="Username" placeholder="New Username" onChange={e => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p className="invalid">{usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' name="Password" placeholder="*******" onChange={e => setPassword(e.target.value)} />
        {/* code added here to display validation error */}
        {passwordErr && <p className="invalid">{passwordErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' name="Email" placeholder="New Email"  onChange={e => setEmail(e.target.value)} />
        {/* code added here to display validation error */}
        {emailErr && <p className="invalid">{emailErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type='date' name="Birthday"  onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
        
      <Button type="submit">Update</Button>

  </Form>
  )
}