'use client';

import { CustomerForm } from '@/modules/customers/components/CustomerForm';
import { useCreateCustomer } from '@/modules/customers/hooks/useCreateCustomer';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function CreateCustomerPage() {
  const { mutate, isLoading, error } = useCreateCustomer();
  const router = useRouter();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Customer</h1>
          <p className="text-gray-500">Add a new customer to your system.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to create customer. Please check the inputs and try again.
        </div>
      )}

      <CustomerForm onSubmit={mutate} isLoading={isLoading} />
    </div>
  );
}
