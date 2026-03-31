import { HiArrowRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function Insights() {
  const { t } = useTranslation('home')

  return (
    <>
      {/* ── TOP DARK BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="bg-[#1e1b4b] sora-bold py-6 px-5 lg:px-16"
      >
        <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white text-[15px] tracking-[0.28em] uppercase font-bold">
            {t('landing.insight.eyebrow')}
          </p>
          <p className="text-white font-semibold text-[15px]">
            {t('landing.insight.subtitlePrefix')}{' '}
            <span className="text-[#7986cb]">
              {t('landing.insight.subtitleHighlight')}
            </span>
          </p>
        </div>
      </motion.div>

      {/* ── MAIN SECTION ── */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-16 lg:pt-24">
        
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="md:mb-16 lg:mb-20"
        >
          <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
            {t('landing.insight.sectionTitle')}
          </p>

          {/* ROWS CONTAINER */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
            className="flex flex-col gap-4 border-t border-[rgba(63,81,181,0.12)] pt-10"
          >
            {[
              {
                before: t('landing.insight.pairs.pair1.before'),
                after: t('landing.insight.pairs.pair1.after'),
                dim: true,
                highlight: false,
              },
              {
                before: t('landing.insight.pairs.pair2.before'),
                after: t('landing.insight.pairs.pair2.after'),
                dim: true,
                highlight: false,
              },
              {
                before: t('landing.insight.pairs.pair3.before'),
                after: t('landing.insight.pairs.pair3.after'),
                dim: false,
                highlight: true,
              },
            ].map(({ before, after, dim, highlight }) => (
              
              <motion.div
                key={after}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.4 },
                  },
                }}
                className={`flex hover:cursor-pointer hover:opacity-100 opacity-80 transition-all duration-300 items-center justify-between gap-6 pb-4 border-b ${
                  highlight
                    ? 'border-[#3F51B5]/30'
                    : 'border-[rgba(63,81,181,0.08)]'
                }`}
              >
                
                {/* LEFT TEXT */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className={`text-xl md:text-2xl lg:text-3xl sora-bold font-black tracking-tight ${
                    dim ? 'text-[#1e1b4b]/30' : 'text-[#1e1b4b]'
                  }`}
                >
                  {before}
                </motion.p>

                {/* RIGHT SIDE */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="flex items-center gap-3 shrink-0"
                >
                  <HiArrowRight
                    size={16}
                    className={dim ? 'text-[#1e1b4b]/20' : 'text-[#3F51B5]'}
                  />

                  <p
                    className={`text-xl md:text-2xl lg:text-3xl sora-bold font-black tracking-tight ${
                      highlight
                        ? 'text-[#3F51B5]'
                        : 'text-[#1e1b4b]/30'
                    }`}
                  >
                    {after}
                  </p>

                  {highlight && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                      viewport={{ once: true }}
                      className="hidden sora-bold sm:inline-block text-[10px] font-bold tracking-[0.16em] uppercase bg-[#3F51B5] text-white px-3 py-1.5 rounded-full"
                    >
                      {t('landing.insight.badge')}
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}