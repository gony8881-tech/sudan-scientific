import { Outlet } from 'react-router-dom';

/**
 * Shell for /admin/*. The full sidebar (desktop) / drawer (mobile)
 * navigation is built out in Phase 6 alongside the CRUD screens.
 */
export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
