import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { useJournals } from '@features/journals/hooks/useJournals';
import { JournalCard } from '@features/journals/components/JournalCard';
import { JournalFiltersBar } from '@features/journals/components/JournalFiltersBar';
import type { JournalFilters } from '@features/journals/types';

export function JournalsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL query parameters
  const [filters, setFilters] = useState<JournalFilters>({
    query: searchParams.get('q') || '',
    specialization: searchParams.get('specialization') || '',
    status: (searchParams.get('status') as JournalFilters['status']) || 'ALL',
  });

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const specialization = searchParams.get('specialization') || '';
    const status = (searchParams.get('status') as JournalFilters['status']) || 'ALL';

    setFilters({ query: q, specialization, status });
  }, [searchParams]);

  // Handle filter changes and sync to URL
  function handleFilterChange(newFilters: JournalFilters) {
    setFilters(newFilters);

    const params: Record<string, string> = {};
    if (newFilters.query) params.q = newFilters.query;
    if (newFilters.specialization) params.specialization = newFilters.specialization;
    if (newFilters.status && newFilters.status !== 'ALL') params.status = newFilters.status;

    setSearchParams(params, { replace: true });
  }

  // Fetch journals via React Query
  const { data: journals = [], isLoading, isError, refetch } = useJournals(filters);

  return (
    <div className="py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary-800 mb-1">
            <Layers className="h-4 w-4" />
            <span>الفهرس الوطني الموحد</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            دليل وتصفح المجلات العلمية
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-3xl leading-relaxed">
            استعرض وتصفح الدوريات والمجلات العلمية المحكمة الصادرة عن الجامعات
            والمؤسسات الأكاديمية السودانية، مع إمكانية البحث والفرز حسب التخصص،
            الناشر، أو الرقم الدولي الموحد (ISSN).
          </p>
        </div>

        {/* Filter Bar */}
        <JournalFiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={journals.length}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse space-y-4">
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-1/6" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-16 bg-gray-100 rounded" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="card p-8 text-center max-w-md mx-auto my-12 border-rose-200 bg-rose-50/50">
            <AlertCircle className="h-10 w-10 text-rose-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900">حدث خطأ أثناء جلب البيانات</h3>
            <p className="mt-1 text-xs text-gray-600">
              تعذر الاتصال بقاعدة البيانات في الوقت الحالي. يرجى المحاولة مرة أخرى.
            </p>
            <button
              onClick={() => refetch()}
              className="btn-primary mt-4 text-xs py-2 px-4 gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة المحاولة</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && journals.length === 0 && (
          <div className="card p-12 text-center max-w-lg mx-auto my-8 bg-white border border-gray-200">
            <div className="h-14 w-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              لم يتم العثور على أي مجلة
            </h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              لا توجد مجلات تطابق معايير البحث أو التصفية الحالية. جرّب تعديل كلمات البحث
              أو اختيار تخصص مختلف.
            </p>
            <button
              onClick={() =>
                handleFilterChange({
                  query: '',
                  specialization: '',
                  status: 'ALL',
                })
              }
              className="btn-primary mt-5 text-xs py-2.5 px-5"
            >
              مسح جميع الفلاتر وعرض الكل
            </button>
          </div>
        )}

        {/* Journals Grid */}
        {!isLoading && !isError && journals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
