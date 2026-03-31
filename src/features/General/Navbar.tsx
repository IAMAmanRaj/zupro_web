import { useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { FaGlobe } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '../../stores/languageStore'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLanguageStore()
  const navigate = useNavigate()

  // ✅ Separate selectors — each returns a stable primitive or reference
  const isVerified = useOnboardingFlowStore((s) => s.isVerified)
  const user = useOnboardingFlowStore((s) => s.user)
  const reset = useOnboardingFlowStore((s) => s.reset)

  const isLoggedIn = isVerified && !!user
  const userType = user?.userType ?? null
  const searchTo = userType === 'employer' ? '/search/candidates' : '/search/jobs'
  const searchLabel = userType === 'employer' ? 'Search Candidates' : 'Search Jobs'
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isSearchActive =
    isLoggedIn && (pathname === searchTo || pathname.startsWith(`${searchTo}/`))

  const isHomeActive = pathname === '/home' || pathname.startsWith('/home/')
  const isContactActive = pathname === '/contact-us' || pathname.startsWith('/contact-us/')

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  const logout = () => {
    reset()
    setMenuOpen(false)
    navigate({ to: '/auth' })
  }

  return (
<nav className="fixed top-0 left-0 right-0 z-50
px-5 md:px-8 h-14 md:h-16 flex items-center justify-between
bg-white backdrop-blur-lg border-b border-white/30 shadow-sm">
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
      <Link
        to="/home"
        className={`font-semibold transition-colors hover:text-[#3F51B5] ${isHomeActive ? 'text-[#3F51B5]' : 'text-slate-700'}`}
      >
          Home
        </Link>
        <Link
          to="/faqs"
          className={`font-semibold transition-colors hover:text-[#3F51B5] text-slate-700`}
        >
          {t('navbar.faqs')}
        </Link>
        <Link
          to="/contact-us"
          className={`font-semibold transition-colors hover:text-[#3F51B5] ${isContactActive ? 'text-[#3F51B5]' : 'text-slate-700'}`}
        >
          {t('navbar.contact')}
        </Link>
        <Link
          to="/about"
          className={`font-semibold transition-colors hover:text-[#3F51B5] text-slate-700`}
        >
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
          <>
            <Link
              to={searchTo}
              className={`flex cascadia-mono-bold hover:opacity-100 opacity-95 hover:cursor-pointer items-center gap-2 px-6 py-2 transition-all duration-300 ${
                isSearchActive
                  ? 'bg-[#3F51B5] text-white border-2 border-[#3F51B5] '
                  : 'bg-transparent text-[#3F51B5] hover:text-white hover:bg-[#3F51B5] border-[#3F51B5]/90 border-2 '
              }`}
            >
              {searchLabel}
            </Link>
            <button
              type="button"
              onClick={logout}
              aria-label={t('navbar.logout')}
              className="p-2 hover:cursor-pointer rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#800020]/80 hover:border-[#800020] hover:bg-red-50 transition-all duration-300"
            >
              <FiLogOut size={18} />
            </button>
          </>
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
<motion.button
  type="button"
  className="md:hidden text-slate-700 p-1"
  onClick={() => setMenuOpen((o) => !o)}
  aria-label="Toggle menu"
  whileTap={{ scale: 0.92 }}
>
  <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
    {/* Top bar */}
    <motion.span
      className="block h-[2px] w-5 bg-slate-700 origin-center rounded-full"
      animate={menuOpen
        ? { rotate: 45, y: 7, width: 20 }
        : { rotate: 0, y: 0, width: 20 }
      }
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    />
    {/* Middle bar */}
    <motion.span
      className="block h-[2px] w-5 bg-slate-700 rounded-full"
      animate={menuOpen
        ? { opacity: 0, scaleX: 0 }
        : { opacity: 1, scaleX: 1 }
      }
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    />
    {/* Bottom bar */}
    <motion.span
      className="block h-[2px] w-5 bg-slate-700 origin-center rounded-full"
      animate={menuOpen
        ? { rotate: -45, y: -7, width: 20 }
        : { rotate: 0, y: 0, width: 20 }
      }
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    />
  </div>
</motion.button>
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
              <Link
                to="/home"
                onClick={() => setMenuOpen(false)}
                className={`font-semibold transition-colors hover:text-[#3F51B5] ${isHomeActive ? 'text-[#3F51B5]' : 'text-slate-700'}`}
              >
              Home
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`font-semibold transition-colors hover:text-[#3F51B5] text-slate-700`}
            >
              {t('navbar.faqs')}
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMenuOpen(false)}
              className={`font-semibold transition-colors hover:text-[#3F51B5] ${isContactActive ? 'text-[#3F51B5]' : 'text-slate-700'}`}
            >
              {t('navbar.contact')}
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`font-semibold transition-colors hover:text-[#3F51B5] text-slate-700`}
            >
              {t('navbar.about')}
            </Link>
            <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
              {isLoggedIn ? (
                <>
                  <Link
                    to={searchTo}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full text-center py-2.5 rounded-xl font-bold text-sm border-2 border-[#3F51B5] ${
                      isSearchActive ? 'bg-[#3F51B5] text-white' : 'bg-transparent text-[#3F51B5]'
                    }`}
                  >
                    {searchLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full hover:cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-[#800020]/80 font-bold text-sm border border-slate-500 hover:bg-red-50 hover:border-[#800020] transition-all"
                  >
                    <FiLogOut size={16} />
                    {t('navbar.logout')}
                  </button>
                </>
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
