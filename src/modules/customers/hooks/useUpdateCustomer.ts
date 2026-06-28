import { useState } from 'react';
import { customersService } from '../services/customers.service';
import { UpdateCustomerDto } from '../types/customer.types';
import { useRouter } from 'next/navigation';

export function useUpdateCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const mutate = async (id: string, data: UpdateCustomerDto) => {
    try {
      setIsLoading(true);
      setError(null);
      await customersService.updateCustomer(id, data);
      router.push('/customers');
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
