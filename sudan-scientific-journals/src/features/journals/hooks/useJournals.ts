import { useQuery } from '@tanstack/react-query';
import { journalsService } from '../services/journalsService';
import type { JournalFilters } from '../types';

export const JOURNAL_QUERY_KEYS = {
  all: ['journals'] as const,
  lists: () => [...JOURNAL_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: JournalFilters) => [...JOURNAL_QUERY_KEYS.lists(), filters] as const,
  latest: (limit: number) => [...JOURNAL_QUERY_KEYS.all, 'latest', limit] as const,
  detail: (id: string) => [...JOURNAL_QUERY_KEYS.all, 'detail', id] as const,
  specializations: () => [...JOURNAL_QUERY_KEYS.all, 'specializations'] as const,
  stats: () => [...JOURNAL_QUERY_KEYS.all, 'stats'] as const,
};

export function useJournals(filters?: JournalFilters) {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.list(filters),
    queryFn: () => journalsService.getJournals(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLatestJournals(limit = 6) {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.latest(limit),
    queryFn: () => journalsService.getLatestJournals(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useJournal(id: string | undefined) {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.detail(id ?? ''),
    queryFn: () => (id ? journalsService.getJournalById(id) : null),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.specializations(),
    queryFn: () => journalsService.getSpecializations(),
    staleTime: 1000 * 60 * 15,
  });
}

export function useJournalStats() {
  return useQuery({
    queryKey: JOURNAL_QUERY_KEYS.stats(),
    queryFn: () => journalsService.getStats(),
    staleTime: 1000 * 60 * 10,
  });
}
