import { Link } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  ExternalLink,
  Send,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import type { JournalWithRelations } from '../types';

interface JournalCardProps {
  journal: JournalWithRelations;
}

export function JournalCard({ journal }: JournalCardProps) {
  const isSuspended = journal.status === 'SUSPENDED';
  const isInactive = journal.status === 'INACTIVE';
  const isActive = journal.status === 'ACTIVE';

  return (
    <div className="card group flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Card Header & Badges */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Specialization Badge */}
          <span className="badge bg-primary-50 text-primary-800 border border-primary-200 font-medium">
            <BookOpen className="ml-1.5 h-3.5 w-3.5" />
            {journal.specialization || 'تخصص عام'}
          </span>

          {/* Status Badge */}
          {isActive && (
            <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-emerald-600" />
              نشطة
            </span>
          )}
          {isInactive && (
            <span className="badge bg-amber-50 text-amber-700 border border-amber-200">
              <Clock className="ml-1 h-3.5 w-3.5 text-amber-600" />
              أرشيف
            </span>
          )}
          {isSuspended && (
            <span className="badge bg-rose-50 text-rose-700 border border-rose-200">
              <AlertCircle className="ml-1 h-3.5 w-3.5 text-rose-600" />
              معلقة
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold text-gray-900 leading-snug group-hover:text-primary-800 transition-colors">
          <Link to={`/journals/${journal.id}`} className="hover:underline">
            {journal.name_ar}
          </Link>
        </h3>
        <p className="text-xs font-medium text-gray-500 mt-1 font-sans tracking-wide dir-ltr text-right">
          {journal.name_en}
        </p>

        {/* University & Country */}
        <div className="mt-4 flex items-center gap-2.5 text-sm text-gray-600 border-t border-gray-100 pt-3">
          {journal.university?.logo_url ? (
            <img
              src={journal.university.logo_url}
              alt={journal.university.name_ar}
              className="h-7 w-7 rounded-full object-cover border border-gray-200 flex-shrink-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 flex-shrink-0">
              <Building2 className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-gray-800">
              {journal.university?.name_ar || 'جامعة سودانية'}
            </p>
            {journal.country && (
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <span>{journal.country.name_ar}</span>
              </p>
            )}
          </div>
        </div>

        {/* Description snippet */}
        {journal.description && (
          <p className="mt-3 text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {journal.description}
          </p>
        )}

        {/* Metadata info row (ISSN, Frequency, Language) */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg">
          {journal.issn && (
            <div className="flex items-center gap-1 font-mono">
              <FileText className="h-3 w-3 text-gray-400" />
              <span>ISSN: {journal.issn}</span>
            </div>
          )}
          {journal.e_issn && (
            <div className="flex items-center gap-1 font-mono">
              <Globe className="h-3 w-3 text-gray-400" />
              <span>e-ISSN: {journal.e_issn}</span>
            </div>
          )}
          {journal.frequency && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-gray-400" />
              <span>{journal.frequency}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="border-t border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between gap-2">
        <Link
          to={`/journals/${journal.id}`}
          className="btn-primary text-xs py-1.5 px-3 flex-1 text-center"
        >
          عرض التفاصيل
        </Link>

        {journal.website_url && (
          <a
            href={journal.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-1.5 px-2.5 text-gray-600 hover:text-primary-800"
            title="زيارة موقع المجلة الرسمي"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only">الموقع</span>
          </a>
        )}

        {journal.submission_url && (
          <a
            href={journal.submission_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-1.5 px-2.5 text-amber-700 hover:bg-amber-50 hover:border-amber-300"
            title="رابط تقديم الأبحاث"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="sr-only">تقديم</span>
          </a>
        )}
      </div>
    </div>
  );
}
