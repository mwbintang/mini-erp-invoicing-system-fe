'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreateCustomerDto } from '../types/customer.types';
import { useRouter } from 'next/navigation';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

interface CustomerFormProps {
  initialData?: CreateCustomerDto;
  onSubmit: (data: CreateCustomerDto) => Promise<any>;
  isLoading?: boolean;
}

export function CustomerForm({ initialData, onSubmit, isLoading }: CustomerFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCustomerDto>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name *</label>
          <Input {...register('name')} disabled={isLoading} placeholder="John Doe" />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email *</label>
          <Input {...register('email')} type="email" disabled={isLoading} placeholder="john@example.com" />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input {...register('phone')} disabled={isLoading} placeholder="+1 234 567 890" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <Input {...register('address')} disabled={isLoading} placeholder="123 Main St, City" />
        </div>
      </div>

      <div className="flex justify-end space-x-4 border-t pt-4">
        <Button variant="outline" type="button" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Customer'}
        </Button>
      </div>
    </form>
  );
}
