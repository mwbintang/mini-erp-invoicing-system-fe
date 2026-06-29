'use client';

import { useInvoice } from '@/modules/invoices/hooks/useInvoice';
import { InvoiceSummaryCard } from '@/modules/invoices/components/InvoiceSummaryCard';
import { ArrowLeft, Edit } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useUpdateInvoiceStatus } from '@/modules/invoices/hooks/useUpdateInvoiceStatus';
import { InvoiceStatus } from '@/modules/invoices/types/invoice.types';

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error, refetch } = useInvoice(id);
  const router = useRouter();

  const { mutate: updateStatus, isLoading: isUpdatingStatus } = useUpdateInvoiceStatus(() => {
    router.push('/invoices');
  });

  if (isLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (error || !data) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 shadow-sm">
          Failed to load invoice details.
        </div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Invoice Details</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            className="block rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            value={data.status}
            disabled={isUpdatingStatus}
            onChange={(e) => updateStatus(id, { status: e.target.value as InvoiceStatus })}
          >
            <option value={InvoiceStatus.DRAFT}>Draft</option>
            <option value={InvoiceStatus.SENT}>Sent</option>
            <option value={InvoiceStatus.PAID}>Paid</option>
            <option value={InvoiceStatus.OVERDUE}>Overdue</option>
            <option value={InvoiceStatus.CANCELLED}>Cancelled</option>
          </select>

          <Button 
            onClick={() => router.push(`/invoices/${id}/edit`)} 
            variant="outline"
            className="flex items-center gap-2 rounded-xl"
          >
            <Edit className="h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <InvoiceSummaryCard invoice={data} />
    </div>
  );
}
