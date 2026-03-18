import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiMapPin,
} from 'react-icons/fi'

import type { Job } from '../../types'

function getPayType(payLabel: string): 'perDay' | 'perShift' {
  return payLabel.toLowerCase().includes('day') ? 'perDay' : 'perShift'
}

export function JobCard({ job, index }: { job: Job; index: number }) {
  const { t } = useTranslation('searchJobs')
  const [applied, setApplied] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const payType = getPayType(job.payLabel)
  const isPerDay = payType === 'perDay'

  const handleApply = () => {
    setApplied(true)
    toast.success(t('toast.applied'), {
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
      <motion.div
        className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[#3F51B5]"
        initial={{ opacity: 0, scaleY: 0 }}
        whileHover={{ opacity: isDone ? 0 : 1, scaleY: 1 }}
        transition={{ duration: 0.18 }}
      />

      <AnimatePresence>
        {applied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-[#3F51B5] text-white text-[10px] font-bold px-2 py-1 rounded-full"
          >
            <FiCheckCircle size={9} />
            {t('card.badges.applied')}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2.5 mb-3">
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
                    : 'bg-white text-[#3F51B5] border-[#1e1b4b]/10'
                }`}
              >
                {t(`filters.payType.options.${payType}`)}
              </span>
            )}
          </div>
        </div>
      </div>

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
          {t('card.links.viewMap')}
        </a>
      </div>

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
          onClick={handleApply}
          disabled={isDone}
          className={`flex-1 hover:cursor-pointer flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-150 disabled:cursor-not-allowed ${
            applied
              ? 'bg-[#3F51B5]/8 text-[#3F51B5] border border-[#3F51B5]/15'
              : 'bg-[#3F51B5] text-white shadow-[0_2px_10px_rgba(63,81,181,0.22)] hover:bg-[#3549a0] hover:shadow-[0_4px_18px_rgba(63,81,181,0.32)] disabled:opacity-40'
          }`}
        >
          {applied ? t('card.actions.applied') : t('card.actions.apply')}
        </motion.button>
      </div>
    </motion.div>
  )
}
