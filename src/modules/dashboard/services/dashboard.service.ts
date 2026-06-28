import { dashboardApi } from '../api/dashboard.api';
import { DashboardSummary } from '../types/dashboard.types';

export const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    try {
      return await dashboardApi.getSummary();
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error; // Re-throw to handle it in components or server pages
    }
  },
};
