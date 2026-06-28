import { useState } from 'react';
import { customersService } from '../services/customers.service';
import { CreateCustomerDto } from '../types/customer.types';
import { useRouter } from 'next/navigation';

export function useCreateCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const mutate = async (data: CreateCustomerDto) => {
    try {
      setIsLoading(true);
      setError(null);
      await customersService.createCustomer(data);
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
