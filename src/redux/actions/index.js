import { AUTH_TOKEN_SET, AUTH_TOKEN_GET, AUTH_TOKEN_REMOVE } from './actionTypes';
import axios from '../../utils/configs/axiosConfig';

export const setAuthToken = (token) => {
  return {
    type: AUTH_TOKEN_SET,
    payload: token
  }
}

export const getAuthToken = () => {
  return {
    type: AUTH_TOKEN_GET,
    payload: null
  }
}

export const removeAuthToken = () => async dispatch => {
  await axios.get('/users/logout');

  dispatch({
    type: AUTH_TOKEN_REMOVE,
    payload: null
  });
}