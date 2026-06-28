'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerTable } from '@/modules/customers/components/CustomerTable';
import { CustomerSearch } from '@/modules/customers/components/CustomerSearch';
import { CustomerPagination } from '@/modules/customers/components/CustomerPagination';
import { DeleteCustomerModal } from '@/modules/customers/components/DeleteCustomerModal';
import { useCustomers } from '@/modules/customers/hooks/useCustomers';
import { useDeleteCustomer } from '@/modules/customers/hooks/useDeleteCustomer';
import { Customer } from '@/modules/customers/types/customer.types';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';

export default function CustomersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const { data, isLoading, error, refetch } = useCustomers({ page, limit: 10, search });

  const { mutate: deleteCustomer, isLoading: isDeleting } = useDeleteCustomer(() => {
    setDeleteModalOpen(false);
    setCustomerToDelete(null);
    refetch();
  });

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete.id);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Customers</h1>
          <p className="text-gray-500">Manage your customers and clients.</p>
        </div>
        <Button onClick={() => router.push('/customers/create')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
        <CustomerSearch value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to load customers. Please try again.
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <CustomerTable customers={data?.data || []} onDeleteClick={handleDeleteClick} />
          {data?.meta && (
            <CustomerPagination
              currentPage={data.meta.page}
              totalPages={data.meta.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <DeleteCustomerModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        customerName={customerToDelete?.name}
      />
    </div>
  );
}
