import axiosInstance from '@/lib/axios';
import { Customer, PaginatedResponse, GetCustomersQuery, CreateCustomerDto, UpdateCustomerDto } from '../types/customer.types';

export const customersApi = {
  getAll: async (params?: GetCustomersQuery): Promise<PaginatedResponse<Customer>> => {
    return axiosInstance.get('/customers', { params });
  },

  getById: async (id: string): Promise<Customer> => {
    return axiosInstance.get(`/customers/${id}`);
  },

  create: async (data: CreateCustomerDto): Promise<Customer> => {
    return axiosInstance.post('/customers', data);
  },

  update: async (id: string, data: UpdateCustomerDto): Promise<Customer> => {
    return axiosInstance.patch(`/customers/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return axiosInstance.delete(`/customers/${id}`);
  },
};
