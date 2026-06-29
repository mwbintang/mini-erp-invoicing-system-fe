import { ENV } from '@/config/env';

export const API_VERSION = 'v1';
export const API_PREFIX = `/${API_VERSION}`;

export const API_CONFIG = {
  BASE_URL: `${ENV.API_URL}${API_PREFIX}`,
  RAW_BASE_URL: ENV.API_URL, // In case we need the base url without prefix
  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
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
