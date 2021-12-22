import React from 'react';
import axios from 'axios';
import {Col, Row} from 'react-bootstrap';

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {DramaCard} from '../drama-card/drama-card';
import {DramaView} from '../drama-view/drama-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      dramas: [],
      selectedDrama: null
    }
}

  componentDidMount(){
    axios.get('https://mykdrama-api.herokuapp.com/korean-dramas')
    .then(response => {
      this.setState({
        dramas: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  /* When a drama is clicked, this function is invoked and aupdate the state
  of the 'selecetDrama' property to that drama */

  setSelectedDrama(newSelectedDrama) {
    this.setState({
      selectedDrama: newSelectedDrama
    });
  }

  /* When a user successfully logs in, this function updates the 'user'
  property in state to that particular user */

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
      const {dramas, selectedDrama, user} = this.state;

      /*If there is no user, the LoginView is rendered. 
      If there is a user logged in, the user details are passed as a prop to the LoginView */
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      // Before the movies have been loaded
      if (dramas.length === 0) return <div className="main-view" />;

      return (
        <Row className="main-view justify-content-md-center">
        {/* If the state of 'selectedDrama' is not null, that selected drama will be returned otherwise,
        all dramas will be returned */}
          {selectedDrama
            ? (
              <Col md={8} className="drama-view-shell">
                <DramaView drama={selectedDrama} onBackClick={newSelectedDrama => {this.setSelectedDrama(newSelectedDrama); }} />
              </Col>
            )
            : dramas.map(drama => (
              <Col md={3} className='justify-content-md-center mt-5'>
                <DramaCard key={drama._id} drama={drama} onDramaClick={(newSelectedDrama) => {this.setSelectedDrama(newSelectedDrama)}} />
              </Col>
            )) 
          }
        </Row> 
      );
  }
}

export default MainView;