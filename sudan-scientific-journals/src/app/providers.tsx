import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@lib/queryClient';
import { AuthProvider } from '@features/auth/components/AuthProvider';
import { I18nProvider } from '@components/common/I18nProvider';

/**
 * Single place to compose every app-wide provider. Order matters:
 * QueryClient must wrap AuthProvider since auth state loading could later
 * use React Query too, and I18n wraps everything so any provider's UI
 * (e.g. error boundaries) can be localized.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
