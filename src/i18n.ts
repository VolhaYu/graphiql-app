import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: translationEn,
  } as const,
  ru: {
    translation: translationRu,
  } as const,
};
const defaultLang = localStorage.getItem('lang') as string;

i18n.use(initReactI18next).init({
  lng: defaultLang || 'en',
  debug: true,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
