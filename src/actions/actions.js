export const SET_DRAMAS = 'SET_DRAMAS';
export const SET_GENRES = 'SET_GENRES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';


export function setDramas(value) {
  return {
    type: SET_DRAMAS,
    value};
}

export function setGenres(value) {
  return {
    type: SET_GENRES,
    value
  }
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  }
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  }
}
