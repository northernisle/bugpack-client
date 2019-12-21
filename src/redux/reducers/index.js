import { combineReducers } from 'redux';
import { AUTH_TOKEN_SET, AUTH_TOKEN_GET, AUTH_TOKEN_REMOVE } from '../actions/actionTypes';
import { updateToken } from '../../utils/configs/axiosConfig';

const authTokenReducer = (authToken = null, action) => {
  switch (action.type) {
    case AUTH_TOKEN_SET:
      const token = action.payload;
      window.localStorage.setItem('authToken', token);
      updateToken(token);
      return token;
    case AUTH_TOKEN_GET:
      return authToken || window.localStorage.getItem('authToken');
    case AUTH_TOKEN_REMOVE:
      window.localStorage.removeItem('authToken');
      updateToken(action.payloads);
      return action.payload;
    default:
      return authToken;
  }
}

export default combineReducers({
  authToken: authTokenReducer
});