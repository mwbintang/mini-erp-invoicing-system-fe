import axiosInstance from '@/lib/api/axios';
import { GetAuditLogsQuery, PaginatedAuditLogResponse, AuditLog } from '../types/audit-log.types';

export const auditLogApi = {
  getAuditLogs: async (query: GetAuditLogsQuery = {}): Promise<PaginatedAuditLogResponse> => {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.action) params.append('action', query.action);
    if (query.entityType) params.append('entityType', query.entityType);
    if (query.startDate) params.append('startDate', query.startDate);
    if (query.endDate) params.append('endDate', query.endDate);
    if (query.sortBy) params.append('sortBy', query.sortBy);
    if (query.order) params.append('order', query.order);

    return axiosInstance.get(`/audit-logs?${params.toString()}`);
  },

  getAuditLogById: async (id: string): Promise<AuditLog> => {
    return axiosInstance.get(`/audit-logs/${id}`);
  },
};
