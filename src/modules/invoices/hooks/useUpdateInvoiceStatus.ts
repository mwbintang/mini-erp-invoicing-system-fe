import { useState } from 'react';
import { invoicesService } from '../services/invoices.service';
import { UpdateInvoiceStatusDto } from '../types/invoice.types';

export function useUpdateInvoiceStatus(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: UpdateInvoiceStatusDto) => {
    try {
      setIsLoading(true);
      setError(null);
      await invoicesService.updateInvoiceStatus(id, data);
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
