import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { FaGlobe } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '../../stores/languageStore'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showMobileLangMenu, setShowMobileLangMenu] = useState(false)
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLanguageStore()

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang)
    setShowLangMenu(false)
    setShowMobileLangMenu(false)
  }

  return (
    <nav className="px-5 hover:bg-white transition-all duration-300 hover:cursor-pointer md:px-8 flex items-center justify-between h-14 md:h-16 bg-transparent relative z-50">
      {/* Logo */}
      <span
        className="text-[#3F51B5] text-3xl lg:text-4xl font-extrabold tracking-tight select-none"
        style={{ fontFamily: '"Trebuchet MS", "Gill Sans", sans-serif' }}
      >
        {t('appName')}
      </span>

      {/* Desktop center links */}
      <div className="hidden sora-bold md:flex md:gap-6 lg:gap-10 mt-1 items-center text-[13px] lg:text-[15px]  absolute top-5 left-1/2 -translate-x-1/2 gap-8">
        <Link to="/" className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
          {t('navbar.faqs')}
        </Link>
        <Link to="/" className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
          {t('navbar.contact')}
        </Link>
        <Link to="/" className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
          {t('navbar.about')}
        </Link>
      </div>

      {/* Desktop right actions */}
      <div className="hidden md:flex gap-[10px] lg:gap-[24px] text-[12px] lg:text-[15px] items-center">
        {/* Language switcher (desktop) */}
        <div className="relative">
          <button
            type="button"
            className="flex hover:cursor-pointer items-center gap-1 px-3 py-1.5 text-[11px] rounded-full border border-slate-200 bg-white font-semibold text-slate-600 hover:border-[#3F51B5] hover:text-[#3F51B5] hover:shadow-sm transition-all"
            onClick={() => setShowLangMenu((o) => !o)}
          >
            <FaGlobe size={14} />
            <span className="uppercase">{language === "hi" ? "हिंदी" : "en"}</span>
          </button>
          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                key="desktop-lang-menu"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute hover:cursor-pointer right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-slate-100 py-2 z-50"
              >
                <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  {t('navbar.language')}
                </div>
                <div className="flex items-center gap-1 mx-3 bg-slate-100 rounded-lg p-1">
                  {(['en', 'hi'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageChange(lang)}
                      className={`flex-1 hover:cursor-pointer opacity-80 hover:opacity-100 py-1 rounded-md text-[11px] font-semibold transition-all duration-200 ${
                        language === lang
                          ? 'bg-[#3F51B5] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {lang === 'en' ? 'English' : 'हिन्दी'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/auth" className="hidden lg:block hover:cursor-pointer cascadia-mono-bold opacity-95 hover:opacity-100 font-bold text-slate-700">
          {t('navbar.signIn')}
        </Link>
        <Link to="/auth" className="flex cascadia-mono-bold hover:opacity-100 opacity-95 hover:cursor-pointer items-center gap-2 text-white bg-[#3F51B5] px-6 py-2  transition-all">
          {t('navbar.signUp')}
        </Link>
      </div>

      {/* Mobile right side: globe + hamburger */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="relative">
          <button
            type="button"
            className="flex hover:cusror-pointer  items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-semibold text-slate-600 hover:border-[#3F51B5] hover:text-[#3F51B5] transition-all"
            onClick={() => setShowMobileLangMenu((o) => !o)}
            aria-label="Change language"
          >
           <FaGlobe size={14} />
<span className="uppercase">
  {language === "hi" ? "हिंदी" : "en"}
</span>
          </button>
          <AnimatePresence>
            {showMobileLangMenu && (
              <motion.div
                key="mobile-lang-menu"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-slate-100 py-2 z-50"
              >
                <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 tracking-wide">
                  {t('navbar.language')}
                </div>
                <div className="flex items-center gap-1 mx-3 bg-slate-100 rounded-lg p-1">
                  {(['en', 'hi'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageChange(lang)}
                      className={`flex-1 hover:cursor-pointer opacity-80 hover:opacity-100 py-1 rounded-md text-[11px] font-semibold transition-all duration-200 ${
                        language === lang
                          ? 'bg-[#3F51B5] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {lang === 'en' ? 'English' : 'हिन्दी'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-slate-700 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 sora-bold left-0 right-0 bg-white shadow-lg border-t border-slate-100 px-6 py-5 flex flex-col gap-4 md:hidden"
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
              {t('navbar.faqs')}
            </Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
              {t('navbar.contact')}
            </Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
              {t('navbar.about')}
            </Link>
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <Link to="/auth" className="flex-1 text-center py-2.5 rounded-xl border-2 border-[#3F51B5] text-[#3F51B5] font-bold text-sm">
                {t('navbar.signIn')}
              </Link>
              <Link to="/auth" className="flex-1 text-center py-2.5 rounded-xl bg-[#3F51B5] text-white font-bold text-sm">
                {t('navbar.signUp')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}