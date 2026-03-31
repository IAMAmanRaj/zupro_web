import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function LandingFooter() {
  const { t } = useTranslation('home')

  const links = [
    {
      to: '/auth',
      label: 'landing.footer.getStarted',
    },
    {
      to: '/contact-us',
      label: 'landing.footer.contactUs',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true, amount: 0.35 }}
      className="mt-12 sm:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease }}
        viewport={{ once: true, amount: 0.35 }}
        className="flex items-center gap-4"
      >
        <motion.span
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          viewport={{ once: true, amount: 0.35 }}
          className="sora-bold text-white font-black text-xl tracking-tight"
        >
          ZUPRO
        </motion.span>

        <motion.span
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.14, ease }}
          viewport={{ once: true, amount: 0.35 }}
          className="w-px h-4 bg-white/20 origin-top"
        />

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease }}
          viewport={{ once: true, amount: 0.35 }}
          className="cascadia-mono-light text-white/80 text-xs"
        >
          {t('landing.footer.network')}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease }}
        viewport={{ once: true, amount: 0.35 }}
        className="flex items-center justify-center gap-6"
      >
        {links.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.16 + index * 0.08,
              ease,
            }}
            viewport={{ once: true, amount: 0.35 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center"
          >
            <Link
              to={item.to}
              className="cascadia-mono-light text-white/80 text-xs transition-colors duration-300 hover:text-white/60"
            >
              {t(item.label)}
            </Link>

            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.26 + index * 0.08,
                ease,
              }}
              viewport={{ once: true, amount: 0.35 }}
              className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-white/30"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}