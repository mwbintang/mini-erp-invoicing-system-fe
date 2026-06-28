'use client';

import { useCustomer } from '@/modules/customers/hooks/useCustomer';
import { CustomerCard } from '@/modules/customers/components/CustomerCard';
import { ArrowLeft, Edit } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useCustomer(id);
  const router = useRouter();

  if (isLoading) {
    return <div className="flex justify-center p-12"><Spinner size="lg" /></div>;
  }

  if (error || !data) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
          Failed to load customer details.
        </div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Customer Details</h1>
        </div>
        <Button onClick={() => router.push(`/customers/${id}/edit`)} className="flex items-center gap-2">
          <Edit className="h-4 w-4" /> Edit
        </Button>
      </div>

      <CustomerCard customer={data} />
    </div>
  );
}
