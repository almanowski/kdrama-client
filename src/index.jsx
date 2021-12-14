import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that you need to budle ./index.scss
import './index.scss';

// Main component (will eventually use all the others)
class kDramaApplication extends React.Component {
    render() {
        return (
            <div className="kdrama">
                <div>Good morning</div>
            </div>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells Reacht to render your app in the root DOM element
ReactDOM.render(React.createElement(kDramaApplication), container);
