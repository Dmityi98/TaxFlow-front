import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5026/api";

class ApiClient { 
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => {
        // Проверяем, что ответ соответствует нашему новому формату { isSuccess, data, error }
        if (response.data && typeof response.data.isSuccess === 'boolean') {
          if (response.data.isSuccess) {
            // Подменяем response.data на внутренний объект data
            // Теперь во всех сервисах response.data будет сразу содержать токены/данные
            response.data = response.data.data;
          } else {
            // Если бэкенд вернул 200 OK, но isSuccess: false (бизнес-ошибка)
            // Превращаем это в ошибку, чтобы в компонентах срабатывал catch
            return Promise.reject(new Error(response.data.error || 'Произошла ошибка на сервере'));
          }
        }
        return response;
      },
      async (error) => {
        

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            const response = await axios.post(`${API_BASE_URL}/user/refresh-token`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export default apiClient.getClient();
