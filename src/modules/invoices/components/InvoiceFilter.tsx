import { InvoiceStatus } from '../types/invoice.types';

interface InvoiceFilterProps {
  value?: InvoiceStatus;
  onChange: (status?: InvoiceStatus) => void;
}

export function InvoiceFilter({ value, onChange }: InvoiceFilterProps) {
  return (
    <select
      className="block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      value={value || ''}
      onChange={(e) => onChange(e.target.value ? (e.target.value as InvoiceStatus) : undefined)}
    >
      <option value="">All Statuses</option>
      <option value={InvoiceStatus.DRAFT}>Draft</option>
      <option value={InvoiceStatus.SENT}>Sent</option>
      <option value={InvoiceStatus.PAID}>Paid</option>
      <option value={InvoiceStatus.OVERDUE}>Overdue</option>
      <option value={InvoiceStatus.CANCELLED}>Cancelled</option>
    </select>
  );
}
