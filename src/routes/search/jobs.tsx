import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'
import type { Job } from '../../features/search/jobs/types'
import {
  JOBS_SEARCH_DEBOUNCE_MS,
  PAY_TYPE_KEYS,
  type PayFilterKey,
} from '../../features/search/jobs/constants'
import { JobCard } from '../../features/search/jobs/components/card/JobCard'
import { ShimmerCard } from '../../features/search/jobs/components/card/ShimmerCard'
import { FiBriefcase, FiSearch, FiSliders, FiX } from 'react-icons/fi'
import { LuLoaderCircle } from 'react-icons/lu'
import { AnimatePresence, motion } from 'framer-motion'

export const Route = createFileRoute('/search/jobs')({
  beforeLoad: () => {
    const { isVerified, user } = useOnboardingFlowStore.getState()
    if (!isVerified || !user) throw redirect({ to: '/search/jobs' })
    if (user.userType !== 'seeker') throw redirect({ to: '/search/candidates' })
  },
  component: JobsRoute,
})

function getPayType(payLabel: string): Exclude<PayFilterKey, 'all'> {
  return payLabel.toLowerCase().includes('day') ? 'perDay' : 'perShift'
}

function parsePayAmount(payLabel: string): number {
  const match = payLabel.match(/[\d,]+/)
  return match ? parseInt(match[0].replace(',', ''), 10) : 0
}


function EmptyState({ query }: { query: string }) {
  const { t } = useTranslation('searchJobs')
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <FiBriefcase size={22} className="text-slate-300" />
      </div>
      <p className="text-slate-600 font-semibold text-[15px]">{t("empty.title")}</p>
      <p className="text-slate-400 text-sm mt-1">
        {query
          ? t('empty.subtitle.withQuery', { query })
          : t('empty.subtitle.noQuery')}
      </p>
    </motion.div>
  )
}

// module-level timer ref (avoids closure issues without useRef)
let searchTimer: ReturnType<typeof setTimeout>

function JobsRoute() {
  const { t } = useTranslation('searchJobs')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [payFilter, setPayFilter] = useState<PayFilterKey>('all')
  const [sortBy, setSortBy] = useState<'default' | 'pay-high' | 'pay-low'>('default')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setIsTyping(true)
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      setDebouncedSearch(val)
      setIsTyping(false)
    }, JOBS_SEARCH_DEBOUNCE_MS)
  }

  const clearSearch = () => {
    clearTimeout(searchTimer)
    setSearch('')
    setDebouncedSearch('')
    setIsTyping(false)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await fetch('https://zupro-backend.vercel.app/api/v1/jobs')
      if (!res.ok) throw new Error('Failed to fetch jobs')
      return res.json() as Promise<{ jobs: Job[] }>
    },
    staleTime: 0,
  })

  const jobs = data?.jobs ?? []

  const filtered = useMemo(() => {
    let result = [...jobs]
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (j) => j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q),
      )
    }
    if (payFilter !== 'all') result = result.filter((j) => getPayType(j.payLabel) === payFilter)
    if (sortBy === 'pay-high') result.sort((a, b) => parsePayAmount(b.payLabel) - parsePayAmount(a.payLabel))
    else if (sortBy === 'pay-low') result.sort((a, b) => parsePayAmount(a.payLabel) - parsePayAmount(b.payLabel))
    return result
  }, [jobs, debouncedSearch, payFilter, sortBy])

  const activeFilterCount = (payFilter !== 'all' ? 1 : 0) + (sortBy !== 'default' ? 1 : 0)

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden bg-[#f0f0f5]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Fixed header Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className="bg-[#1e1b4b] px-4 sm:px-6 pt-7 pb-5 shrink-0">
        <div className="max-w-5xl mx-auto">

          {/* Title row */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">
                {t('header.badge')}
              </p>
              <h1 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                {t('header.title.before')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-400">
                  {t('header.title.highlight')}
                </span>
              </h1>
            </div>
            {!isLoading && !isError && (
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-300 text-xs font-medium hidden sm:block pb-0.5"
              >
              {t('resultsFound', { count: filtered.length })}
              </motion.span>
            )}
          </div>

          {/* Search + filter row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-white/30 focus-within:bg-white/13 transition-all duration-200">
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="shrink-0 text-amber-300">
                    <LuLoaderCircle size={15} className="animate-spin" />
                  </motion.span>
                ) : (
                  <motion.span key="mag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="shrink-0 text-indigo-400">
                    <FiSearch size={15} />
                  </motion.span>
                )}
              </AnimatePresence>

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('search.placeholder')}
                className="flex-1 bg-transparent  text-white text-[13px] outline-none"
              />

              <AnimatePresence>
                {isTyping && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    className="text-amber-300 text-[11px] font-semibold shrink-0 hidden sm:block"
                  >
                    {t('search.searching')}
                  </motion.span>
                )}
                {search && !isTyping && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    onClick={clearSearch}
                    className="text-indigo-300 hover:text-white transition-colors shrink-0"
                  >
                    <FiX size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters((v) => !v)}
              className={`relative hover:cursor-pointer flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 border ${
                showFilters
                  ? 'bg-white text-[#3F51B5] border-white shadow-md'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
              }`}
            >
              <FiSliders size={15} />
              <span className="hidden sm:inline">{t("filters.button")}</span>
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[#1e1b4b] text-[9px] font-bold flex items-center justify-center"
                  >
                    {activeFilterCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 flex flex-col sm:flex-row gap-3 sm:gap-6">
                  <div className="flex-1">
                    <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                      {t('filters.payType.label')}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {PAY_TYPE_KEYS.map((k) => (
                        <motion.button
                          key={k}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setPayFilter(k)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 ${
                            payFilter === k
                              ? 'bg-white text-[#3F51B5] shadow-sm'
                              : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                          }`}
                        >
                          {t(`filters.payType.options.${k}`)}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                      {t('filters.sort.label')}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {(
                        [
                          { key: 'default', labelKey: 'filters.sort.options.default' },
                          { key: 'pay-high', labelKey: 'filters.sort.options.highLow' },
                          { key: 'pay-low', labelKey: 'filters.sort.options.lowHigh' },
                        ] as const
                      ).map(({ key, labelKey }) => (
                        <motion.button
                          key={key}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setSortBy(key)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 ${
                            sortBy === key
                              ? 'bg-white text-[#3F51B5] shadow-sm'
                              : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                          }`}
                        >
                          {t(labelKey)}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setPayFilter('all'); setSortBy('default') }}
                      className="self-end sm:self-center text-[11px] text-indigo-300 hover:text-white underline underline-offset-2 transition-colors shrink-0"
                    >
                      {t('filters.clearAll')}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Scrollable content Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">

          {/* Mobile result count */}
          {!isLoading && !isError && (
            <motion.p
              key={filtered.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-400 text-[12px] font-medium mb-4 sm:hidden"
            >
              {t('resultsFound', { count: filtered.length })}
            </motion.p>
          )}

          {/* Error */}
          {isError && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-semibold text-sm">{t("errors.loadFailedTitle")}</p>
              <p className="text-red-400 text-xs mt-1">{t("errors.loadFailedSubtitle")}</p>
            </div>
          )}

          {/* Grid: 1 col / 2 col sm / 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)
              : filtered.length === 0
              ? <EmptyState query={debouncedSearch} />
              : filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)
            }
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}




