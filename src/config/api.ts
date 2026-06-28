import { ENV } from './env';

export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  CUSTOMERS: {
    BASE: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  INVOICES: {
    BASE: '/invoices',
    DETAIL: (id: string) => `/invoices/${id}`,
  },
};
