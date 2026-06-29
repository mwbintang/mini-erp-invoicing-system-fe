'use client';

import { InvoiceForm } from '@/modules/invoices/components/InvoiceForm';
import { useInvoice } from '@/modules/invoices/hooks/useInvoice';
import { useUpdateInvoice } from '@/modules/invoices/hooks/useUpdateInvoice';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function EditInvoicePage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading: isFetching, error: fetchError } = useInvoice(id);
  const { mutate, isLoading: isUpdating, error: updateError } = useUpdateInvoice();

  const router = useRouter();

  if (isFetching) {
    return <div className="flex justify-center p-20"><Spinner size="lg" /></div>;
  }

  if (fetchError || !data) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 shadow-sm">
          Failed to load invoice.
        </div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Edit Invoice</h1>
          <p className="text-gray-500 mt-1">Update details for {data.invoiceNumber}</p>
        </div>
      </div>

      {updateError && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 shadow-sm">
          Failed to update invoice. Please check the inputs and try again.
        </div>
      )}

      <InvoiceForm
        initialData={{
          customerId: data.customerId,
          issueDate: new Date(data.issueDate).toISOString().split('T')[0],
          dueDate: new Date(data.dueDate).toISOString().split('T')[0],
          items: data.items.map(i => ({
            description: i.description,
            quantity: i.quantity,
            unitPrice: i.unitPrice
          })),
        }}
        onSubmit={(formData) => mutate(id, formData)}
        isLoading={isUpdating}
      />
    </div>
  );
}
