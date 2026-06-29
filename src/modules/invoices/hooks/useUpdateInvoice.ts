import { useState } from 'react';
import { invoicesService } from '../services/invoices.service';
import { UpdateInvoiceDto } from '../types/invoice.types';
import { useRouter } from 'next/navigation';

export function useUpdateInvoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const mutate = async (id: string, data: UpdateInvoiceDto) => {
    try {
      setIsLoading(true);
      setError(null);
      await invoicesService.updateInvoice(id, data);
      router.push(`/invoices`);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
