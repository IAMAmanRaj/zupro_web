import { useNavigate } from '@tanstack/react-router'
import { useState, useMemo, useRef, useEffect } from 'react'
import {
  FiUser,
  FiCalendar,
  FiChevronDown,
  FiSearch,
  FiMapPin,
  FiBookOpen,
  FiArrowRight,
} from 'react-icons/fi'
import { PiGenderIntersexBold } from 'react-icons/pi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'

interface FormData {
  name: string
  age: string
  gender: string
  profession: string
  location: string
  education: string
}

const FIELDS: (keyof FormData)[] = [
  'name',
  'age',
  'gender',
  'profession',
  'location',
  'education',
]

function ProgressDots({ progress }: { progress: number }) {
  const dots = 3
  const thresholds = [0, 0.5, 1]

  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: dots }).map((_, i) => {
        const active = progress >= thresholds[i]
        const isLast = i === dots - 1

        return (
          <div key={i} className="flex items-center">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                animate={{ borderColor: active ? '#3F51B5' : '#d1d5db' }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="rounded-full bg-[#3F51B5]"
                animate={{ width: active ? 8 : 0, height: active ? 8 : 0, opacity: active ? 1 : 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            {!isLast && (
              <div className="relative w-12 h-0.5 bg-gray-200 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#3F51B5]"
                  animate={{ width: progress >= thresholds[i + 1] ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function FieldBox({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="relative flex items-start border border-gray-200 rounded-xl bg-white hover:border-[#3F51B5]/40 focus-within:border-[#3F51B5] focus-within:shadow-[0_0_0_3px_rgba(63,81,181,0.1)] transition-all duration-200">
      {icon && (
        <div className="flex items-center justify-center pl-4 pt-[14px] text-[#3F51B5] shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

function SearchDropdown({
  options,
  value,
  onChange,
  placeholder,
  icon,
  subLabel,
  searchPlaceholder,
  noResultsLabel,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  icon: React.ReactNode
  subLabel?: string
  searchPlaceholder: string
  noResultsLabel: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div
        className="relative flex items-center border border-gray-200 rounded-xl bg-white hover:border-[#3F51B5]/40 focus-within:border-[#3F51B5] focus-within:shadow-[0_0_0_3px_rgba(63,81,181,0.1)] transition-all duration-200 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center justify-center pl-4 text-[#3F51B5] shrink-0">{icon}</div>
        <div className="flex-1 px-3 py-3.5">
          <div className="text-sm font-semibold text-slate-700">{placeholder}</div>
          {value && <div className="text-[13px] text-slate-500 mt-0.5">{value}</div>}
          {!value && subLabel && (
            <div className="text-[13px] text-slate-400 mt-0.5 flex items-center gap-1">{subLabel}</div>
          )}
        </div>
        <FiChevronDown
          size={16}
          className={`mr-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
              <FiSearch size={14} className="text-slate-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 text-sm outline-none bg-transparent placeholder-slate-400 text-slate-700"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-48 overflow-y-auto zupro-scroll">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-400">{noResultsLabel}</div>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt)
                      setOpen(false)
                      setQuery('')
                    }}
                    className={`w-full hover:cursor-pointer text-left px-4 py-2.5 text-sm transition-colors duration-100 ${value === opt ? 'bg-[#3F51B5]/8 text-[#3F51B5] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SimpleDropdown({
  options,
  value,
  onChange,
  placeholder,
  icon,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  icon: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center border border-gray-200 rounded-xl bg-white hover:border-[#3F51B5]/40 transition-all duration-200 cursor-pointer px-4 py-3.5 gap-3"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-[#3F51B5] shrink-0">{icon}</span>
        <span className={`flex-1 text-sm font-medium ${value ? 'text-slate-800' : 'text-slate-400'}`}>
          {value || placeholder}
        </span>
        <FiChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${value === opt ? 'text-[#3F51B5] font-semibold bg-indigo-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SeekerOnboardingForm() {
  const navigate = useNavigate()
  const { t } = useTranslation('seekerOnboarding')
  const setPendingSeeker = useOnboardingFlowStore((s) => s.setPendingSeeker)

  const genders = t('options.genders', { returnObjects: true }) as string[]
  const professions = t('options.professions', { returnObjects: true }) as string[]
  const educationOptions = t('options.education', { returnObjects: true }) as string[]

  const [form, setForm] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    profession: '',
    location: '',
    education: '',
  })

  const set = (key: keyof FormData) => (val: string) => setForm((prev) => ({ ...prev, [key]: val }))

  const filledCount = FIELDS.filter((f) => form[f].trim() !== '').length
  const progress = filledCount / FIELDS.length
  const allFilled = filledCount === FIELDS.length

  const handleNext = () => {
    if (!allFilled) return
    setPendingSeeker(form)
    navigate({ to: '/auth' })
  }

  return (
    <div
      className="overflow-y-scroll no-scrollbar md:overflow-hidden md:min-h-screen bg-transparent md:bg-[#f0f0f5] flex items-start md:items-center scale-95 md:justify-center -mt-5  md:p-4 pb-2 md:-mt-8"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="w-full  max-w-4xl bg-white rounded-2xl overflow-y-scroll no-scrollbar md:overflow-hidden flex flex-col md:flex-row md:min-h-[600px]">
        <div className="hidden md:flex flex-col justify-between w-[42%] bg-[#1e1b4b] p-9">
          <div>
            <div className="mb-1">
              <span
                className="text-white sora-bold text-3xl font-extrabold tracking-tight select-none"

              >
                {t('leftPanel.brand')}
              </span>
              <div className="mt-0.5 w-10 h-1 rounded-full bg-amber-400" />
            </div>
          </div>

          <div>
            <h2 className="text-white text-3xl font-bold leading-snug mb-4">
              {t('leftPanel.titleLine1')}<br />
              {t('leftPanel.titleLine2')}
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed">{t('leftPanel.description')}</p>
            <p className="mt-6 text-indigo-300 text-sm">
              {t('leftPanel.alreadyWithUs')}{' '}
              <a
                href="/auth"
                className="text-white underline underline-offset-2 font-medium hover:text-amber-300 transition-colors"
              >
                {t('leftPanel.signIn')}
              </a>
            </p>
          </div>

          <div>
            <p className="text-indigo-300 text-xs">{t('leftPanel.needHelp')}</p>
            <p className="text-amber-400 text-sm font-semibold mt-0.5">help@zupro.work</p>
          </div>
        </div>
        {/* ─── MOBILE LAYOUT (< md) ─────────────────────────────────────────── */}
        <div className="relative h-[150px]  border-2 rounded-t-3xl flex justify-start items-end md:hidden w-full bg-[#1e1b4b]">
          {/* Top hero strip */}
           {/* Decorative circles */}
           <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className='absolute top-16 right-4'>
            <p className="text-amber-400 text-sm font-semibold mt-0.5">help@zupro.work</p>
          </div>
          <div className="px-4 md:px-6 bottom-0 w-full pt-7 pb-4  overflow-hidden shrink-0">


            {/* Heading */}
            <h2 className="text-white text-2xl font-bold leading-snug mb-2">
              {t('leftPanel.titleLine1')}<br />
              {t('leftPanel.titleLine2')}
            </h2>
            <p className="text-indigo-300 text-[13px] leading-relaxed">
              {t('leftPanel.description')}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col px-4 md:px-8 pt-8 pb-12 overflow-y-auto zupro-scroll">
          <div className="shrink-0 mb-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-400 font-medium">
                {t('header.stepLabel', { current: 1, total: 2 })}
              </p>
              <ProgressDots progress={progress} />
            </div>

          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-5">{t('form.title')}</h3>

          <div className="flex flex-col gap-3 flex-1">
            <FieldBox icon={<FiUser size={16} />}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
                placeholder={t('form.namePlaceholder')}
                className="w-full px-3 py-3.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              />
            </FieldBox>

            <FieldBox icon={<FiCalendar size={16} />}>
              <input
                type="number"
                min={16}
                max={65}
                value={form.age}
                onChange={(e) => set('age')(e.target.value)}
                placeholder={t('form.agePlaceholder')}
                className="w-full px-3 py-3.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </FieldBox>

            <SimpleDropdown
              options={genders}
              value={form.gender}
              onChange={set('gender')}
              placeholder={t('form.genderPlaceholder')}
              icon={<PiGenderIntersexBold size={16} />}
            />

            <SearchDropdown
              options={professions}
              value={form.profession}
              onChange={set('profession')}
              placeholder={t('form.professionPlaceholder')}
              subLabel={t('form.professionSubLabel')}
              searchPlaceholder={t('form.searchPlaceholder')}
              noResultsLabel={t('form.noResults')}
              icon={<FiSearch size={16} />}
            />

            <FieldBox icon={<FiMapPin size={16} />}>
              <input
                type="text"
                value={form.location}
                onChange={(e) => set('location')(e.target.value)}
                placeholder={t('form.locationPlaceholder')}
                className="w-full px-3 py-3.5 text-sm text-slate-800 placeholder-slate-400 placeholder:text-[13px] bg-transparent outline-none"
              />
            </FieldBox>

            <SearchDropdown
              options={educationOptions}
              value={form.education}
              onChange={set('education')}
              placeholder={t('form.educationPlaceholder')}
              subLabel={t('form.educationSubLabel')}
              searchPlaceholder={t('form.searchPlaceholder')}
              noResultsLabel={t('form.noResults')}
              icon={<FiBookOpen size={16} />}
            />
          </div>

          <motion.button
            onClick={handleNext}
            disabled={!allFilled}
            whileHover={allFilled ? { scale: 1.015 } : {}}
            whileTap={allFilled ? { scale: 0.985 } : {}}
            className={`mt-6 w-full py-4 rounded-xl text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 ${allFilled
              ? 'bg-[#3F51B5] shadow-[0_4px_20px_rgba(63,81,181,0.35)] cursor-pointer'
              : 'bg-slate-300 cursor-not-allowed'
              }`}
          >
            {t('form.continue')}
            <FiArrowRight size={18} />
          </motion.button>


        </div>

      </div>

    </div>
  )
}
