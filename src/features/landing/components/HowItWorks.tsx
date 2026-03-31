import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function HowItWorks() {
  const { t } = useTranslation('home')

  const workers = [
    { n: '01', text: t('landing.howItWorks.workersSteps.step1') },
    { n: '02', text: t('landing.howItWorks.workersSteps.step2') },
    { n: '03', text: t('landing.howItWorks.workersSteps.step3') },
    { n: '04', text: t('landing.howItWorks.workersSteps.step4') },
  ]

  const hirers = [
    { n: '01', text: t('landing.howItWorks.hirersSteps.step1') },
    { n: '02', text: t('landing.howItWorks.hirersSteps.step2') },
    { n: '03', text: t('landing.howItWorks.hirersSteps.step3') },
    { n: '04', text: t('landing.howItWorks.hirersSteps.step4') },
  ]

  return (
    <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-12 md:pt-20 lg:pt-28 pb-20 lg:pb-28">
      
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true }}
        className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8"
      >
        {t('landing.howItWorks.eyebrow')}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        viewport={{ once: true }}
        className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] tracking-tight mb-16 lg:mb-20 max-w-[700px]"
      >
        {t('landing.howItWorks.headlinePrefix')}
        <br className="hidden lg:block" />
        <span className="text-[#3F51B5]">
          {t('landing.howItWorks.headlineHighlight')}
        </span>
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Workers */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="inline-block sora-bold text-white bg-[#3F51B5] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10"
          >
            {t('landing.howItWorks.workersLabel')}
          </motion.div>

          <div className="flex flex-col gap-8">
            {workers.map(({ n, text }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1, // stagger without variants
                  ease,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="flex items-start gap-6"
              >
                <span className="sora-bold text-[#1e1b4b]/15 font-black text-3xl leading-none tabular-nums shrink-0 mt-0.5">
                  {n}
                </span>
                <p className="cascadia-mono-light text-[#374151] text-sm leading-relaxed pt-1 border-t border-[rgba(63,81,181,0.12)] flex-1">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hirers */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="inline-block sora-bold text-white bg-[#1e1b4b] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10"
          >
            {t('landing.howItWorks.hirersLabel')}
          </motion.div>

          <div className="flex flex-col gap-8">
            {hirers.map(({ n, text }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="flex items-start gap-6"
              >
                <span className="sora-bold text-[#1e1b4b]/15 font-black text-3xl leading-none tabular-nums shrink-0 mt-0.5">
                  {n}
                </span>
                <p className="cascadia-mono-light text-[#374151] text-sm leading-relaxed pt-1 border-t border-[rgba(63,81,181,0.12)] flex-1">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}