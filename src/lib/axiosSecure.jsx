import axios from 'axios';

export const axiosSecure = axios.create({
  baseURL: 'https://api.kutmasterz.com',
  //baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000, // 100 seconds
});

axiosSecure.interceptors.request.use(
  (config) => {
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

axiosSecure.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('staffInfo');
      
      window.dispatchEvent(new CustomEvent('auth:logout'));
      
    }
    
    if (error.response?.status === 403) {
      console.error('Access forbidden - insufficient permissions or unverified account');
    }
    
    if (error.response?.status >= 500) {
      console.error('Server error occurred:', error.response.data?.message || 'Internal server error');
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;