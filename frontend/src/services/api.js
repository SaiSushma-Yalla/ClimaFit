import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8085/api',
});

// Request Interceptor
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor (optional)
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; // force re-login
    }
    return Promise.reject(error);
  }
);

export default API;
