import { useState } from 'react';
import { invoicesService } from '../services/invoices.service';
import { CreateInvoiceDto } from '../types/invoice.types';
import { useRouter } from 'next/navigation';

export function useCreateInvoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const mutate = async (data: CreateInvoiceDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await invoicesService.createInvoice(data);
      router.push(`/invoices`);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
