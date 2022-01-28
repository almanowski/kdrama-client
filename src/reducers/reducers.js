import {combineReducers} from 'redux';
import * as actions from '../actions/actions';

function dramas(state = [], action) {
  switch (action.type) {
    case actions.SET_DRAMAS:
      return action.value;
    default:
      return state;
  }
}

function genres(state = '', action) {
  switch (action.type) {
    case actions.SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case actions.SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case actions.SET_USER:
      return action.value;
    default:
      return state;
  }
}

const dramasApp = combineReducers({
  visibilityFilter,
  dramas,
  genres,
  user
});

export default dramasApp;