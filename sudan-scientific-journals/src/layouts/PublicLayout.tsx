import { Outlet } from 'react-router-dom';
import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';

/**
 * Shell for all public-facing pages (Home, Search, Details pages).
 * Provides the global navigation header and academic footer.
 */
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
