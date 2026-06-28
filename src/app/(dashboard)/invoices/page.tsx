'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InvoiceTable } from '@/modules/invoices/components/InvoiceTable';
import { InvoiceSearch } from '@/modules/invoices/components/InvoiceSearch';
import { InvoiceFilter } from '@/modules/invoices/components/InvoiceFilter';
import { CustomerPagination } from '@/modules/customers/components/CustomerPagination'; // Reuse pagination component
import { DeleteInvoiceModal } from '@/modules/invoices/components/DeleteInvoiceModal';
import { useInvoices } from '@/modules/invoices/hooks/useInvoices';
import { useDeleteInvoice } from '@/modules/invoices/hooks/useDeleteInvoice';
import { Invoice, InvoiceStatus } from '@/modules/invoices/types/invoice.types';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';

export default function InvoicesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<InvoiceStatus | undefined>(undefined);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);

  const { data, isLoading, error, refetch } = useInvoices({ page, limit: 10, search, status });
  
  const { mutate: deleteInvoice, isLoading: isDeleting } = useDeleteInvoice(() => {
    setDeleteModalOpen(false);
    setInvoiceToDelete(null);
    refetch();
  });

  const handleDeleteClick = (invoice: Invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (invoiceToDelete) {
      deleteInvoice(invoiceToDelete.id);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Invoices</h1>
          <p className="mt-1 text-base text-gray-500">Manage your billing and invoices.</p>
        </div>
        <Button onClick={() => router.push('/invoices/create')} className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all px-5 py-2.5">
          <Plus className="h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-full sm:w-auto">
          <InvoiceSearch value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
        </div>
        <div className="w-full sm:w-48">
          <InvoiceFilter value={status} onChange={(val) => { setStatus(val); setPage(1); }} />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 shadow-sm">
          Failed to load invoices. Please try again.
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <InvoiceTable invoices={data?.data || []} onDeleteClick={handleDeleteClick} />
          {data?.meta && data.meta.totalPages > 1 && (
            <CustomerPagination 
              currentPage={data.meta.page} 
              totalPages={data.meta.totalPages} 
              onPageChange={setPage} 
            />
          )}
        </>
      )}

      <DeleteInvoiceModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        invoiceNumber={invoiceToDelete?.invoiceNumber}
      />
    </div>
  );
}
