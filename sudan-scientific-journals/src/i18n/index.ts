import { createContext, useContext } from 'react';
import ar from './ar.json';
import en from './en.json';

export type Locale = 'ar' | 'en';

export const translations = { ar, en } as const;

export const LOCALE_DIRECTION: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
};

type TranslationDict = typeof ar;

interface I18nContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: TranslationDict;
  setLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within <I18nProvider>');
  }
  return ctx;
}

export const LOCALE_STORAGE_KEY = 'ssj-locale';
