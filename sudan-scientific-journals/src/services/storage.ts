import { supabase } from '@lib/supabase';
import type { STORAGE_BUCKETS } from '@lib/constants';

type Bucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

/**
 * Thin wrapper around Supabase Storage. Bucket-level policies (who can
 * read/upload/delete) are enforced in Postgres/Storage RLS, set up in
 * Phase 7 — this service must not be relied on for authorization.
 */
export const storageService = {
  async upload(bucket: Bucket, path: string, file: File) {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: true,
      cacheControl: '3600',
    });
    if (error) throw error;
    return data;
  },

  getPublicUrl(bucket: Bucket, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  async remove(bucket: Bucket, paths: string[]) {
    const { error } = await supabase.storage.from(bucket).remove(paths);
    if (error) throw error;
  },
};
