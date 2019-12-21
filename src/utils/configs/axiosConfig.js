import axios from 'axios';
import store from '../../index';

const api = axios.create();

setTimeout(() => {
  const { authToken } = store.getState();

  api.defaults.baseURL = process.env.REACT_APP_API_URL;

  updateToken(authToken);
}, 0); // Pushing this to the end of the call stack in order for the store to initialize

export const updateToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;