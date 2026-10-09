-- ==============================================================================
-- Migration: 20260910000001_initial_schema.sql
-- Project: Sudan Scientific Journals (SSJ) - Phase 3
-- Description:
--   1. Create enums: app_role, journal_status.
--   2. Create tables: profiles, countries, universities, journals.
--   3. Create triggers for automatic updated_at timestamps.
--   4. Create handle_new_user() trigger function on auth.users to auto-populate profiles.
--   5. Create indexes for foreign keys and search query performance.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENUMS
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('ADMIN', 'USER');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'journal_status') THEN
    CREATE TYPE public.journal_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 2. TABLES
-- ------------------------------------------------------------------------------

-- 2.1 PROFILES TABLE
-- References auth.users(id). Automatically created on sign up via handle_new_user trigger.
-- ON DELETE CASCADE ensures profile cleanup when auth user is deleted.
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role public.app_role NOT NULL DEFAULT 'USER',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2.2 COUNTRIES TABLE
-- Holds country directory records.
CREATE TABLE IF NOT EXISTS public.countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  code text NOT NULL UNIQUE,
  flag_url text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2.3 UNIVERSITIES TABLE
-- Foreign Key note: ON DELETE RESTRICT prevents deleting a country that still has universities associated with it.
CREATE TABLE IF NOT EXISTS public.universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE RESTRICT,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  logo_url text,
  website_url text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2.4 JOURNALS TABLE
-- Foreign Key note: ON DELETE RESTRICT on country_id and university_id prevents orphaned journals or accidental loss of scientific publications.
CREATE TABLE IF NOT EXISTS public.journals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE RESTRICT,
  university_id uuid NOT NULL REFERENCES public.universities(id) ON DELETE RESTRICT,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  description text,
  specialization text,
  issn text,
  e_issn text,
  website_url text,
  submission_url text,
  language text,
  publisher text,
  frequency text,
  status public.journal_status NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. TIMESTAMP TRIGGERS (handle_updated_at)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to profiles
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Apply updated_at trigger to countries
DROP TRIGGER IF EXISTS set_countries_updated_at ON public.countries;
CREATE TRIGGER set_countries_updated_at
  BEFORE UPDATE ON public.countries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Apply updated_at trigger to universities
DROP TRIGGER IF EXISTS set_universities_updated_at ON public.universities;
CREATE TRIGGER set_universities_updated_at
  BEFORE UPDATE ON public.universities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Apply updated_at trigger to journals
DROP TRIGGER IF EXISTS set_journals_updated_at ON public.journals;
CREATE TRIGGER set_journals_updated_at
  BEFORE UPDATE ON public.journals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 4. AUTH HOOK TRIGGER (handle_new_user)
-- ------------------------------------------------------------------------------
-- Automatically inserts a new profile row when a user signs up via Supabase Auth.
-- Uses SECURITY DEFINER and explicit search_path = public to guarantee safe execution.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL),
    NEW.raw_user_meta_data->>'avatar_url',
    'USER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 5. INDEXES
-- ------------------------------------------------------------------------------

-- Foreign key indexes (vital for JOIN performance)
CREATE INDEX IF NOT EXISTS idx_universities_country_id ON public.universities(country_id);
CREATE INDEX IF NOT EXISTS idx_journals_country_id ON public.journals(country_id);
CREATE INDEX IF NOT EXISTS idx_journals_university_id ON public.journals(university_id);

-- Filter indexes
CREATE INDEX IF NOT EXISTS idx_journals_status ON public.journals(status);

-- Search indexes (Text / Lookup)
CREATE INDEX IF NOT EXISTS idx_countries_code ON public.countries(code);
CREATE INDEX IF NOT EXISTS idx_countries_name_ar ON public.countries(name_ar);
CREATE INDEX IF NOT EXISTS idx_countries_name_en ON public.countries(name_en);

CREATE INDEX IF NOT EXISTS idx_universities_name_ar ON public.universities(name_ar);
CREATE INDEX IF NOT EXISTS idx_universities_name_en ON public.universities(name_en);

CREATE INDEX IF NOT EXISTS idx_journals_name_ar ON public.journals(name_ar);
CREATE INDEX IF NOT EXISTS idx_journals_name_en ON public.journals(name_en);
CREATE INDEX IF NOT EXISTS idx_journals_specialization ON public.journals(specialization);
CREATE INDEX IF NOT EXISTS idx_journals_issn ON public.journals(issn);
CREATE INDEX IF NOT EXISTS idx_journals_e_issn ON public.journals(e_issn);
