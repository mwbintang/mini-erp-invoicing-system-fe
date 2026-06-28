import { AuditLog } from '../types/audit-log.types';
import { DataTable } from '@/components/ui/DataTable';
import { useRouter } from 'next/navigation';


interface AuditTableProps {
  logs: AuditLog[];
}

export function AuditTable({ logs }: AuditTableProps) {
  const router = useRouter();

  const columns = [
    {
      key: 'createdAt',
      label: 'Timestamp',
      render: (log: AuditLog) => new Date(log.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    },
    {
      key: 'user',
      label: 'User',
      render: (log: AuditLog) => (
        <div>
          <div className="font-medium">{log.user?.name || 'System'}</div>
          <div className="text-xs text-gray-500">{log.user?.email || '-'}</div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (log: AuditLog) => (
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {typeof log.user?.role === 'object' ? (log.user.role as any)?.name : (log.user?.role || 'System')}
        </span>
      )
    },
    {
      key: 'action',
      label: 'Action',
      render: (log: AuditLog) => (
        <span className="font-medium text-gray-700 capitalize">{log.action.replace('_', ' ')}</span>
      )
    },
    {
      key: 'entityType',
      label: 'Entity Type',
      render: (log: AuditLog) => <span className="capitalize">{typeof log.entityType === 'object' ? (log.entityType as any)?.name : log.entityType}</span>
    },
    {
      key: 'actions',
      label: '',
      render: (log: AuditLog) => (
        <button
          onClick={() => router.push(`/audit-logs/${log.id}`)}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          View Details
        </button>
      )
    }
  ];

  return <DataTable data={logs} columns={columns} />;
}
