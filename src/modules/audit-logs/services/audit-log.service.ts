import { auditLogApi } from '../api/audit-log.api';
import { GetAuditLogsQuery } from '../types/audit-log.types';

export const auditLogService = {
  getAuditLogs: async (query?: GetAuditLogsQuery) => {
    try {
      return await auditLogApi.getAuditLogs(query);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      throw error;
    }
  },

  getAuditLogById: async (id: string) => {
    try {
      return await auditLogApi.getAuditLogById(id);
    } catch (error) {
      console.error(`Error fetching audit log ${id}:`, error);
      throw error;
    }
  }
};
