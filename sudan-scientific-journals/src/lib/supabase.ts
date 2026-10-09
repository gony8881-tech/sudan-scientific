import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
import type { Database } from '@/types/database';

/**
 * Single shared Supabase client for the whole app.
 * - Uses only the public anon key (safe for the browser).
 * - Row Level Security in Postgres is the real gatekeeper (see supabase/migrations),
 *   this client must never be trusted to enforce authorization by itself.
 */
export const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'ssj-auth',
  },
});
