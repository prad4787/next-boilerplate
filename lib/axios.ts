import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from '@/store/store';
import { logout, setCredentials } from '@/store/slices/authSlice';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const MAX_RETRIES = 5;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: number };
    
    // Initialize retry count
    if (!originalRequest._retry) {
      originalRequest._retry = 0;
    }

    // Handle network errors or timeouts with retry logic
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      if (originalRequest._retry < MAX_RETRIES) {
        originalRequest._retry++;
        const delayMs = Math.min(1000 * Math.pow(2, originalRequest._retry), 10000);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        return axiosInstance(originalRequest);
      }
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken && !originalRequest.url?.includes('refresh-token')) {
        try {
          const response = await axiosInstance.post('/auth/refresh-token', {
            refreshToken,
          });
          
          const { accessToken, user } = response.data;
          localStorage.setItem('accessToken', accessToken);
          
          // Update store
          store.dispatch(setCredentials({ 
            user,
            token: accessToken 
          }));
          
          // Retry original request
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh token is invalid, logout user
          store.dispatch(logout());
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
        }
      } else {
        // No refresh token available, logout user
        store.dispatch(logout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);
