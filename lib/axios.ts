import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from '@/store/store';
import { logout, setCredentials } from '@/store/slices/authSlice';
import { formatUrl } from '@/helpers/url.helper';
import { toast } from '@/hooks/use-toast';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const MAX_RETRIES = 5;

export const axiosInstance = axios.create({
  baseURL: formatUrl(BASE_URL),
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
  async (response) => {
    if (response.status === 200) {
      // Only show success toast for mutations (POST, PUT, DELETE)
      if (['POST', 'PUT', 'DELETE'].includes(response.config.method?.toUpperCase() || '')) {
        toast({
          title: 'Success',
          description: 'Operation completed successfully',
          variant: 'default',
        });
      }
      return response.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: number };

    // Handle specific error cases
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
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
            toast({
              title: 'Session Expired',
              description: 'Please login again',
              variant: 'destructive',
            });
            window.location.href = '/auth/login';
          }
        } else {
          // No refresh token available, logout user
          store.dispatch(logout());
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          toast({
            title: 'Authentication Error',
            description: 'Please login to continue',
            variant: 'destructive',
          });
          window.location.href = '/auth/login';
        }
      } else {
        // Handle other errors
        const errorMessage = (error.response.data as { message: string })?.message || 'Something went wrong';
        toast({
          title: error.response.status === 422 ? 'Validation Error' : 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } else if (error.request) {
      toast({
        title: 'Network Error',
        description: 'Please check your internet connection',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }
);
