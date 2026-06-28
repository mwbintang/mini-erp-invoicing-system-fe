import { useState, useEffect } from 'react';
import { invoicesService } from '../services/invoices.service';
import { Invoice } from '../types/invoice.types';

export function useInvoice(id: string) {
  const [data, setData] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvoice = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const result = await invoicesService.getInvoice(id);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { data, isLoading, error, refetch: fetchInvoice };
}
