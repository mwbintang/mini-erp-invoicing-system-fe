import { Customer } from '../types/customer.types';
import { CustomerActionsDropdown } from './CustomerActionsDropdown';
import { EmptyTableState } from '@/components/ui/EmptyTableState';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CustomerTableProps {
  customers: Customer[];
  onDeleteClick: (customer: Customer) => void;
}

export function CustomerTable({ customers, onDeleteClick }: CustomerTableProps) {
  const router = useRouter();

  if (customers.length === 0) {
    return (
      <EmptyTableState
        icon={Users}
        title="No customers found"
        description="Get started by creating a new customer."
        actionLabel="Add Customer"
        onAction={() => router.push('/customers/create')}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {customers.map((customer) => (
              <tr key={customer.id} className="transition-colors hover:bg-gray-50/80">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.phone || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <CustomerActionsDropdown 
                    customerId={customer.id} 
                    onDeleteClick={() => onDeleteClick(customer)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
