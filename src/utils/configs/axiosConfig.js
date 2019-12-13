import axios from 'axios';
import store from '../../index';

const api = axios.create();

setTimeout(() => {
  const { authToken } = store.getState();

  api.defaults.baseURL = process.env.REACT_APP_API_URL;

  if (authToken) {
    api.defaults.headers.common['Authorization'] = authToken;
  }
}, 0); // Pushing this to the end of the call stack in order for the store to initialize

export default api;