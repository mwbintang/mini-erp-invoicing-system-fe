'use client';

import { InvoiceForm } from '@/modules/invoices/components/InvoiceForm';
import { useCreateInvoice } from '@/modules/invoices/hooks/useCreateInvoice';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function CreateInvoicePage() {
  const { mutate, isLoading, error } = useCreateInvoice();
  const router = useRouter();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Create Invoice</h1>
          <p className="text-gray-500 mt-1">Generate a new invoice for a customer.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 shadow-sm">
          Failed to create invoice. Please check the inputs and try again.
        </div>
      )}

      <InvoiceForm onSubmit={mutate} isLoading={isLoading} />
    </div>
  );
}
