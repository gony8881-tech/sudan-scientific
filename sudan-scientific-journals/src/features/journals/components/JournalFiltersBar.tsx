import { Search, X, Filter, RotateCcw } from 'lucide-react';
import type { JournalFilters } from '../types';
import { useSpecializations } from '../hooks/useJournals';

interface JournalFiltersBarProps {
  filters: JournalFilters;
  onFilterChange: (filters: JournalFilters) => void;
  totalResults: number;
}

export function JournalFiltersBar({
  filters,
  onFilterChange,
  totalResults,
}: JournalFiltersBarProps) {
  const { data: specializations = [] } = useSpecializations();

  const hasActiveFilters = Boolean(
    filters.query ||
      (filters.specialization && filters.specialization !== '') ||
      (filters.status && filters.status !== 'ALL')
  );

  function handleReset() {
    onFilterChange({
      query: '',
      specialization: '',
      status: 'ALL',
    });
  }

  return (
    <div className="card p-4 sm:p-5 mb-8 bg-white border border-gray-200/80 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Search Query Input */}
        <div className="md:col-span-5 relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={filters.query ?? ''}
            onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
            placeholder="ابحث باسم المجلة، الجامعة، الناشر، أو ISSN..."
            className="input-field pr-10 pl-9 py-2.5 text-sm"
          />
          {filters.query && (
            <button
              onClick={() => onFilterChange({ ...filters, query: '' })}
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
              title="مسح البحث"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Specialization Filter */}
        <div className="md:col-span-4 relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <Filter className="h-4 w-4" />
          </div>
          <select
            value={filters.specialization ?? ''}
            onChange={(e) =>
              onFilterChange({ ...filters, specialization: e.target.value })
            }
            className="input-field pr-9 py-2.5 text-sm appearance-none bg-white cursor-pointer"
          >
            <option value="">جميع التخصصات العلمية</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-2">
          <select
            value={filters.status ?? 'ALL'}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                status: e.target.value as JournalFilters['status'],
              })
            }
            className="input-field py-2.5 text-sm appearance-none bg-white cursor-pointer"
          >
            <option value="ALL">جميع الحالات</option>
            <option value="ACTIVE">المجلات النشطة</option>
            <option value="INACTIVE">المجلات غير النشطة</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="md:col-span-1 flex justify-end">
          {hasActiveFilters ? (
            <button
              onClick={handleReset}
              className="btn-secondary w-full py-2.5 text-xs text-rose-600 hover:bg-rose-50 hover:border-rose-200 gap-1"
              title="مسح الفلاتر"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة</span>
            </button>
          ) : (
            <div className="text-center w-full text-xs text-gray-400 hidden md:block">
              تصفية
            </div>
          )}
        </div>
      </div>

      {/* Results summary bar */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">
            عدد النتائج:
          </span>
          <span className="badge bg-primary-100 text-primary-900 font-bold px-2 py-0.5">
            {totalResults} مجلة
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              تم تفعيل خيارات التصفية
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
