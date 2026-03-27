import { useTranslation } from 'react-i18next'

export function HowItWorks() {
  const { t } = useTranslation('home')

  return (
    <>
      {/* ══════════════════════════════════════════
          BLOCK 4 — HOW IT WORKS
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-12 md:pt-20 lg:pt-28 pb-20 lg:pb-28">
        <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
          {t('landing.howItWorks.eyebrow')}
        </p>

        <h2 className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] tracking-tight mb-16 lg:mb-20 max-w-[700px]">
          {t('landing.howItWorks.headlinePrefix')}
          <br className="hidden lg:block" />
          <span className="text-[#3F51B5]">{t('landing.howItWorks.headlineHighlight')}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Workers */}
          <div>
            <div className="inline-block sora-bold text-white bg-[#3F51B5] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10">
              {t('landing.howItWorks.workersLabel')}
            </div>
            <div className="flex flex-col gap-8">
              {[
                { n: '01', text: t('landing.howItWorks.workersSteps.step1') },
                { n: '02', text: t('landing.howItWorks.workersSteps.step2') },
                { n: '03', text: t('landing.howItWorks.workersSteps.step3') },
                { n: '04', text: t('landing.howItWorks.workersSteps.step4') },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-6">
                  <span className="sora-bold text-[#1e1b4b]/15 font-black text-3xl leading-none tabular-nums shrink-0 mt-0.5">{n}</span>
                  <p className="cascadia-mono-light text-[#374151] text-sm leading-relaxed pt-1 border-t border-[rgba(63,81,181,0.12)] flex-1">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hirers */}
          <div>
            <div className="inline-block sora-bold text-white bg-[#1e1b4b] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10">
              {t('landing.howItWorks.hirersLabel')}
            </div>
            <div className="flex flex-col gap-8">
              {[
                { n: '01', text: t('landing.howItWorks.hirersSteps.step1') },
                { n: '02', text: t('landing.howItWorks.hirersSteps.step2') },
                { n: '03', text: t('landing.howItWorks.hirersSteps.step3') },
                { n: '04', text: t('landing.howItWorks.hirersSteps.step4') },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-6">
                  <span className="sora-bold text-[#1e1b4b]/15 font-black text-3xl leading-none tabular-nums shrink-0 mt-0.5">{n}</span>
                  <p className="cascadia-mono-light text-[#374151] text-sm leading-relaxed pt-1 border-t border-[rgba(63,81,181,0.12)] flex-1">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

