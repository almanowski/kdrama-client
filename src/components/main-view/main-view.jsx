import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Container, Col, Row} from 'react-bootstrap';

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {Navbar} from '../navbar/navbar';
import {DramaCard} from '../drama-card/drama-card';
import {DramaView} from '../drama-view/drama-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      dramas: [],
      genres: [],
      user: null
    };
  }

  getDramas(token) {
    axios.get('https://mykdrama-api.herokuapp.com/korean-dramas', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Asign the result to the state
      this.setState({
        dramas: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getGenres(token) {
    axios.get('https://mykdrama-api.herokuapp.com/genres/:name', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Asign the result to the state
      this.setState({
        genres: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user:localStorage.getItem('user')
      });
      this.getDramas(accessToken);
      this.getGenres(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the 
  'user' property in state tot that 'particular user' */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getDramas(authData.token);
    this.getGenres(authData.token);
  }

  render() {
      const {dramas, genres, user} = this.state;

      return (
        <Router>
          <Route path='/' render={() => {
            if (user) return <Col className="mynavbar">
              <Navbar user={user} />
            </Col>
          }} />
          
          <Container className="main-view-container">
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                
                // Before the movies have been loaded
                if (dramas.length === 0) return <div className="main-view" />;

                return dramas.map(d =>(
                  <Col md={3} key={d._id}>
                    <DramaCard drama={d} />
                  </Col>
                ))
              }} />

              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView />
                </Col>
              }} />

              <Route path="/korean-dramas/:dramaId" render={({match, history}) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>

                // Before the movies have been loaded
                if (dramas.length === 0) return <div className="main-view" />;

                return <Col md={8}>
                  <DramaView drama={dramas.find(m => m._id === match.params.dramaId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              <Route path="/directors/:name" render={({match, history}) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>

                // Before the movies have been loaded
                if (dramas.length === 0) return <div className="main-view" />;
                
                return <Col md={8}>
                  <DirectorView director={dramas.find(d => d.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              <Route exact path="/genres/:name" render={({match, history}) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>

                // Before the movies have been loaded
                if (dramas.length === 0) return <div className="main-view" />;
              
                return <Col md={8}>
                  <GenreView genre={genres.find(g => g.Name === match.params.name)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
              
              {/* route for link on main-view to profile-view */}
              <Route path="/users/:username" render={({match, history}) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>

                // Before the movies have been loaded
                if (dramas.length === 0) return <div className="main-view" />; 
                
                return <Col>
                  <ProfileView user={user.find(u => u.username === match.params.username).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              <Route path="/user-update/:username" render={({match, history}) => {
                if (!user) return <Redirect to="/" />
                return <Col>
                  <UserUpdate user={user.find(u => u.username === match.params.username).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }} />
            </Row>
          </Container>
        </Router>
      );
  }
}

export default MainView;