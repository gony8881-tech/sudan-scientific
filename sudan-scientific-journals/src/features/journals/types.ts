import type { JournalRow, UniversityRow, CountryRow, JournalStatus } from '@/types/database';

export interface JournalWithRelations extends JournalRow {
  university?: Pick<UniversityRow, 'id' | 'name_ar' | 'name_en' | 'logo_url' | 'website_url'> | null;
  country?: Pick<CountryRow, 'id' | 'name_ar' | 'name_en' | 'code' | 'flag_url'> | null;
}

export interface JournalFilters {
  query?: string;
  specialization?: string;
  status?: JournalStatus | 'ALL';
  universityId?: string;
  countryId?: string;
}

export interface JournalStats {
  totalJournals: number;
  totalUniversities: number;
  totalCountries: number;
  totalSpecializations: number;
}
