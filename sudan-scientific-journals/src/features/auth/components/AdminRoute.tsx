import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@lib/constants';

/**
 * Guards Admin-only routes on top of ProtectedRoute. Again: a UI-level
 * convenience, not a security boundary — RLS enforces this server-side too.
 */
export function AdminRoute() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <Outlet />;
}
