import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'
import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiPhone,
  FiSliders,
  FiX,
  FiUser,
  FiCheckCircle,
  FiBriefcase,
} from 'react-icons/fi'
import { LuLoaderCircle } from 'react-icons/lu'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/search/candidates')({
  beforeLoad: () => {
    const { isVerified, user } = useOnboardingFlowStore.getState()
    if (!isVerified || !user) throw redirect({ to: '/' })
    if (user.userType !== 'employer') throw redirect({ to: '/search/jobs' })
  },
  component: CandidatesRoute,
})

// ─── Types ────────────────────────────────────────────────────────────────────

interface Candidate {
  id: string
  name: string
  role: string
  location: string
  experience: string
  availableFrom: string
  phone: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const EXPERIENCE_FILTERS = ['All', '0–2 yrs', '2–4 yrs', '4+ yrs'] as const
type ExpFilter = (typeof EXPERIENCE_FILTERS)[number]

function getExpBucket(experience: string): '0–2 yrs' | '2–4 yrs' | '4+ yrs' {
  const num = parseFloat(experience)
  if (num < 2) return '0–2 yrs'
  if (num < 4) return '2–4 yrs'
  return '4+ yrs'
}

function parseExpYears(experience: string): number {
  return parseFloat(experience) || 0
}

// ─── Avatar initials ──────────────────────────────────────────────────────────

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  // deterministic hue from name
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  const bg = `hsl(${hue}, 55%, 92%)`
  const color = `hsl(${hue}, 55%, 30%)`

  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold shrink-0"
      style={{ backgroundColor: bg, color }}
    >
      {initials}
    </div>
  )
}

// ─── Shimmer ──────────────────────────────────────────────────────────────────

function ShimmerCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 overflow-hidden relative">
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-100/80 to-transparent"
        style={{ animation: 'shimmer 1.4s infinite' }}
      />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 w-28 bg-slate-100 rounded-lg" />
          <div className="h-3 w-20 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-5 w-14 bg-slate-100 rounded-full" />
      </div>
      <div className="h-3.5 w-3/5 bg-slate-100 rounded-lg" />
      <div className="h-3.5 w-2/5 bg-slate-100 rounded-lg" />
      <div className="h-3.5 w-1/2 bg-slate-100 rounded-lg" />
      <div className="pt-3 border-t border-slate-50 flex gap-2">
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
      </div>
    </div>
  )
}

// ─── Candidate Card ───────────────────────────────────────────────────────────

