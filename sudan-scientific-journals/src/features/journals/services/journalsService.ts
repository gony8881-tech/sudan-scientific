import { supabase } from '@lib/supabase';
import type { JournalWithRelations, JournalFilters, JournalStats } from '../types';
import { MOCK_JOURNALS } from './mockJournalsData';

/**
 * Service for journals data access.
 * Follows Architecture Rule: Components and hooks must not call `supabase` directly.
 */
export const journalsService = {
  /**
   * Fetch list of journals with optional filters.
   */
  async getJournals(filters?: JournalFilters): Promise<JournalWithRelations[]> {
    try {
      let query = supabase
        .from('journals')
        .select(`
          *,
          university:universities (id, name_ar, name_en, logo_url, website_url),
          country:countries (id, name_ar, name_en, code, flag_url)
        `)
        .order('created_at', { ascending: false });

      if (filters?.status && filters.status !== 'ALL') {
        query = query.eq('status', filters.status);
      }

      if (filters?.specialization) {
        query = query.eq('specialization', filters.specialization);
      }

      if (filters?.query) {
        const q = filters.query.trim();
        query = query.or(
          `name_ar.ilike.%${q}%,name_en.ilike.%${q}%,specialization.ilike.%${q}%,issn.ilike.%${q}%,e_issn.ilike.%${q}%,publisher.ilike.%${q}%`
        );
      }

      const { data, error } = await query;

      // If Supabase returned rows, return them
      if (!error && data && data.length > 0) {
        return data as unknown as JournalWithRelations[];
      }

      // TODO: Fallback to mock data if Supabase journals table is empty until remote database is seeded.
      return this.filterMockJournals(MOCK_JOURNALS, filters);
    } catch (err) {
      console.warn('Supabase journals query failed, falling back to mock data:', err);
      // TODO: Fallback to mock data if Supabase journals table query fails
      return this.filterMockJournals(MOCK_JOURNALS, filters);
    }
  },

  /**
   * Fetch the latest published or featured journals.
   */
  async getLatestJournals(limit = 6): Promise<JournalWithRelations[]> {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select(`
          *,
          university:universities (id, name_ar, name_en, logo_url, website_url),
          country:countries (id, name_ar, name_en, code, flag_url)
        `)
        .eq('status', 'ACTIVE')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!error && data && data.length > 0) {
        return data as unknown as JournalWithRelations[];
      }

      // TODO: Fallback to mock data if Supabase journals table is empty
      return MOCK_JOURNALS.filter((j) => j.status === 'ACTIVE').slice(0, limit);
    } catch (err) {
      console.warn('Supabase latest journals query failed, falling back to mock data:', err);
      // TODO: Fallback to mock data if Supabase journals table query fails
      return MOCK_JOURNALS.filter((j) => j.status === 'ACTIVE').slice(0, limit);
    }
  },

  /**
   * Fetch a single journal by ID.
   */
  async getJournalById(id: string): Promise<JournalWithRelations | null> {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select(`
          *,
          university:universities (id, name_ar, name_en, logo_url, website_url),
          country:countries (id, name_ar, name_en, code, flag_url)
        `)
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return data as unknown as JournalWithRelations;
      }

      // TODO: Fallback to mock data if not found in remote Supabase table
      const fallback = MOCK_JOURNALS.find((j) => j.id === id);
      return fallback ?? null;
    } catch (err) {
      console.warn('Supabase getJournalById query failed:', err);
      // TODO: Fallback to mock data if Supabase query fails
      return MOCK_JOURNALS.find((j) => j.id === id) ?? null;
    }
  },

  /**
   * Get unique specializations list for filtering.
   */
  async getSpecializations(): Promise<string[]> {
    const journals = await this.getJournals();
    const specs = new Set<string>();
    journals.forEach((j) => {
      if (j.specialization) specs.add(j.specialization);
    });
    return Array.from(specs);
  },

  /**
   * Get directory high-level statistics.
   */
  async getStats(): Promise<JournalStats> {
    const journals = await this.getJournals();
    const universities = new Set(journals.map((j) => j.university_id));
    const countries = new Set(journals.map((j) => j.country_id));
    const specializations = new Set(journals.map((j) => j.specialization).filter(Boolean));

    return {
      totalJournals: journals.length,
      totalUniversities: universities.size,
      totalCountries: countries.size,
      totalSpecializations: specializations.size,
    };
  },

  /**
   * Helper to filter fallback mock journals in-memory.
   */
  filterMockJournals(journals: JournalWithRelations[], filters?: JournalFilters): JournalWithRelations[] {
    let result = [...journals];

    if (filters?.status && filters.status !== 'ALL') {
      result = result.filter((j) => j.status === filters.status);
    }

    if (filters?.specialization) {
      result = result.filter((j) => j.specialization === filters.specialization);
    }

    if (filters?.universityId) {
      result = result.filter((j) => j.university_id === filters.universityId);
    }

    if (filters?.countryId) {
      result = result.filter((j) => j.country_id === filters.countryId);
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      result = result.filter((j) => {
        return (
          j.name_ar.toLowerCase().includes(q) ||
          j.name_en.toLowerCase().includes(q) ||
          (j.description && j.description.toLowerCase().includes(q)) ||
          (j.specialization && j.specialization.toLowerCase().includes(q)) ||
          (j.publisher && j.publisher.toLowerCase().includes(q)) ||
          (j.issn && j.issn.toLowerCase().includes(q)) ||
          (j.e_issn && j.e_issn.toLowerCase().includes(q)) ||
          (j.university?.name_ar && j.university.name_ar.toLowerCase().includes(q)) ||
          (j.university?.name_en && j.university.name_en.toLowerCase().includes(q))
        );
      });
    }

    return result;
  },
};
