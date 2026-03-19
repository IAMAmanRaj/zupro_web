import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { FaGlobe } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '../../stores/languageStore'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLanguageStore()

  // ✅ Separate selectors — each returns a stable primitive or reference
  const isVerified = useOnboardingFlowStore((s) => s.isVerified)
  const user = useOnboardingFlowStore((s) => s.user)

  const isLoggedIn = isVerified && !!user
  const searchTo = user?.userType === 'seeker' ? '/search/jobs' : '/search/candidates'
  const searchLabel = user?.userType === 'seeker' ? 'Search Jobs' : 'Search Candidates'
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isSearchActive = !!searchTo && (pathname === searchTo || pathname.startsWith(`${searchTo}/`))

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  return (
    <nav className="px-5 bg-white hover:cursor-pointer md:px-8 flex items-center justify-between h-14 md:h-16 relative z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-[#3F51B5] text-3xl lg:text-4xl font-extrabold tracking-tight select-none"
        style={{ fontFamily: '"Trebuchet MS", "Gill Sans", sans-serif' }}
      >
        {t('appName')}
      </Link>

      {/* Desktop center links */}
      <div className="hidden sora-bold md:flex md:gap-6 lg:gap-10 mt-1 items-center text-[13px] lg:text-[15px] absolute top-5 left-1/2 -translate-x-1/2 gap-8">
      <Link to="/home" className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
          Home
        </Link>
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
        {/* Language toggle (desktop) */}
        <button
          type="button"
          className="flex hover:cursor-pointer items-center gap-1 px-3 py-1.5 text-[11px] rounded-full border border-slate-200 bg-white font-semibold text-slate-600 hover:border-[#3F51B5] hover:text-[#3F51B5] hover:shadow-sm transition-all"
          onClick={toggleLanguage}
          aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        >
          <FaGlobe size={14} />
          <span className="uppercase">{language === 'hi' ? 'en' : 'हिंदी'}</span>
        </button>

        {isLoggedIn ? (
          <Link
            to={searchTo}
            className={`flex cascadia-mono-bold hover:opacity-100 opacity-95 hover:cursor-pointer items-center gap-2 px-6 py-2 transition-all duration-300 ${
              isSearchActive ? 'bg-[#3F51B5] text-white border-2 border-[#3F51B5] ' : 'bg-transparent text-[#3F51B5] hover:text-white hover:bg-[#3F51B5] border-[#3F51B5]/90 border-2 '
            }`}
          >
            {searchLabel}
          </Link>
        ) : (
          <>
            <Link to="/auth" className="flex cascadia-mono-bold hover:opacity-100 opacity-95 hover:cursor-pointer items-center gap-2 text-white bg-[#3F51B5] px-6 py-2 transition-all">
              {t('navbar.getStarted')}
            </Link>
          </>
        )}
      </div>

      {/* Mobile right side: globe + hamburger */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          className="flex hover:cursor-pointer items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-semibold text-slate-600 hover:border-[#3F51B5] hover:text-[#3F51B5] transition-all"
          onClick={toggleLanguage}
          aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        >
          <FaGlobe size={14} />
          <span className="uppercase">{language === 'hi' ? 'en' : 'हिंदी'}</span>
        </button>

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
              <Link to="/home" onClick={() => setMenuOpen(false)} className="text-slate-700 font-semibold hover:text-[#3F51B5] transition-colors">
              Home
            </Link>
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
              {isLoggedIn ? (
                <Link
                  to={searchTo}
                  onClick={() => setMenuOpen(false)}
                  className={`flex-1 text-center py-2.5 rounded-xl font-bold text-sm border-2 border-[#3F51B5] ${
                    isSearchActive ? 'bg-[#3F51B5] text-white' : 'bg-transparent text-[#3F51B5]'
                  }`}
                >
                  {searchLabel}
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl bg-[#3F51B5] text-white font-bold text-sm"
                  >
                    {t('navbar.getStarted')}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
