import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi'

import type { Candidate } from '../../types'

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

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

export function CandidateCard({
  candidate,
  index,
}: {
  candidate: Candidate
  index: number
}) {
  const { t } = useTranslation('searchCandidates')
  const [hired, setHired] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const isDone = hired || skipped

  const handleHire = () => {
    setHired(true)
    toast.success(t('toast.hired', { name: candidate.name }), {
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
    toast(t('toast.skipped'), {
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
      <motion.div
        className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[#3F51B5]"
        initial={{ opacity: 0, scaleY: 0 }}
        whileHover={{ opacity: isDone ? 0 : 1, scaleY: 1 }}
        transition={{ duration: 0.18 }}
      />

      <AnimatePresence>
        {hired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-[#3F51B5] text-white text-[10px] font-bold px-2 py-1 rounded-full"
          >
            <FiCheckCircle size={9} />
            {t('card.badges.hired')}
          </motion.div>
        )}
      </AnimatePresence>

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

      <div className="space-y-1.5 mb-4 flex-1">
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiMapPin size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span className="truncate">{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiClock size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span>{t('card.meta.availableFrom', { date: candidate.availableFrom })}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[12px]">
          <FiPhone size={12} className="shrink-0 text-[#3F51B5]/50" />
          <span>{candidate.phone}</span>
        </div>
      </div>

      <div className="border-t border-slate-50 mb-3" />

      <div className="flex gap-2">
        <motion.button
          whileTap={!isDone ? { scale: 0.95 } : {}}
          onClick={handleSkip}
          disabled={isDone}
          className="flex-1 hover:cursor-pointer flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('card.actions.skip')}
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
          {hired ? t('card.actions.hired') : t('card.actions.hire')}
        </motion.button>
      </div>
    </motion.div>
  )
}

