export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  DASHBOARD: {
    HOME: '/dashboard',
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  INVOICES: {
    LIST: '/invoices',
    DETAIL: (id: string) => `/invoices/${id}`,
  },
};
