export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  requestId: string;
}
