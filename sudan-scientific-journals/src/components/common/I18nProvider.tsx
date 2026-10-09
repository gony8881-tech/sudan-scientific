import { useEffect, useState, type ReactNode } from 'react';
import {
  I18nContext,
  LOCALE_DIRECTION,
  LOCALE_STORAGE_KEY,
  translations,
  type Locale,
} from '@i18n/index';
import { env } from '@config/env';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    return stored ?? env.defaultLocale;
  });

  const dir = LOCALE_DIRECTION[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale, dir]);

  function setLocale(next: Locale) {
    setLocaleState(next);
  }

  return (
    <I18nContext.Provider value={{ locale, dir, t: translations[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
