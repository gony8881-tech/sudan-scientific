export const APP_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export const JOURNAL_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
} as const;

export const PAGINATION_DEFAULTS = {
  pageSize: 12,
  initialPage: 1,
} as const;

export const STORAGE_BUCKETS = {
  avatars: 'avatars',
  countries: 'countries',
  universities: 'universities',
  journals: 'journals',
} as const;

export const ROUTES = {
  home: '/',
  journals: '/journals',
  search: '/search',
  journalDetails: (slug: string) => `/journals/${slug}`,
  universityDetails: (slug: string) => `/universities/${slug}`,
  countryDetails: (slug: string) => `/countries/${slug}`,
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  admin: {
    dashboard: '/admin',
    countries: '/admin/countries',
    universities: '/admin/universities',
    journals: '/admin/journals',
    users: '/admin/users',
    settings: '/admin/settings',
  },
} as const;
