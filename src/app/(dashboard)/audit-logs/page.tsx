'use client';

import { useState } from 'react';
import { useAuditLogs } from '@/modules/audit-logs/hooks/useAuditLogs';
import { AuditFilter } from '@/modules/audit-logs/components/AuditFilter';
import { AuditTable } from '@/modules/audit-logs/components/AuditTable';
import { AuditPagination } from '@/modules/audit-logs/components/AuditPagination';
import { Spinner } from '@/components/ui/Spinner';

export default function AuditLogsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ search: '', action: '', entityType: '' });

  const { data, isLoading, error } = useAuditLogs({
    page,
    limit: 10,
    ...filters
  });

  const handleFilterChange = (newFilters: { search: string; action: string; entityType: string }) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audit Logs</h1>
          <p className="text-gray-500">Track and monitor system activities.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <AuditFilter
          search={filters.search}
          action={filters.action}
          entityType={filters.entityType}
          onFilterChange={handleFilterChange}
        />
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to load audit logs. Please try again.
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <AuditTable logs={data?.data || []} />
          {data?.meta && (
            <AuditPagination
              currentPage={data.meta.page}
              totalPages={data.meta.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
