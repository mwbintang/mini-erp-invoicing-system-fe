import axiosInstance from '@/lib/api/axios';
import { DashboardSummary } from '../types/dashboard.types';

export const dashboardApi = {
  getSummary: async (): Promise<DashboardSummary> => {
    return axiosInstance.get('/dashboard/summary');
  },
};
