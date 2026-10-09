import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  ExternalLink,
  Send,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useJournal } from '@features/journals/hooks/useJournals';

export function JournalDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: journal, isLoading, isError } = useJournal(slug);

  if (isLoading) {
    return (
      <div className="container-app py-12">
        <div className="card p-8 animate-pulse space-y-6 max-w-4xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-32 bg-gray-100 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !journal) {
    return (
      <div className="container-app py-16 text-center">
        <div className="card p-10 max-w-md mx-auto border-amber-200 bg-amber-50/50">
          <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">لم يتم العثور على المجلة</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            المجلة المطلوبة غير متوفرة أو قد تم نقلها. يرجى مراجعة الرابط أو تصفح الدليل.
          </p>
          <Link to="/journals" className="btn-primary mt-6 text-xs py-2.5 px-5">
            العودة إلى دليل المجلات
          </Link>
        </div>
      </div>
    );
  }

  const isActive = journal.status === 'ACTIVE';

  return (
    <div className="py-10 bg-gray-50/60 min-h-screen">
      <div className="container-app max-w-5xl">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/journals"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-800 hover:text-primary-950 transition-colors"
          >
            <ArrowRight className="h-4 w-4 icon-directional" />
            <span>العودة إلى دليل المجلات</span>
          </Link>
        </div>

        {/* Main Journal Header Card */}
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="badge bg-primary-50 text-primary-800 border border-primary-200 font-medium px-3 py-1">
              <BookOpen className="ml-1.5 h-4 w-4" />
              {journal.specialization || 'تخصص عام'}
            </span>

            {isActive ? (
              <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1">
                <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-emerald-600" />
                مجلة نشطة
              </span>
            ) : (
              <span className="badge bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1">
                <Clock className="ml-1 h-3.5 w-3.5 text-amber-600" />
                أرشيف تاريخي
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 leading-tight">
            {journal.name_ar}
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2 font-sans tracking-wide dir-ltr text-right">
            {journal.name_en}
          </p>

          {/* Affiliation Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-gray-100 py-4">
            <div className="flex items-center gap-3">
              {journal.university?.logo_url ? (
                <img
                  src={journal.university.logo_url}
                  alt={journal.university.name_ar}
                  className="h-10 w-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                  <Building2 className="h-5 w-5" />
                </div>
              )}
              <div>
                <span className="block text-xs text-gray-500">الجهة التابعة</span>
                <span className="block text-sm font-bold text-gray-900">
                  {journal.university?.name_ar || 'جامعة سودانية'}
                </span>
              </div>
            </div>

            {journal.country && (
              <div className="mr-auto flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                {journal.country.flag_url && (
                  <img
                    src={journal.country.flag_url}
                    alt={journal.country.name_ar}
                    className="h-4 w-6 object-cover rounded-sm shadow-xs"
                  />
                )}
                <span>{journal.country.name_ar}</span>
              </div>
            )}
          </div>

          {/* Key Identifiers (ISSN, e-ISSN, Frequency, Language) */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="block text-xs text-gray-500">الترقيم الورقي ISSN</span>
              <span className="block text-sm font-bold text-gray-900 font-mono mt-1">
                {journal.issn || 'غير متوفر'}
              </span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="block text-xs text-gray-500">الترقيم الرقمي e-ISSN</span>
              <span className="block text-sm font-bold text-gray-900 font-mono mt-1">
                {journal.e_issn || 'غير متوفر'}
              </span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="block text-xs text-gray-500">دورية الصدور</span>
              <span className="block text-sm font-bold text-gray-900 mt-1">
                {journal.frequency || 'نصف سنوية'}
              </span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="block text-xs text-gray-500">لغات النشر</span>
              <span className="block text-sm font-bold text-gray-900 mt-1">
                {journal.language || 'العربية / الإنجليزية'}
              </span>
            </div>
          </div>

          {/* Description & Scope */}
          <div className="mt-8">
            <h2 className="text-base font-bold text-gray-900 mb-3 border-r-2 border-primary-700 pr-2.5">
              عن المجلة والنطاق العلمي
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              {journal.description ||
                'مجلة علمية محكمة تعنى بنشر الأبحاث والدراسات المبتكرة في تخصصها، وتسعى لإثراء المحتوى العلمي السوداني والإقليمي.'}
            </p>
          </div>

          {/* Publisher */}
          {journal.publisher && (
            <div className="mt-6 text-xs text-gray-600 flex items-center gap-2">
              <span className="font-semibold text-gray-800">الناشر:</span>
              <span>{journal.publisher}</span>
            </div>
          )}

          {/* External Action Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-4">
            {journal.website_url && (
              <a
                href={journal.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2.5 px-5 gap-2"
              >
                <Globe className="h-4 w-4" />
                <span>زيارة موقع المجلة الرسمي</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {journal.submission_url && (
              <a
                href={journal.submission_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2.5 px-5 gap-2 text-amber-800 border-amber-300 bg-amber-50 hover:bg-amber-100"
              >
                <Send className="h-4 w-4 text-amber-700" />
                <span>رابط إرسال وتقديم الأبحاث</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            <Link
              to="/journals"
              className="btn-secondary text-sm py-2.5 px-4 mr-auto"
            >
              تصفح مجلات أخرى
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
