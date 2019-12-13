import { AUTH_TOKEN_SET, AUTH_TOKEN_GET } from './actionTypes';

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