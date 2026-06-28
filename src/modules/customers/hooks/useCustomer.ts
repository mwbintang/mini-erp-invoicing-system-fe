import { useState, useEffect } from 'react';
import { customersService } from '../services/customers.service';
import { Customer } from '../types/customer.types';

export function useCustomer(id: string) {
  const [data, setData] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCustomer = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const result = await customersService.getCustomer(id);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { data, isLoading, error, refetch: fetchCustomer };
}
