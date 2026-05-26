import api from './api';
import { YearDTO } from '../types';

export const yearService = {
  async getYearById(id: string): Promise<YearDTO> {
    const response = await api.get<YearDTO>(`/years/${id}`);
    return response.data;
  },

  async createYear(nameTable: string): Promise<YearDTO> {
    const response = await api.post<YearDTO>('/years', { nameTable });
    return response.data;
  },

  async updateYear(yearId: string, nameTable: string, yearDto: YearDTO): Promise<boolean> {
    const response = await api.put<boolean>('/years', {
      yearId,
      nameTable,
      yearDto,
    });
    return response.data;
  },

  async getAllYears(): Promise<YearDTO[]> {
    try {
      const response = await api.get<YearDTO[]>('/years');
      const data = response.data;
      if (!Array.isArray(data)) {
        console.error('getAllYears: expected array, got:', data);
        return [];
      }
      return data;
    } catch (error: any) {
      console.error('getAllYears error:', error.response?.data || error.message);
      return [];
    }
  },
};
