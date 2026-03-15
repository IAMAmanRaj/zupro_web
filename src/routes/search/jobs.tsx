import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'
import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiExternalLink,
  FiSliders,
  FiX,
  FiBriefcase,
  FiCheckCircle,
  FiSkipForward,
} from 'react-icons/fi'
import { LuLoaderCircle } from 'react-icons/lu'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/search/jobs')({
  beforeLoad: () => {
    const { isVerified, user } = useOnboardingFlowStore.getState()
    if (!isVerified || !user) throw redirect({ to: '/' })
    if (user.userType !== 'seeker') throw redirect({ to: '/search/candidates' })
  },
  component: JobsRoute,
})

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string
  title: string
  location: string
  joiningDate: string
  mapUrl: string
  payLabel: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PAY_TYPES = ['All', 'Per Day', 'Per Shift'] as const
type PayFilter = (typeof PAY_TYPES)[number]

function getPayType(payLabel: string): 'Per Day' | 'Per Shift' {
  return payLabel.toLowerCase().includes('day') ? 'Per Day' : 'Per Shift'
}

function parsePayAmount(payLabel: string): number {
  const match = payLabel.match(/[\d,]+/)
  return match ? parseInt(match[0].replace(',', ''), 10) : 0
}

// ─── Shimmer ──────────────────────────────────────────────────────────────────

function ShimmerCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 overflow-hidden relative">
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-100/80 to-transparent"
        style={{ animation: 'shimmer 1.4s infinite' }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg shrink-0" />
          <div className="h-4 w-28 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-5 w-14 bg-slate-100 rounded-full" />
      </div>
      <div className="h-3.5 w-3/5 bg-slate-100 rounded-lg" />
      <div className="h-3.5 w-2/5 bg-slate-100 rounded-lg" />
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="h-4 w-1/3 bg-slate-100 rounded-lg" />
        <div className="h-3.5 w-16 bg-slate-100 rounded-lg" />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
      </div>
    </div>
  )
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job, index }: { job: Job; index: number }) {
  const [applied, setApplied] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const payType = getPayType(job.payLabel)
  const isPerDay = payType === 'Per Day'

  const handleApply = () => {
    setApplied(true)
    toast.success('Application successful!', {
      style: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
        fontSize: '13px',
        borderRadius: '12px',
        border: '1px solid #e0e7ff',
        color: '#1e1b4b',
        padding: '10px 14px',
      },
      iconTheme: { primary: '#3F51B5', secondary: '#fff' },
    })
  }

  const handleSkip = () => {
    setSkipped(true)
    toast('Skipped', {
      style: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
        fontSize: '13px',
        borderRadius: '12px',
        border: '1px solid #f1f5f9',
        color: '#94a3b8',
        padding: '10px 14px',
      },
      icon: '↩',
    })
  }

  const isDone = applied || skipped

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!isDone ? { y: -3, boxShadow: '0 12px 40px rgba(63,81,181,0.10)' } : {}}
      className={`group hover:cursor-pointer bg-white rounded-2xl border flex flex-col p-5 relative overflow-hidden transition-all duration-200 ${
        applied
          ? 'border-[#3F51B5]/25 bg-indigo-50/20'
          : skipped
          ? 'border-slate-100 opacity-45 scale-[0.99]'
          : 'border-slate-100 hover:border-[#3F51B5]/20'
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[#3F51B5]"
        initial={{ opacity: 0, scaleY: 0 }}
        whileHover={{ opacity: isDone ? 0 : 1, scaleY: 1 }}
        transition={{ duration: 0.18 }}
      />

      {/* Applied badge */}
      <AnimatePresence>
        {applied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-[#3F51B5] text-white text-[10px] font-bold px-2 py-1 rounded-full"
          >
            <FiCheckCircle size={9} />
            Applied
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top row */}
      <div className="flex items-start gap-2.5 mb-3">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-[#3F51B5]/8 flex items-center justify-center mt-0.5">
          <FiBriefcase size={14} className="text-[#3F51B5]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[14px] font-bold text-slate-800 leading-snug line-clamp-2 flex-1">
              {job.title}
            </h3>
            {!applied && (
              <span
                className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  isPerDay
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}
              >
                {payType}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 mb-4 flex-1">
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiMapPin size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiClock size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span>{job.joiningDate}</span>
        </div>
      </div>

      {/* Pay + map */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50 mb-3">
        <div className="flex items-center gap-0.5">
    
          <span className="text-[13px] font-bold text-[#3F51B5]">{job.payLabel}</span>
        </div>
        <a
          href={job.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-[#3F51B5] transition-colors duration-150 px-2 py-1 rounded-lg hover:bg-[#3F51B5]/5"
        >
          <FiExternalLink size={11} />
          View map
        </a>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <motion.button
          whileTap={!isDone ? { scale: 0.95 } : {}}
          onClick={handleSkip}
          disabled={isDone}
          className="flex-1 hover:cursor-pointer flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          
          Skip
        </motion.button>
        <motion.button
          whileTap={!isDone ? { scale: 0.95 } : {}}
          onClick={handleApply}
          disabled={isDone}
          className={`flex-1 hover:cursor-pointer flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-150 disabled:cursor-not-allowed ${
            applied
              ? 'bg-[#3F51B5]/8 text-[#3F51B5] border border-[#3F51B5]/15'
              : 'bg-[#3F51B5] text-white shadow-[0_2px_10px_rgba(63,81,181,0.22)] hover:bg-[#3549a0] hover:shadow-[0_4px_18px_rgba(63,81,181,0.32)] disabled:opacity-40'
          }`}
        >
          
          {applied ? 'Applied' : 'Apply'}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <FiBriefcase size={22} className="text-slate-300" />
      </div>
      <p className="text-slate-600 font-semibold text-[15px]">No jobs found</p>
      <p className="text-slate-400 text-sm mt-1">
        {query ? `No results for "${query}"` : 'Try adjusting your filters'}
      </p>
    </motion.div>
  )
}

// ─── Main Route ───────────────────────────────────────────────────────────────

// module-level timer ref (avoids closure issues without useRef)
let searchTimer: ReturnType<typeof setTimeout>

function JobsRoute() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [payFilter, setPayFilter] = useState<PayFilter>('All')
  const [sortBy, setSortBy] = useState<'default' | 'pay-high' | 'pay-low'>('default')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setIsTyping(true)
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      setDebouncedSearch(val)
      setIsTyping(false)
    }, 380)
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
    if (payFilter !== 'All') result = result.filter((j) => getPayType(j.payLabel) === payFilter)
    if (sortBy === 'pay-high') result.sort((a, b) => parsePayAmount(b.payLabel) - parsePayAmount(a.payLabel))
    else if (sortBy === 'pay-low') result.sort((a, b) => parsePayAmount(a.payLabel) - parsePayAmount(b.payLabel))
    return result
  }, [jobs, debouncedSearch, payFilter, sortBy])

  const activeFilterCount = (payFilter !== 'All' ? 1 : 0) + (sortBy !== 'default' ? 1 : 0)

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden bg-[#f0f0f5]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* ── Fixed header ── */}
      <div className="bg-[#1e1b4b] px-4 sm:px-6 pt-7 pb-5 shrink-0">
        <div className="max-w-5xl mx-auto">

          {/* Title row */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-0.5">
                Available Jobs
              </p>
              <h1 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                Find your next shift
              </h1>
            </div>
            {!isLoading && !isError && (
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-300 text-xs font-medium hidden sm:block pb-0.5"
              >
                {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
              </motion.span>
            )}
          </div>

          {/* Search + filter row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-white/30 focus-within:bg-white/[0.13] transition-all duration-200">
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
                placeholder="Search by title or location…"
                className="flex-1 bg-transparent text-white placeholder-indigo-400 text-[13px] outline-none"
              />

              <AnimatePresence>
                {isTyping && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    className="text-amber-300 text-[11px] font-semibold shrink-0 hidden sm:block"
                  >
                    Searching…
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
              className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 border ${
                showFilters
                  ? 'bg-white text-[#3F51B5] border-white shadow-md'
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
              }`}
            >
              <FiSliders size={15} />
              <span className="hidden sm:inline">Filters</span>
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
                      Pay Type
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {PAY_TYPES.map((t) => (
                        <motion.button
                          key={t}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setPayFilter(t)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 ${
                            payFilter === t
                              ? 'bg-white text-[#3F51B5] shadow-sm'
                              : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                      Sort By Pay
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {(
                        [
                          { key: 'default', label: 'Default' },
                          { key: 'pay-high', label: 'High → Low' },
                          { key: 'pay-low', label: 'Low → High' },
                        ] as const
                      ).map(({ key, label }) => (
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
                          {label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setPayFilter('All'); setSortBy('default') }}
                      className="self-end sm:self-center text-[11px] text-indigo-300 hover:text-white underline underline-offset-2 transition-colors shrink-0"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Scrollable content ── */}
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
              {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
            </motion.p>
          )}

          {/* Error */}
          {isError && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-semibold text-sm">Failed to load jobs</p>
              <p className="text-red-400 text-xs mt-1">Check your connection and try again.</p>
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