export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortParams {
  column: string;
  direction: SortDirection;
}

export interface SearchFilters {
  query?: string;
  countryId?: string;
  universityId?: string;
  specialization?: string;
  issn?: string;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';
