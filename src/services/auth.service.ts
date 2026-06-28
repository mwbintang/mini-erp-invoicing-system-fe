import axiosInstance from '@/lib/axios';
import { ENDPOINTS } from '@/config/api';
import { LoginPayload, AuthResponse, User } from '@/types/auth';
import { useAuthStore } from '@/store/auth.store';

export const AuthService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<any, any>(ENDPOINTS.AUTH.LOGIN, payload);
    useAuthStore.getState().updateTokens(response.accessToken, response.refreshToken);
    
    // Now fetch profile since token is in store
    const user = await AuthService.getProfile();
    useAuthStore.getState().setAuth(user, response.accessToken, response.refreshToken);
    
    return { ...response, user };
  },

  logout: async (): Promise<void> => {
    try {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        await axiosInstance.post('/auth/logout', { refreshToken });
      }
    } finally {
      useAuthStore.getState().logout();
    }
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<any, User>('/auth/me');
    useAuthStore.getState().updateUser(response);
    return response;
  },
};