function CandidateCard({ candidate, index }: { candidate: Candidate; index: number }) {
  const [hired, setHired] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const isDone = hired || skipped

  const handleHire = () => {
    setHired(true)
    toast.success(`${candidate.name} hired!`, {
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
    toast('Candidate skipped', {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!isDone ? { y: -3, boxShadow: '0 12px 40px rgba(63,81,181,0.10)' } : {}}
      className={`group hover:cursor-pointer opacity-85 hover:opacity-100 bg-white rounded-2xl border flex flex-col p-5 relative overflow-hidden transition-all duration-200 ${
        hired
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

      {/* Hired badge */}
      <AnimatePresence>
        {hired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-[#3F51B5] text-white text-[10px] font-bold px-2 py-1 rounded-full"
          >
            <FiCheckCircle size={9} />
            Hired
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top row: avatar + name + exp badge */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={candidate.name} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-bold text-slate-800 leading-snug truncate">
            {candidate.name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <FiBriefcase size={11} className="text-[#3F51B5]/50 shrink-0" />
            <span className="text-[12px] text-slate-500 truncate">{candidate.role}</span>
          </div>
        </div>
        {!hired && (
          <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-violet-50 text-violet-700 border-violet-100">
            {candidate.experience}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="space-y-1.5 mb-4 flex-1">
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiMapPin size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span className="truncate">{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiClock size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span>Available from {candidate.availableFrom}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiPhone size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span>{candidate.phone}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-50 mb-3" />

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
          onClick={handleHire}
          disabled={isDone}
          className={`flex-1 hover:cursor-pointer flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-150 disabled:cursor-not-allowed ${
            hired
              ? 'bg-[#3F51B5]/8 text-[#3F51B5] border border-[#3F51B5]/15'
              : 'bg-[#3F51B5] text-white shadow-[0_2px_10px_rgba(63,81,181,0.22)] hover:bg-[#3549a0] hover:shadow-[0_4px_18px_rgba(63,81,181,0.32)] disabled:opacity-40'
          }`}
        >
          {hired ? 'Hired' : 'Hire'}
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
        <FiUser size={22} className="text-slate-300" />
      </div>
      <p className="text-slate-600 font-semibold text-[15px]">No candidates found</p>
      <p className="text-slate-400 text-sm mt-1">
        {query ? `No results for "${query}"` : 'Try adjusting your filters'}
      </p>
    </motion.div>
  )
}

// ─── Main Route ───────────────────────────────────────────────────────────────

let searchTimer: ReturnType<typeof setTimeout>

function CandidatesRoute() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [expFilter, setExpFilter] = useState<ExpFilter>('All')
  const [sortBy, setSortBy] = useState<'default' | 'exp-high' | 'exp-low'>('default')
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
    queryKey: ['candidates'],
    queryFn: async () => {
      const res = await fetch('https://zupro-backend.vercel.app/api/v1/candidates')
      if (!res.ok) throw new Error('Failed to fetch candidates')
      return res.json() as Promise<{ candidates: Candidate[] }>
    },
    staleTime: 0,
  })

  const candidates = data?.candidates ?? []

  const filtered = useMemo(() => {
    let result = [...candidates]

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q),
      )
    }

    if (expFilter !== 'All') {
      result = result.filter((c) => getExpBucket(c.experience) === expFilter)
    }

    if (sortBy === 'exp-high') {
      result.sort((a, b) => parseExpYears(b.experience) - parseExpYears(a.experience))
    } else if (sortBy === 'exp-low') {
      result.sort((a, b) => parseExpYears(a.experience) - parseExpYears(b.experience))
    }

    return result
  }, [candidates, debouncedSearch, expFilter, sortBy])

  const activeFilterCount = (expFilter !== 'All' ? 1 : 0) + (sortBy !== 'default' ? 1 : 0)

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
                Candidate Pool
              </p>
              <h1 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                Find your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#948dff] to-[#3F51B5]">
                  next hire !
                </span>
              </h1>
            </div>
            <motion.span
              key={filtered.length}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-indigo-300 text-xs font-medium hidden sm:block pb-0.5"
            >
              {filtered.length} candidate{filtered.length !== 1 ? 's' : ''} found
            </motion.span>
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
                placeholder="Search by name, role or location…"
                className="flex-1 bg-transparent text-white text-[13px] outline-none"
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
              className={`relative hover:cursor-pointer flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 border ${
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
                  {/* Experience bucket */}
                  <div className="flex-1">
                    <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                      Experience
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {EXPERIENCE_FILTERS.map((f) => (
                        <motion.button
                          key={f}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setExpFilter(f)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 ${
                            expFilter === f
                              ? 'bg-white text-[#3F51B5] shadow-sm'
                              : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                          }`}
                        >
                          {f}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="flex-1">
                    <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                      Sort By Experience
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {(
                        [
                          { key: 'default',  label: 'Default'     },
                          { key: 'exp-high', label: 'Most first'   },
                          { key: 'exp-low',  label: 'Least first'  },
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
                      onClick={() => { setExpFilter('All'); setSortBy('default') }}
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
            {filtered.length} candidate{filtered.length !== 1 ? 's' : ''} found
          </motion.p>
          )}

          {/* Error */}
          {isError && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center mb-4">
              <p className="text-red-600 font-semibold text-sm">Failed to load candidates</p>
              <p className="text-red-400 text-xs mt-1">Check your connection and try again.</p>
            </div>
          )}

          {/* Grid: 1 / 2 / 3 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)
              : filtered.length === 0
              ? <EmptyState query={debouncedSearch} />
              : filtered.map((c, i) => <CandidateCard key={c.id} candidate={c} index={i} />)
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