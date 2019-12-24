import {
  AUTH_USER_SET,
  AUTH_USER_GET,
  AUTH_USER_REMOVE
} from './actionTypes';
import axios from '../../utils/configs/axiosConfig';

const asyncAction = async (dispatch, actionType, requestCallback) => {
  dispatch({
    type: actionType,
    status: 'pending',
  });

  let response = null;
  let error = null;
  let status = null;

  try {
    ({ data: response } = await requestCallback());

    status = 'success';
  } catch (e) {
    error = e;
    status = 'error';
  }

  dispatch({
    type: actionType,
    status,
    error,
    response
  });
}

export const loginUser = ({ email, password, rememberMe }) => async dispatch => {
  asyncAction(dispatch, AUTH_USER_SET, () => {
    return axios.post('users/login', {
      email,
      password,
      rememberMe
    });
  });
}

export const registerUser = ({ username, email, password }) => async dispatch => {
  asyncAction(dispatch, AUTH_USER_SET, () => {
    return axios.post('users', {
      name: username,
      email,
      password
    });
  });
}

export const getAuthUser = () => {
  return {
    type: AUTH_USER_GET,
    payload: null
  }
}

export const removeAuthUser = () => async dispatch => {
  asyncAction(dispatch, AUTH_USER_REMOVE, () => {
    return axios.get('/users/logout');
  });
}