import { Customer, PaginatedResponse, PaginationMeta } from '@/modules/customers/types/customer.types';

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export interface InvoiceItem {
  id: string;
  invoiceId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customer?: Customer;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  totalAmount: number;
  integrityHash?: string;
  createdAt: string;
  updatedAt: string;
  items: InvoiceItem[];
}

export interface GetInvoicesQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: InvoiceStatus;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface CreateInvoiceItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateInvoiceDto {
  customerId: string;
  issueDate: string;
  dueDate: string;
  items: CreateInvoiceItemDto[];
}

export interface UpdateInvoiceDto {
  customerId?: string;
  issueDate?: string;
  dueDate?: string;
  items?: CreateInvoiceItemDto[];
}

export interface UpdateInvoiceStatusDto {
  status: InvoiceStatus;
}
