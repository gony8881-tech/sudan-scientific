-- ==============================================================================
-- Migration: 20260910000003_storage_policies.sql
-- Project: Sudan Scientific Journals (SSJ) - Phase 3
-- Description:
--   1. Register storage buckets matching STORAGE_BUCKETS from src/lib/constants.ts:
--      - avatars (public)
--      - countries (public)
--      - universities (public)
--      - journals (public)
--   2. Configure Row Level Security (RLS) policies on storage.objects:
--      - Public read on all four buckets.
--      - Admin full write/update/delete access on all buckets.
--      - Authenticated users can upload, update, and delete their own avatar.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. REGISTER STORAGE BUCKETS
-- ------------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('avatars', 'avatars', true),
  ('countries', 'countries', true),
  ('universities', 'universities', true),
  ('journals', 'journals', true)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public;

-- ------------------------------------------------------------------------------
-- 2. STORAGE OBJECTS POLICIES: PUBLIC READ
-- ------------------------------------------------------------------------------

-- Allow anyone (including unauthenticated visitors) to view assets in public buckets
DROP POLICY IF EXISTS "Public can view assets in SSJ buckets" ON storage.objects;
CREATE POLICY "Public can view assets in SSJ buckets"
  ON storage.objects
  FOR SELECT
  USING (bucket_id IN ('avatars', 'countries', 'universities', 'journals'));

-- ------------------------------------------------------------------------------
-- 3. STORAGE OBJECTS POLICIES: ADMIN ACCESS
-- ------------------------------------------------------------------------------

-- Admins can upload to all SSJ buckets
DROP POLICY IF EXISTS "Admins can upload to any SSJ bucket" ON storage.objects;
CREATE POLICY "Admins can upload to any SSJ bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id IN ('avatars', 'countries', 'universities', 'journals')
    AND public.is_admin()
  );

-- Admins can update any asset in SSJ buckets
DROP POLICY IF EXISTS "Admins can update any SSJ bucket asset" ON storage.objects;
CREATE POLICY "Admins can update any SSJ bucket asset"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id IN ('avatars', 'countries', 'universities', 'journals')
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id IN ('avatars', 'countries', 'universities', 'journals')
    AND public.is_admin()
  );

-- Admins can delete any asset from SSJ buckets
DROP POLICY IF EXISTS "Admins can delete any SSJ bucket asset" ON storage.objects;
CREATE POLICY "Admins can delete any SSJ bucket asset"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id IN ('avatars', 'countries', 'universities', 'journals')
    AND public.is_admin()
  );

-- ------------------------------------------------------------------------------
-- 4. STORAGE OBJECTS POLICIES: USER AVATAR MANAGEMENT
-- ------------------------------------------------------------------------------

-- Authenticated users can upload their own avatar:
-- Accepts either folder prefix (e.g. <user_id>/avatar.png) or filename prefix (<user_id>-avatar.png)
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR name LIKE (auth.uid()::text || '%')
    )
  );

-- Authenticated users can update their own avatar
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
CREATE POLICY "Users can update their own avatar"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR name LIKE (auth.uid()::text || '%')
    )
  )
  WITH CHECK (
    bucket_id = 'avatars'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR name LIKE (auth.uid()::text || '%')
    )
  );

-- Authenticated users can delete their own avatar
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR name LIKE (auth.uid()::text || '%')
    )
  );
