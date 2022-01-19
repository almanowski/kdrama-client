import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import dramasApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to budle ./index.scss
import './index.scss';

const store = createStore(dramasApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class kDramaApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
            <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells Reacht to render your app in the root DOM element
ReactDOM.render(React.createElement(kDramaApplication), container);
