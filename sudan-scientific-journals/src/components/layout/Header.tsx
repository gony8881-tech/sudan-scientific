import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  LogIn,
  LayoutDashboard,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '@hooks/useAuth';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user } = useAuth();

  const navLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/journals', label: 'تصفح المجلات' },
    { to: '/search', label: 'البحث' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="container-app flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 text-amber-400 shadow-sm group-hover:bg-primary-800 transition-colors">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-base font-bold text-gray-950 leading-tight">
                المجلات العلمية السودانية
              </span>
              <span className="block text-[11px] font-medium text-primary-700 tracking-wider font-sans">
                Sudan Scientific Journals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 mr-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/journals"
            className="btn-secondary text-xs py-2 px-3 gap-1.5 text-gray-700 hover:text-primary-900"
          >
            <Search className="h-3.5 w-3.5" />
            <span>بحث سريع</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="btn-secondary text-xs py-2 px-3 gap-1.5 text-primary-800 border-primary-200 bg-primary-50 hover:bg-primary-100"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>لوحة التحكم</span>
                </Link>
              )}
              <span className="text-xs text-gray-600 px-2">
                {user?.email}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="btn-primary text-xs py-2 px-3.5 gap-1.5"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>تسجيل الدخول</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary w-full justify-center text-sm py-2 gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                <div className="text-xs text-gray-500 text-center py-1">
                  {user?.email}
                </div>
              </>
            ) : (
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full justify-center text-sm py-2.5 gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>تسجيل الدخول</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
