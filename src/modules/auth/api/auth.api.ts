import axiosInstance from '@/lib/axios';
import { ENDPOINTS } from '@/config/api';
import { LoginPayload, AuthResponse, User } from '../types/auth.types';

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return axiosInstance.post<any, any>(ENDPOINTS.AUTH.LOGIN, payload);
  },
  logout: async (refreshToken: string): Promise<void> => {
    return axiosInstance.post('/auth/logout', { refreshToken });
  },
  getProfile: async (): Promise<User> => {
    return axiosInstance.get<any, User>('/auth/me');
  }
};
