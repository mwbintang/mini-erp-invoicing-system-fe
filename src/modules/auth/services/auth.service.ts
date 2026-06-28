import { authApi } from '../api/auth.api';
import { LoginPayload, AuthResponse, User } from '../types/auth.types';
import { useAuthStore } from '../store/auth.store';

export const AuthService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await authApi.login(payload);
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
        await authApi.logout(refreshToken);
      }
    } finally {
      useAuthStore.getState().logout();
    }
  },

  getProfile: async (): Promise<User> => {
    const user = await authApi.getProfile();
    useAuthStore.getState().updateUser(user);
    return user;
  },
};
