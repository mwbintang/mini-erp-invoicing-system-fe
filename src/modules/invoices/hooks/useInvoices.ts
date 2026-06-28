import { useState, useEffect } from 'react';
import { invoicesService } from '../services/invoices.service';
import { Invoice, GetInvoicesQuery } from '../types/invoice.types';
import { PaginatedResponse } from '@/modules/customers/types/customer.types';

export function useInvoices(query: GetInvoicesQuery = {}) {
  const [data, setData] = useState<PaginatedResponse<Invoice> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await invoicesService.getInvoices(query);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.limit, query.search, query.status, query.sortBy, query.order]);

  return { data, isLoading, error, refetch: fetchInvoices };
}
