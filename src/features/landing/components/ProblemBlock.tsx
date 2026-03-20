import { HiArrowRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

export function LandingProblemBlock() {
  const { t } = useTranslation('home')

  return (
    <>
      {/* ══════════════════════════════════════════
          BLOCK 1 — THE PROBLEM
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-10 pt-20 lg:pt-4 pb-16 lg:pb-20">
        {/* Eyebrow */}
        <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-10">
          {t('landing.problem.eyebrow')}
        </p>

        {/* ── Asymmetric header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-16 lg:mb-20">
          <h2 className="sora-bold text-[#1e1b4b] text-3xl  sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black leading-[1.05] tracking-tight max-w-[620px]">
            {t('landing.problem.titleLine1')}
            <br />
            {t('landing.problem.titleLine2')}
          </h2>
          <p className="text-[#3F51B5] cascadia-mono-light italic text-lg md:text-xl lg:text-2xl lg:text-right max-w-[375px] sm:max-w-[280px] lg:mb-2 leading-snug">
            {t('landing.problem.quotePrefix')}
            <br className="hidden lg:block" />
            {t('landing.problem.quoteSuffix')}
          </p>
        </div>

        {/* ── Cinematic quote — large text, no cards ── */}
        <div className="border-t border-[rgba(63,81,181,0.12)] pt-10 mb-10">
          <div className="flex flex-col gap-5">
            {[
              {
                text: t('landing.problem.quoteLines.line1'),
                size: 'text-[25px] sm:text-3xl md:text-4xl lg:text-5xl',
                opacity: 'text-[#1e1b4b]',
              },
              {
                text: t('landing.problem.quoteLines.line2'),
                size: 'text-[20px] sm:text-2xl md:text-3xl lg:text-4xl',
                opacity: 'text-[#1e1b4b]/60',
              },
              {
                text: t('landing.problem.quoteLines.line3'),
                size: 'text-[15px] sm:text-xl md:text-2xl lg:text-3xl',
                opacity: 'text-[#1e1b4b]/35',
              },
            ].map(({ text, size, opacity }) => (
              <p key={text} className={`sora-bold font-black italic leading-none ${size} ${opacity} tracking-tight`}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Trailing context line */}
        <div className="flex gap-2 items-center w-full mb-20">
          <div className="w-[40%] sm:w-[90%] md:w-full h-px bg-[#3F51B5]" />
          <div className="text-[#6B7280] max-w-[350px] flex justify-center text-center sm:max-w-[500px] md:w-full cascadia-mono-light text-sm">
            <span className="">
              {t('landing.problem.trailingPrefix')}{' '}
              <span className="cascadia-mono-bold text-black">{t('landing.problem.trailingBold')}</span>{' '}
              {t('landing.problem.trailingSuffix')}
            </span>
          </div>
          <div className="w-[40%] sm:w-[90%] md:w-full h-px bg-[#3F51B5]" />
        </div>

        {/* ── Stats — side-by-side with dividing lines ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(63,81,181,0.12)]">
          {[
            {
              value: t('landing.problem.stats.stat1.value'),
              label: t('landing.problem.stats.stat1.label'),
              sub: t('landing.problem.stats.stat1.sub'),
            },
            {
              value: t('landing.problem.stats.stat2.value'),
              label: t('landing.problem.stats.stat2.label'),
              sub: t('landing.problem.stats.stat2.sub'),
            },
            {
              value: t('landing.problem.stats.stat3.value'),
              label: t('landing.problem.stats.stat3.label'),
              sub: t('landing.problem.stats.stat3.sub'),
            },
          ].map(({ value, label, sub }) => (
            <div key={value} className="cascadia-mono-light sm:px-10 first:pl-0 last:pr-0 py-8 sm:py-0">
              <div className="sora-bold text-[#1e1b4b] text-5xl lg:text-6xl font-black leading-none mb-3 tracking-tight">
                {value}
              </div>
              <div className="text-[#3F51B5] font-semibold text-sm mb-2">{label}</div>
              <p className="text-[#9CA3AF] text-xs leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-14 border-t border-[rgba(63,81,181,0.12)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[#1e1b4b] cascadia-mono-light font-semibold text-sm max-w-[480px] leading-relaxed">
            {t('landing.problem.calloutPrefix')}{' '}
            <span className="text-[#3F51B5]">{t('landing.problem.calloutHighlight')}</span>
          </p>
          <span className="flex sora-bold items-center gap-2 text-[#9CA3AF] text-[10px] font-bold tracking-[0.22em] uppercase">
            {t('landing.problem.untilNow')} <HiArrowRight size={12} />
          </span>
        </div>
      </div>
    </>
  )
}

