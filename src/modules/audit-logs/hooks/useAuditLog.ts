import { useState, useEffect } from 'react';
import { auditLogService } from '../services/audit-log.service';
import { AuditLog } from '../types/audit-log.types';

export function useAuditLog(id: string) {
  const [data, setData] = useState<AuditLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAuditLog = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const result = await auditLogService.getAuditLogById(id);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLog();
  }, [id]);

  return { data, isLoading, error };
}
