import { useContext } from 'react';
import { AuthContext } from '@features/auth/components/AuthProvider';
import type { AuthState } from '@/types/auth';

/**
 * Read current auth/session state. Must be used within <AuthProvider> (mounted
 * once in src/app/providers.tsx).
 */
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}
