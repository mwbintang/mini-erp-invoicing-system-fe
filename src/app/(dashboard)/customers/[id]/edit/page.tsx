'use client';

import { CustomerForm } from '@/modules/customers/components/CustomerForm';
import { useCustomer } from '@/modules/customers/hooks/useCustomer';
import { useUpdateCustomer } from '@/modules/customers/hooks/useUpdateCustomer';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function EditCustomerPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { data, isLoading: isFetching, error: fetchError } = useCustomer(id);
  const { mutate, isLoading: isUpdating, error: updateError } = useUpdateCustomer();
  
  const router = useRouter();

  if (isFetching) {
    return <div className="flex justify-center p-12"><Spinner size="lg" /></div>;
  }

  if (fetchError || !data) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to load customer.
        </div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Customer</h1>
          <p className="text-gray-500">Update details for {data.name}</p>
        </div>
      </div>

      {updateError && (
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to update customer. Please check the inputs and try again.
        </div>
      )}

      <CustomerForm 
        initialData={{
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
        }} 
        onSubmit={(formData) => mutate(id, formData)} 
        isLoading={isUpdating} 
      />
    </div>
  );
}
