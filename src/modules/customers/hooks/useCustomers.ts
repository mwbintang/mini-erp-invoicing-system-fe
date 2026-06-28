import { useState, useEffect } from 'react';
import { customersService } from '../services/customers.service';
import { Customer, PaginatedResponse, GetCustomersQuery } from '../types/customer.types';

export function useCustomers(query: GetCustomersQuery = {}) {
  const [data, setData] = useState<PaginatedResponse<Customer> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await customersService.getCustomers(query);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.limit, query.search, query.sortBy, query.order]);

  return { data, isLoading, error, refetch: fetchCustomers };
}
