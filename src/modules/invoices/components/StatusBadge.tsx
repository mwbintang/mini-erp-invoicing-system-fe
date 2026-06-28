import { InvoiceStatus } from '../types/invoice.types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  [InvoiceStatus.DRAFT]: { label: 'Draft', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  [InvoiceStatus.SENT]: { label: 'Sent', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  [InvoiceStatus.PAID]: { label: 'Paid', className: 'bg-green-50 text-green-700 border-green-200' },
  [InvoiceStatus.OVERDUE]: { label: 'Overdue', className: 'bg-red-50 text-red-700 border-red-200' },
  [InvoiceStatus.CANCELLED]: { label: 'Cancelled', className: 'bg-orange-50 text-orange-700 border-orange-200' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig[InvoiceStatus.DRAFT];
  
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', config.className)}>
      {config.label}
    </span>
  );
}
