import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '../locales/en/common.json'
import enHome from '../locales/en/home.json'
import enLanguage from '../locales/en/language.json'
import enSeekerOnboarding from '../locales/en/seekerOnboarding.json'
import enEmployerOnboarding from '../locales/en/employerOnboarding.json'

import hiCommon from '../locales/hi/common.json'
import hiHome from '../locales/hi/home.json'
import hiLanguage from '../locales/hi/language.json'
import hiSeekerOnboarding from '../locales/hi/seekerOnboarding.json'
import hiEmployerOnboarding from '../locales/hi/employerOnboarding.json'

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    language: enLanguage,
    seekerOnboarding: enSeekerOnboarding,
    employerOnboarding: enEmployerOnboarding,
  },
  hi: {
    common: hiCommon,
    home: hiHome,
    language: hiLanguage,
    seekerOnboarding: hiSeekerOnboarding,
    employerOnboarding: hiEmployerOnboarding,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['common', 'home', 'language', 'seekerOnboarding', 'employerOnboarding'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Use browser language as a hint only; persistence is handled by Zustand
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
      caches: [],
    },
  })

export default i18n
