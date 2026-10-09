/**
 * Hand-written equivalent of Supabase's generated `database.types.ts`.
 * Once the project is linked to a real Supabase project, replace this file by running:
 *   supabase gen types typescript --project-id <project-id> > src/types/database.ts
 * Keep the shape (Database.public.Tables.<table>.Row/Insert/Update) identical
 * so the rest of the app does not need to change.
 */

export type AppRole = 'ADMIN' | 'USER';
export type JournalStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: AppRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: AppRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: AppRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      countries: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          code: string;
          flag_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_en: string;
          code: string;
          flag_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_en?: string;
          code?: string;
          flag_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      universities: {
        Row: {
          id: string;
          country_id: string;
          name_ar: string;
          name_en: string;
          logo_url: string | null;
          website_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          country_id: string;
          name_ar: string;
          name_en: string;
          logo_url?: string | null;
          website_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          country_id?: string;
          name_ar?: string;
          name_en?: string;
          logo_url?: string | null;
          website_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      journals: {
        Row: {
          id: string;
          country_id: string;
          university_id: string;
          name_ar: string;
          name_en: string;
          description: string | null;
          specialization: string | null;
          issn: string | null;
          e_issn: string | null;
          website_url: string | null;
          submission_url: string | null;
          language: string | null;
          publisher: string | null;
          frequency: string | null;
          status: JournalStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          country_id: string;
          university_id: string;
          name_ar: string;
          name_en: string;
          description?: string | null;
          specialization?: string | null;
          issn?: string | null;
          e_issn?: string | null;
          website_url?: string | null;
          submission_url?: string | null;
          language?: string | null;
          publisher?: string | null;
          frequency?: string | null;
          status?: JournalStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          country_id?: string;
          university_id?: string;
          name_ar?: string;
          name_en?: string;
          description?: string | null;
          specialization?: string | null;
          issn?: string | null;
          e_issn?: string | null;
          website_url?: string | null;
          submission_url?: string | null;
          language?: string | null;
          publisher?: string | null;
          frequency?: string | null;
          status?: JournalStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: AppRole;
      journal_status: JournalStatus;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type ProfileRow = Tables<'profiles'>;
export type CountryRow = Tables<'countries'>;
export type UniversityRow = Tables<'universities'>;
export type JournalRow = Tables<'journals'>;
