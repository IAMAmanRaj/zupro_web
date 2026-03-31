import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Team() {
  const { t } = useTranslation('home')

  return (
    <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-4 lg:pt-4 pb-20 lg:pb-28">
      
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true }}
        className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8"
      >
        {t('landing.team.eyebrow')}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        viewport={{ once: true }}
        className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] tracking-tight mb-16 max-w-[640px]"
      >
        {t('landing.team.headlinePrefix')}
        <br />
        <span className="text-[#3F51B5]">
          {t('landing.team.headlineHighlight')}
        </span>
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[rgba(63,81,181,0.1)]">
        
        {/* Aman */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="bg-white lg:p-12"
        >
          <div className="flex items-center gap-5 mb-8">
            <div>
              <p className="sora-bold text-[#1e1b4b] font-black text-xl tracking-tight leading-tight">
                {t('landing.team.members.aman.name')}
              </p>
              <p className="text-[#E65100] cascadia-mono-light text-xs font-semibold tracking-[0.12em] uppercase mt-1">
                {t('landing.team.members.aman.role')}
              </p>
            </div>
          </div>

          <div className="border border-[rgba(63,81,181,0.12)] p-2 mb-7">
            <p className="cascadia-mono-light text-[#6B7280] text-xs leading-relaxed">
              {t('landing.team.members.aman.line1')}
              <br />
              {t('landing.team.members.aman.line2')}
            </p>
          </div>
        </motion.div>

        {/* Atulya */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="bg-white pt-8 lg:p-12"
        >
          <div className="flex items-center gap-5 mb-8">
            <div>
              <p className="sora-bold text-[#1e1b4b] font-black text-xl tracking-tight leading-tight">
                {t('landing.team.members.atulya.name')}
              </p>
              <p className="text-[#3F51B5] cascadia-mono-light text-xs font-semibold tracking-[0.12em] uppercase mt-1">
                {t('landing.team.members.atulya.role')}
              </p>
            </div>
          </div>

          <div className="border border-[rgba(63,81,181,0.12)] p-2 mb-7">
            <p className="cascadia-mono-light text-[#6B7280] text-xs leading-relaxed">
              {t('landing.team.members.atulya.line1')}
              <br />
              {t('landing.team.members.atulya.line2')}
            </p>
          </div>
        </motion.div>

      </div>

      {/* IIT Note */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        viewport={{ once: true }}
        className="mt-8 bg-[#1e1b4b] px-4 lg:px-12 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        <p className="cascadia-mono-light text-white/90 text-xs">
          {t('landing.team.noteLine1')}
        </p>
        <p className="cascadia-mono-light text-white/90 text-xs">
          {t('landing.team.noteLine2')}
        </p>
      </motion.div>

    </div>
  )
}