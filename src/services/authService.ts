import api from './api';
import { LoginCommand, RegisterCommand, LoginUserDto, RegisterUserDto } from '../types';

export const authService = {
  async login(credentials: LoginCommand): Promise<LoginUserDto> {
    const response = await api.post<LoginUserDto>('/Auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterCommand): Promise<RegisterUserDto> {
    const response = await api.post<RegisterUserDto>('/Auth/register', userData);
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await api.post('/Auth/refresh-token', { refreshToken });
    return response.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
};
