import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RiArrowRightLine, RiCloseLine, RiTranslate2 } from 'react-icons/ri'
import { useLanguageStore } from '../../../stores/languageStore'

type LanguagePreferenceModalProps = {
  onProceed: (language: 'en' | 'hi') => void
  onClose: () => void
}

export function LanguagePreferenceModal({
  onProceed,
  onClose,
}: LanguagePreferenceModalProps) {
  const { language: currentLanguage, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>(
    currentLanguage ?? 'en',
  )

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleProceed = () => {
    setIsOpen(false)
    setLanguage(selectedLanguage)
    onProceed(selectedLanguage)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="language-backdrop"
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleClose}
          />

          <motion.div
            key="language-modal"
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-0 sm:px-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="pointer-events-auto relative w-full sm:max-w-[560px] rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 sm:px-7 pt-6 pb-5 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-[#3F51B5] px-3 py-1 mb-3">
                  <RiTranslate2 size={16} />
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    Language
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">
                  Choose your language
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select your preferred app language.
                </p>
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-3">
                <button
                  type="button"
                  className={`w-full text-left rounded-2xl border px-4 py-4 transition-all duration-200 ${
                    selectedLanguage === 'en'
                      ? 'border-[#3F51B5] bg-indigo-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/40'
                  }`}
                  onClick={() => setSelectedLanguage('en')}
                >
                  <p className="sora-bold text-base text-slate-800">English</p>
                  <p className="dosis-semibold text-sm text-slate-500">
                    Continue in English
                  </p>
                </button>

                <button
                  type="button"
                  className={`w-full text-left rounded-2xl border px-4 py-4 transition-all duration-200 ${
                    selectedLanguage === 'hi'
                      ? 'border-[#3F51B5] bg-indigo-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/40'
                  }`}
                  onClick={() => setSelectedLanguage('hi')}
                >
                  <p className="sora-bold text-base text-slate-800">Hindi</p>
                  <p className="dosis-semibold text-sm text-slate-500">
                    Hindi mein jari rakhen
                  </p>
                </button>

                <button
                  type="button"
                  className="mt-1 w-full rounded-xl bg-[#3F51B5] hover:cursor-pointer py-3 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:bg-[#3647a3]"
                  onClick={handleProceed}
                >
                  Proceed
                  <RiArrowRightLine size={16} />
                </button>
              </div>

              <button
                type="button"
                aria-label="Close language preference modal"
                className="absolute top-5 right-5 h-10 w-10 rounded-full border border-indigo-200 text-slate-500 hover:text-slate-700 hover:border-indigo-300 transition-colors flex items-center justify-center"
                onClick={handleClose}
              >
                <RiCloseLine size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
