/** Merge class name fragments, skipping falsy values (no external dep needed). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Build a URL-friendly slug from an Arabic or English string. */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Format an ISO date string using the given locale. */
export function formatDate(iso: string, locale: 'ar' | 'en' = 'ar'): string {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}

/** Basic URL validator used alongside Zod schemas for form fields. */
export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
