import axios from 'axios';

// API base URL configuration using Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for inserting JWT token if stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wayfindyou_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and handle session expiry gracefully
      localStorage.removeItem('wayfindyou_token');
    }
    return Promise.reject(error);
  }
);

export default api;
