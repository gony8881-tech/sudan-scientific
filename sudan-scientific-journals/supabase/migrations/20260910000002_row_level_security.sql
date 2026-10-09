-- ==============================================================================
-- Migration: 20260910000002_row_level_security.sql
-- Project: Sudan Scientific Journals (SSJ) - Phase 3
-- Description:
--   1. Create public.is_admin() helper function (SECURITY DEFINER to avoid infinite recursion).
--   2. Enforce Row Level Security (RLS) on all 4 tables:
--      - countries: Public SELECT, Admin INSERT/UPDATE/DELETE.
--      - universities: Public SELECT, Admin INSERT/UPDATE/DELETE.
--      - journals: Public SELECT (status = 'ACTIVE' only) or Admin (all), Admin INSERT/UPDATE/DELETE.
--      - profiles: Owner or Admin SELECT; Owner UPDATE (except role); Admin full access.
--   3. Add trigger defense-in-depth preventing non-admins from updating the 'role' column.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. HELPER FUNCTION: is_admin()
-- ------------------------------------------------------------------------------
-- Checks if the calling user (auth.uid()) has role = 'ADMIN' in profiles.
-- Marked SECURITY DEFINER and STABLE so it can safely read profiles without
-- triggering recursive RLS checks on the profiles table.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'ADMIN'
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Grant execution to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. POLICIES: COUNTRIES
-- ------------------------------------------------------------------------------
-- SELECT: Public access (anyone, including anonymous visitors, can browse countries)
DROP POLICY IF EXISTS "Countries are viewable by everyone" ON public.countries;
CREATE POLICY "Countries are viewable by everyone"
  ON public.countries
  FOR SELECT
  USING (true);

-- INSERT: Only admins can add new countries
DROP POLICY IF EXISTS "Admins can insert countries" ON public.countries;
CREATE POLICY "Admins can insert countries"
  ON public.countries
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- UPDATE: Only admins can update countries
DROP POLICY IF EXISTS "Admins can update countries" ON public.countries;
CREATE POLICY "Admins can update countries"
  ON public.countries
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: Only admins can delete countries
DROP POLICY IF EXISTS "Admins can delete countries" ON public.countries;
CREATE POLICY "Admins can delete countries"
  ON public.countries
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 4. POLICIES: UNIVERSITIES
-- ------------------------------------------------------------------------------
-- SELECT: Public access (anyone can browse universities)
DROP POLICY IF EXISTS "Universities are viewable by everyone" ON public.universities;
CREATE POLICY "Universities are viewable by everyone"
  ON public.universities
  FOR SELECT
  USING (true);

-- INSERT: Only admins can create universities
DROP POLICY IF EXISTS "Admins can insert universities" ON public.universities;
CREATE POLICY "Admins can insert universities"
  ON public.universities
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- UPDATE: Only admins can modify universities
DROP POLICY IF EXISTS "Admins can update universities" ON public.universities;
CREATE POLICY "Admins can update universities"
  ON public.universities
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: Only admins can remove universities
DROP POLICY IF EXISTS "Admins can delete universities" ON public.universities;
CREATE POLICY "Admins can delete universities"
  ON public.universities
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. POLICIES: JOURNALS
-- ------------------------------------------------------------------------------
-- SELECT: Public can only view ACTIVE journals. Admins can view ALL statuses (ACTIVE, INACTIVE, SUSPENDED).
DROP POLICY IF EXISTS "Active journals are viewable by everyone, admins view all" ON public.journals;
CREATE POLICY "Active journals are viewable by everyone, admins view all"
  ON public.journals
  FOR SELECT
  USING (status = 'ACTIVE' OR public.is_admin());

-- INSERT: Only admins can add new journals
DROP POLICY IF EXISTS "Admins can insert journals" ON public.journals;
CREATE POLICY "Admins can insert journals"
  ON public.journals
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- UPDATE: Only admins can update journals
DROP POLICY IF EXISTS "Admins can update journals" ON public.journals;
CREATE POLICY "Admins can update journals"
  ON public.journals
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: Only admins can delete journals
DROP POLICY IF EXISTS "Admins can delete journals" ON public.journals;
CREATE POLICY "Admins can delete journals"
  ON public.journals
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. POLICIES: PROFILES
-- ------------------------------------------------------------------------------
-- SELECT: Users can view their own profile; Admins can view all profiles
DROP POLICY IF EXISTS "Users can view own profile or admin views all" ON public.profiles;
CREATE POLICY "Users can view own profile or admin views all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

-- INSERT: Users can insert their own profile (backup for trigger) or admin can insert any
DROP POLICY IF EXISTS "Users can insert own profile or admin inserts all" ON public.profiles;
CREATE POLICY "Users can insert own profile or admin inserts all"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id OR public.is_admin());

-- UPDATE (Admin): Admins can update any profile including role
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- UPDATE (Self): Users can update their own profile (full_name, avatar_url), but NOT role
DROP POLICY IF EXISTS "Users can update own profile without modifying role" ON public.profiles;
CREATE POLICY "Users can update own profile without modifying role"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()) OR public.is_admin())
  );

-- DELETE: Only admins can delete user profiles
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
CREATE POLICY "Admins can delete profiles"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. DEFENSE-IN-DEPTH TRIGGER: PROTECT ROLE COLUMN
-- ------------------------------------------------------------------------------
-- Explicitly prevents non-admin users from escalating their role, even in direct API calls.
CREATE OR REPLACE FUNCTION public.check_profile_role_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Unauthorized: only administrators can modify user roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS tr_check_profile_role_update ON public.profiles;
CREATE TRIGGER tr_check_profile_role_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_profile_role_update();
