import axios from 'axios';
import store from '../../index';
import history from './history';

const api = axios.create();

api.interceptors.response.use(undefined, error => {
  if (error?.response?.status === 401) {
    history.push('/login');
  }

  return Promise.reject(error);
});

setTimeout(() => {
  const { authUser } = store.getState();

  api.defaults.baseURL = process.env.REACT_APP_API_URL;

  updateToken(authUser?.token);
}, 0); // Pushing this to the end of the call stack in order for the store to initialize

export const updateToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;