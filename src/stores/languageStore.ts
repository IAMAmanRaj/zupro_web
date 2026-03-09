import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n'

export type SupportedLanguage = 'en' | 'hi'

type LanguageState = {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => {
        set({ language })
        i18n.changeLanguage(language)
      },
    }),
    {
      name: 'language-preference',
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          i18n.changeLanguage(state.language)
        }
      },
    },
  ),
)

