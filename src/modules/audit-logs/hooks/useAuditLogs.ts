import { useState, useEffect } from 'react';
import { auditLogService } from '../services/audit-log.service';
import { AuditLog, PaginatedAuditLogResponse, GetAuditLogsQuery } from '../types/audit-log.types';

export function useAuditLogs(query: GetAuditLogsQuery = {}) {
  const [data, setData] = useState<PaginatedAuditLogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuditLogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await auditLogService.getAuditLogs(query);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query.page,
    query.limit,
    query.action,
    query.entityType,
    query.startDate,
    query.endDate,
    query.sortBy,
    query.order
  ]);

  return { data, isLoading, error, refetch: fetchAuditLogs };
}
