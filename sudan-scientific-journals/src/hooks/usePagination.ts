import { useMemo, useState } from 'react';
import { PAGINATION_DEFAULTS } from '@lib/constants';

interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const [page, setPage] = useState(options.initialPage ?? PAGINATION_DEFAULTS.initialPage);
  const pageSize = options.pageSize ?? PAGINATION_DEFAULTS.pageSize;

  const range = useMemo(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    return { from, to };
  }, [page, pageSize]);

  function nextPage() {
    setPage((p) => p + 1);
  }

  function previousPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function goToPage(target: number) {
    setPage(Math.max(1, target));
  }

  return { page, pageSize, range, nextPage, previousPage, goToPage, setPage };
}
