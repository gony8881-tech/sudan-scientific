import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute - directory data changes infrequently
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

/**
 * Central place for query key factories, so cache keys stay consistent
 * across features and are easy to invalidate correctly.
 */
export const queryKeys = {
  countries: {
    all: ['countries'] as const,
    list: (filters?: unknown) => ['countries', 'list', filters] as const,
    detail: (id: string) => ['countries', 'detail', id] as const,
  },
  universities: {
    all: ['universities'] as const,
    list: (filters?: unknown) => ['universities', 'list', filters] as const,
    detail: (id: string) => ['universities', 'detail', id] as const,
  },
  journals: {
    all: ['journals'] as const,
    list: (filters?: unknown) => ['journals', 'list', filters] as const,
    detail: (id: string) => ['journals', 'detail', id] as const,
    search: (filters?: unknown) => ['journals', 'search', filters] as const,
  },
  profiles: {
    all: ['profiles'] as const,
    me: ['profiles', 'me'] as const,
    list: (filters?: unknown) => ['profiles', 'list', filters] as const,
  },
} as const;
