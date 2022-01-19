import {combineReducers} from 'redux';
import {SET_DRAMAS, SET_GENRES, SET_FILTER, SET_USER} from '../actions/actions';

function dramas(state = [], action) {
  switch (action.type) {
    case SET_DRAMAS:
      return action.value;
    default:
      return state;
  }
}

function genres(state = '', action) {
  switch (action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
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