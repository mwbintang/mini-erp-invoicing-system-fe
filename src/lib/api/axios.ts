import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import toast from 'react-hot-toast';
import { ApiError } from '../types/api.types';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Automatically unwrap the response.data.data
    // since the backend wraps it in { success: true, data: { ... } }
    if (response.data && response.data.success && response.data.data !== undefined) {
      // If the response is paginated (has meta), we need to reconstruct { data, meta }
      // because the frontend hooks expect the full paginated response structure.
      if (response.data.meta !== undefined) {
        return {
          data: response.data.data,
          meta: response.data.meta
        };
      }
      return response.data.data;
    }
    // Fallback if the endpoint does not wrap in ApiResponse
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const responseBody = error.response?.data as ApiError | undefined;
    const requestId = responseBody?.requestId || error.response?.headers?.['x-request-id'] || 'unknown';

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) throw new Error('No refresh token');

        const res = await fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) throw new Error('Refresh failed');
        // Assuming refresh returns the unwrapped { accessToken, refreshToken } directly or wrapped in data
        const refreshData = await res.json();
        const tokens = refreshData.success && refreshData.data ? refreshData.data : refreshData;

        useAuthStore.getState().updateTokens(tokens.accessToken, tokens.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Centralized API Error Handling
    if (typeof window !== 'undefined') {
      const statusCode = error.response?.status;
      const message = responseBody?.message || error.message || 'An unexpected error occurred';
      
      switch (statusCode) {
        case 401:
          // Handled above for retry, but if refresh fails, it might end up here
          toast.error('Session expired. Please log in again.');
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('The requested resource was not found.');
          break;
        case 409:
          toast.error(`Conflict: ${message}`);
          break;
        case 422:
          toast.error(`Validation Error: ${message}`);
          break;
        case 500:
        default:
          toast.error(`Something went wrong.\nReference ID: ${requestId}`);
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
