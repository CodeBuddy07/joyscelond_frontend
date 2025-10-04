import axios from 'axios';

export const axiosSecure = axios.create({
  //baseURL: 'https://api.kutmasterz.com',
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000, // 100 seconds timeout
});

// Request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    // Add auth token if available (from localStorage)
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosSecure.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      localStorage.removeItem('Authorization');
      localStorage.removeItem('staffInfo');
      
      // Dispatch custom event for logout
      window.dispatchEvent(new CustomEvent('auth:logout'));
      
    }
    
    if (error.response?.status === 403) {
      // Handle forbidden - user might not be verified or lack permissions
      console.error('Access forbidden - insufficient permissions or unverified account');
    }
    
    if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error occurred:', error.response.data?.message || 'Internal server error');
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;