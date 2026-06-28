import { customersApi } from '../api/customers.api';
import { Customer, PaginatedResponse, GetCustomersQuery, CreateCustomerDto, UpdateCustomerDto } from '../types/customer.types';

export const customersService = {
  getCustomers: async (query?: GetCustomersQuery): Promise<PaginatedResponse<Customer>> => {
    return customersApi.getAll({
      page: query?.page || 1,
      limit: query?.limit || 10,
      search: query?.search || '',
      sortBy: query?.sortBy || 'createdAt',
      order: query?.order || 'desc',
    });
  },

  getCustomer: async (id: string): Promise<Customer> => {
    if (!id) throw new Error('Customer ID is required');
    return customersApi.getById(id);
  },

  createCustomer: async (data: CreateCustomerDto): Promise<Customer> => {
    return customersApi.create(data);
  },

  updateCustomer: async (id: string, data: UpdateCustomerDto): Promise<Customer> => {
    if (!id) throw new Error('Customer ID is required');
    return customersApi.update(id, data);
  },

  deleteCustomer: async (id: string): Promise<void> => {
    if (!id) throw new Error('Customer ID is required');
    return customersApi.delete(id);
  },
};
