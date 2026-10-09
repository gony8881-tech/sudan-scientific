import type { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@layouts/PublicLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import { AdminLayout } from '@layouts/AdminLayout';
import { AdminRoute } from '@features/auth/components/AdminRoute';

import { HomePage } from '@pages/public/HomePage';
import { SearchPage } from '@pages/public/SearchPage';
import { JournalsListPage } from '@pages/public/JournalsListPage';
import { JournalDetailsPage } from '@pages/public/JournalDetailsPage';
import { UniversityDetailsPage } from '@pages/public/UniversityDetailsPage';
import { CountryDetailsPage } from '@pages/public/CountryDetailsPage';
import { NotFoundPage } from '@pages/public/NotFoundPage';

import { LoginPage } from '@pages/auth/LoginPage';
import { RegisterPage } from '@pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@pages/auth/ResetPasswordPage';

import { DashboardPage } from '@pages/admin/DashboardPage';
import { CountriesPage } from '@pages/admin/CountriesPage';
import { UniversitiesPage } from '@pages/admin/UniversitiesPage';
import { JournalsPage } from '@pages/admin/JournalsPage';
import { UsersPage } from '@pages/admin/UsersPage';
import { SettingsPage } from '@pages/admin/SettingsPage';

export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'journals', element: <JournalsListPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'journals/:slug', element: <JournalDetailsPage /> },
      { path: 'universities/:slug', element: <UniversityDetailsPage /> },
      { path: 'countries/:slug', element: <CountryDetailsPage /> },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: 'admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'countries', element: <CountriesPage /> },
          { path: 'universities', element: <UniversitiesPage /> },
          { path: 'journals', element: <JournalsPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
