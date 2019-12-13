import { combineReducers } from 'redux';
import { AUTH_TOKEN_SET, AUTH_TOKEN_GET } from '../actions/actionTypes';

const authTokenReducer = (authToken = null, action) => {
  switch (action.type) {
    case AUTH_TOKEN_SET:
      window.localStorage.setItem('authToken', action.payload);
      return action.payload;
    case AUTH_TOKEN_GET:
      return authToken || window.localStorage.getItem('authToken');
    default:
      return authToken;
  }
}

export default combineReducers({
  authToken: authTokenReducer
});