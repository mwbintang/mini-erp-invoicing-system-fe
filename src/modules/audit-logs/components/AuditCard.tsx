import { AuditLog } from '../types/audit-log.types';

import { AuditJsonViewer } from './AuditJsonViewer';

export function AuditCard({ log }: { log: AuditLog }) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Action</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">{log.action.replace('_', ' ')}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
          <p className="mt-1 text-gray-900">{new Date(log.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">User</h3>
          <p className="mt-1 text-gray-900">{log.user?.name || 'System'} ({log.user?.email || 'N/A'}) - {typeof log.user?.role === 'object' ? (log.user.role as any)?.name : (log.user?.role || 'System')}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Entity</h3>
          <p className="mt-1 text-gray-900 capitalize">{typeof log.entityType === 'object' ? (log.entityType as any)?.name : log.entityType} <span className="text-gray-400 text-sm">({log.entityId})</span></p>
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-md font-medium text-gray-900">Changes</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AuditJsonViewer title="Old Value" data={log.oldValue} />
          <AuditJsonViewer title="New Value" data={log.newValue} />
        </div>
      </div>
    </div>
  );
}
