import { invoicesApi } from '../api/invoices.api';
import { PaginatedResponse } from '@/modules/customers/types/customer.types';
import { 
  Invoice, 
  GetInvoicesQuery, 
  CreateInvoiceDto, 
  UpdateInvoiceDto, 
  UpdateInvoiceStatusDto 
} from '../types/invoice.types';

export const invoicesService = {
  getInvoices: async (query?: GetInvoicesQuery): Promise<PaginatedResponse<Invoice>> => {
    return invoicesApi.getAll({
      page: query?.page || 1,
      limit: query?.limit || 10,
      search: query?.search || '',
      status: query?.status,
      sortBy: query?.sortBy || 'createdAt',
      order: query?.order || 'desc',
    });
  },

  getInvoice: async (id: string): Promise<Invoice> => {
    if (!id) throw new Error('Invoice ID is required');
    return invoicesApi.getById(id);
  },

  createInvoice: async (data: CreateInvoiceDto): Promise<Invoice> => {
    return invoicesApi.create(data);
  },

  updateInvoice: async (id: string, data: UpdateInvoiceDto): Promise<Invoice> => {
    if (!id) throw new Error('Invoice ID is required');
    return invoicesApi.update(id, data);
  },

  updateInvoiceStatus: async (id: string, status: UpdateInvoiceStatusDto): Promise<Invoice> => {
    if (!id) throw new Error('Invoice ID is required');
    return invoicesApi.updateStatus(id, status);
  },

  deleteInvoice: async (id: string): Promise<void> => {
    if (!id) throw new Error('Invoice ID is required');
    return invoicesApi.delete(id);
  },
};
