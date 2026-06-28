import { useState } from 'react';
import { invoicesService } from '../services/invoices.service';

export function useDeleteInvoice(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await invoicesService.deleteInvoice(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
