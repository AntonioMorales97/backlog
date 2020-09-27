import axios from 'axios';
import store from '../redux/store';
import { LOGOUT } from '../redux/actionTypes';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
