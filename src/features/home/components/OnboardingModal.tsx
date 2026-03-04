import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi2'
import {
  RiBriefcase4Line,
  RiSearchLine,
  RiArrowRightLine,
  RiCloseLine,
} from 'react-icons/ri'

type OnboardingModalProps = {
  seekerPerks: string[]
  hirerPerks: string[]
}

export function OnboardingModal({
  seekerPerks,
  hirerPerks,
}: OnboardingModalProps) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<'seeker' | 'hirer' | null>(
    null,
  )

  const handleRoleSelect = (to: '/onboarding/seeker' | '/onboarding/employer') => {
    setIsModalOpen(false)
    navigate({ to })
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setIsModalOpen(false)}
          />

          <motion.div
            key="modal"
            className="fixed cascadia-mono-light inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="pointer-events-auto relative w-full max-w-[760px] rounded-3xl bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-8 pt-8 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5 mb-1">
                  <HiOutlineSparkles className="text-[#3F51B5]" size={20} />
                  <p className="text-xs font-semibold text-[#3F51B5] tracking-widest">
                    Welcome to Zupro
                  </p>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 leading-snug">
                  How would you like to get started?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-0 divide-x divide-slate-100">
                <motion.div
                  className="relative p-7 flex flex-col cursor-pointer group"
                  onHoverStart={() => setHoveredCard('seeker')}
                  onHoverEnd={() => setHoveredCard(null)}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-row gap-1 items-center">
                    <h3 className="text-lg font-extrabold text-slate-800">
                      Find a Job
                    </h3>
                    <motion.div
                      className="w-8 h-8 mb-2 flex items-center justify-center"
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <RiSearchLine className="text-[#3F51B5] mt-1" size={26} />
                    </motion.div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    Browse hundreds of daily jobs near you.
                  </p>

                  <ul className="flex flex-col gap-2 mb-6">
                    {seekerPerks.map((perk) => (
                      <motion.li
                        key={perk}
                        className="flex items-center gap-2 text-sm text-slate-600"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3F51B5] flex-shrink-0" />
                        {perk}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    type="button"
                    className="mt-auto hover:cursor-pointer w-full rounded-xl bg-[#3F51B5] py-3 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-md"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRoleSelect('/onboarding/seeker')}
                  >
                    Search
                    <motion.span
                      animate={hoveredCard === 'seeker' ? { x: 4 } : { x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RiArrowRightLine size={16} />
                    </motion.span>
                  </motion.button>
                </motion.div>

                <motion.div
                  className="relative p-7 flex flex-col cursor-pointer group"
                  onHoverStart={() => setHoveredCard('hirer')}
                  onHoverEnd={() => setHoveredCard(null)}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-row gap-1 items-center">
                    <h3 className="text-lg font-extrabold text-slate-800 mb-1">
                      Hire
                    </h3>
                    <motion.div
                      className="w-8 h-8 mb-2 flex items-center justify-center"
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <RiBriefcase4Line className="text-amber-500 mt-1" size={26} />
                    </motion.div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    Hire now, and get the work done !
                  </p>

                  <ul className="flex flex-col gap-2 mb-6">
                    {hirerPerks.map((perk) => (
                      <motion.li
                        key={perk}
                        className="flex items-center gap-2 text-sm text-slate-600"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {perk}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    type="button"
                    className="mt-auto w-full rounded-xl hover:cursor-pointer border-2 border-amber-400 bg-white py-3 text-sm font-bold text-amber-600 flex items-center justify-center gap-2"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRoleSelect('/onboarding/employer')}
                  >
                    Proceed to hire
                    <motion.span
                      animate={hoveredCard === 'hirer' ? { x: 4 } : { x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RiArrowRightLine size={16} />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>

              <div className="flex justify-center py-5 border-t border-slate-100 bg-slate-50/60">
                <motion.button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-2 text-slate-400 text-sm font-medium px-5 py-2 rounded-full border border-[#3F51B5] hover:cursor-pointer bg-white hover:border-slate-300 hover:text-slate-600 transition-colors"
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                  whileTap={{
                    scale: 0.96,
                    transition: { duration: 0.5, ease: 'easeInOut' },
                  }}
                >
                  <RiCloseLine size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
