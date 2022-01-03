import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {Navbar} from '../navbar/navbar';
import {DramaCard} from '../drama-card/drama-card';
import {DramaView} from '../drama-view/drama-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';

import './main-view.scss'

export default class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      dramas: [],
      user: null
    }
    this.getUser = this.getUser.bind(this)
  }

  getDramas(token) {
    axios.get('https://mykdrama-api.herokuapp.com/korean-dramas', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        //Asign the result to the state
        this.setState({
          dramas: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUser() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.get(`https://mykdrama-api.herokuapp.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      this.setState({
        name: response.data.Name,
        username: response.data.Username,
        password: response.data.Password,
        email: response.data.Email,
        birthday: response.data.Birthday,
        favdramas: response.data.FavDramas
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getDramas(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getDramas(authData.token);
  }

  render() {
    const {dramas, user, username, password, email, birthday, favdramas} = this.state;

    return (
      <Router>
        <>
          <Row>
            <Route path='/' render={() => {
              return <Col className="main-view-navbar">
                <Navbar user={user} />
              </Col>
            }} />
          </Row>

          <Row className="main-view-row justify-content-md-center mt-5"> 
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView />
                </Col>
            }} />

            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                
              if (dramas.length === 0) return <div className="main-view" />;
                return dramas.map(d =>(
                  <Col xs={12} md={6} lg={4} xl={3} xxl={2} key={d._id} className="mb-5 main-view-col">
                    <DramaCard drama={d} />
                  </Col>
                ))
            }} />

            <Route path="/korean-dramas/:dramaId" render={({match, history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (dramas.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <DramaView drama={dramas.find(m => m._id === match.params.dramaId)} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/directors/:name" render={({match, history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (dramas.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <DirectorView director={dramas.find(d => d.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/genres/:name" render={({match, history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (dramas.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <GenreView genre={dramas.find(g => g.Genre.Name === match.params.name).Genre}  onBackClick={() => history.goBack()} />
                </Col>
            }} />
             
            <Route path="/users/:username" render={({history}) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (dramas.length === 0) return <div className="main-view" />; 
                return <Col>
                  <ProfileView getUser={this.getUser} username={username} birthday={birthday} password={password} email={email} favdramas={favdramas} drama={dramas} onBackClick={() => history.goBack()} removeDrama={(_id) => this.onRemoveFavorite(_id)} />
                </Col>
            }} />

          </Row>
        </>
      </Router>
    );
  }
}