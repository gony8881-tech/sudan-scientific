/**
 * Centralized, validated access to environment variables.
 * Never read `import.meta.env` directly anywhere else in the app.
 */

interface AppEnv {
  supabaseUrl: string;
  supabaseAnonKey: string;
  appName: string;
  defaultLocale: 'ar' | 'en';
}

function readEnv(): AppEnv {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // We deliberately fail loudly and early rather than letting the app
    // silently make broken Supabase calls later.
    throw new Error(
      '[env] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
        'Copy .env.example to .env and fill in your Supabase project credentials.',
    );
  }

  const defaultLocale = (import.meta.env.VITE_APP_DEFAULT_LOCALE ?? 'ar') as
    | 'ar'
    | 'en';

  return {
    supabaseUrl,
    supabaseAnonKey,
    appName: import.meta.env.VITE_APP_NAME ?? 'Sudan Scientific Journals',
    defaultLocale,
  };
}

export const env = readEnv();
