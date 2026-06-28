import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { DashboardSummary } from '../types/dashboard.types';

export function useDashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const summary = await dashboardService.getSummary();
        if (mounted) setData(summary);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchDashboard();
    return () => { mounted = false; };
  }, []);

  return { data, isLoading, error };
}
