import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@lib/constants';

/**
 * Guards any authenticated-only route. This is a UX convenience only —
 * the real authorization boundary is Postgres Row Level Security, which
 * must independently reject unauthorized reads/writes regardless of what
 * the UI shows (see supabase/migrations for the RLS policies).
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // A shared <PageLoader /> will replace this in Phase 5.
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
