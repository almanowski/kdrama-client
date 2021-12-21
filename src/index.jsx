import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import {Container, Navbar} from 'react-bootstrap';

// Import statement to indicate that you need to budle ./index.scss
import './index.scss';

// Main component (will eventually use all the others)
class kDramaApplication extends React.Component {
  render() {
    return (
      <>
        <Navbar variant="dark">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt="myDramas"
                  src={"https://dl.dropboxusercontent.com/s/j8gnxagz3ia496k/logo.svg?dl=0"}
                  crossOrigin ="anonymous"
                  height="50"
                  className="d-inline-block align-top"
                />{' '}
              </Navbar.Brand>
            </Container>
        </Navbar>

        <Container>
            <MainView />
        </Container>
      </>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells Reacht to render your app in the root DOM element
ReactDOM.render(React.createElement(kDramaApplication), container);
