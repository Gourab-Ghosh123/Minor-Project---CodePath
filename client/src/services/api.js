import axios from 'axios';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    const trimmed = envUrl.trim().replace(/\/+$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  }
  // Default to deployed Render backend in production, or /api in development
  return import.meta.env.PROD
    ? 'https://minor-project-codepath.onrender.com/api'
    : '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('codepath_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        localStorage.removeItem('codepath_token');
        localStorage.removeItem('codepath_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
