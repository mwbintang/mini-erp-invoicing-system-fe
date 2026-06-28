'use client';

import { useAuditLog } from '@/modules/audit-logs/hooks/useAuditLog';
import { AuditCard } from '@/modules/audit-logs/components/AuditCard';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function AuditLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  // Unwrap the promise to access the id parameter
  const resolvedParams = use(params);
  const { data: log, isLoading, error } = useAuditLog(resolvedParams.id);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()} className="px-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audit Detail</h1>
          <p className="text-gray-500">View detailed information about this system event.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to load audit log details. Please try again.
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : log ? (
        <AuditCard log={log} />
      ) : (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
          Audit log not found.
        </div>
      )}
    </div>
  );
}
