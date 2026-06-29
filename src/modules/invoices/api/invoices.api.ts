import axiosInstance from '@/lib/api/axios';
import { PaginatedResponse } from '@/modules/customers/types/customer.types';
import { 
  Invoice, 
  GetInvoicesQuery, 
  CreateInvoiceDto, 
  UpdateInvoiceDto, 
  UpdateInvoiceStatusDto 
} from '../types/invoice.types';

export const invoicesApi = {
  getAll: async (params?: GetInvoicesQuery): Promise<PaginatedResponse<Invoice>> => {
    return axiosInstance.get('/invoices', { params });
  },

  getById: async (id: string): Promise<Invoice> => {
    return axiosInstance.get(`/invoices/${id}`);
  },

  create: async (data: CreateInvoiceDto): Promise<Invoice> => {
    return axiosInstance.post('/invoices', data);
  },

  update: async (id: string, data: UpdateInvoiceDto): Promise<Invoice> => {
    return axiosInstance.patch(`/invoices/${id}`, data);
  },

  updateStatus: async (id: string, data: UpdateInvoiceStatusDto): Promise<Invoice> => {
    return axiosInstance.patch(`/invoices/${id}/status`, data);
  },

  delete: async (id: string): Promise<void> => {
    return axiosInstance.delete(`/invoices/${id}`);
  },
};
