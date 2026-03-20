import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { FaAnglesDown } from 'react-icons/fa6'

export function LandingHero() {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  return (
    <>
      {/* ── DESKTOP HERO (lg and above) ── */}
      <section className="relative  hidden lg:flex h-screen bg-white items-center pt-24">
        <div className="w-full mx-auto px-6 lg:px-16 lg:flex flex-row items-center justify-center gap-12 py-20 ">
          {/* LEFT: Text block */}
          <div className="flex-1 md:max-w-[720px] -mt-24">
            <h1 className="text-[#111827] text-[40px] xlg:text-[48px] xl:text-6xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="sora-bold">{t('landing.hero.headlinePart1')}</span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 sora-bold text-[#800020]/80">{t('landing.hero.headlinePart2')}</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 320 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M2 9C60 3 140 1 318 9" stroke="#F5A022" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{' '}
              <span className="sora-bold">{t('landing.hero.headlinePart3')}</span>
            </h1>

            <p className="text-[#4B5563] cascadia-mono-light mb-10 max-w-[460px] text-lg">
              {t('landing.hero.subtitlePrefix')}
              <span className="font-semibold text-[#1B2A4A]">{t('landing.hero.subtitleEmphasis')}</span>
            </p>

            {/* CTA Buttons */}
            <div className="-mt-3 flex gap-3 md:gap-4 w-full max-w-[500px] px-1">
              <button
                type="button"
                onClick={() => navigate({ to: '/onboarding/seeker' })}
                className="cascadia-mono-light flex-1 hover:cursor-pointer rounded-xl bg-[#3F51B5] px-4 md:px-6 py-3 md:py-3.5 text-sm lg:text-lg xlg:text-xl xl:text-2xl font-bold text-white shadow-md transition-all duration-200 hover:bg-[#3647a3] hover:shadow-lg active:scale-[0.98]"
              >
                {t('hero.findJobsCta')}
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: '/onboarding/employer' })}
                className="cascadia-mono-light flex-1 hover:cursor-pointer rounded-xl border-2 border-[#3F51B5] bg-white px-4 md:px-6 py-3 md:py-3.5 text-sm lg:text-lg xlg:text-xl xl:text-2xl font-bold text-[#3F51B5] shadow-sm transition-all duration-200 hover:bg-[#eef1ff] hover:shadow-md active:scale-[0.98]"
              >
                {t('hero.hireNowCta')}
              </button>
            </div>
          </div>

          {/* RIGHT: Phone hand asset */}
          <div className="relative w-full lg:max-w-[440px] xlg:w-[500px] xl:scale-130 flex items-end justify-center">
            <img
              src="/images/landing/mobile_hand_asset.png"
              alt={t('landing.hero.imageAlt')}
              className="relative z-10 w-full object-contain"
            />
          </div>

          {/* Floating down arrow */}
          <div className="absolute hover:cursor-pointer left-1/2 -translate-x-1/2 bottom-12 hover:scale-120 animate-bounce [animation-duration:4s] text-[#3F51B5] opacity-80 hover:opacity-100 transition-all duration-300">
            <FaAnglesDown size={26} strokeWidth={2.5} />
          </div>

        </div>
        
      </section>

      {/* ── MOBILE HERO (under lg) ── */}
      <div className="lg:hidden bg-white flex flex-col items-center px-5 pt-18 pb-8">
        {/* Headline */}
        <h1 className="sora-bold mt-4 vs:mt-8 md:mt-24 text-[#1B2A4A] text-[22px] vs:text-[40px] sm:text-[24px] md:text-5xl font-black leading-tight tracking-tight text-center mb-4">
          {t('landing.hero.mobileHeadlineLine1')}
          <br />
          {t('landing.hero.mobileHeadlineLine2')}
        </h1>

        {/* Subtitle */}
        <p className="text-[#6B7280] cascadia-mono-light text-[11px] vs:text-[15px] text-center leading-relaxed max-w-[400px] md:max-w-[500px] mb-4">
          {t('landing.hero.subtitle')}
        </p>

        {/* Phone hand asset */}
        <img
          src="/images/landing/mobile_hand_asset.png"
          alt={t('landing.hero.imageAlt')}
          className="object-cover w-[280px] -mt-2 h-[280px] vs:w-[300px] vs:h-[300px] md:h-[500px] md:w-[500px] md:mt-16"
        />

        {/* CTA Buttons */}
        <div className=" -mt-3 vs:-mt-1 flex flex-col gap-3 md:gap-4 w-full max-w-[320px] px-1">
          <button
            type="button"
            onClick={() => navigate({ to: '/onboarding/seeker' })}
            className="cascadia-mono-light flex-1 hover:cursor-pointer rounded-xl bg-[#3F51B5] px-4 md:px-6 py-3 md:py-3.5 text-sm md:text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#3647a3] hover:shadow-lg active:scale-[0.98]"
          >
            {t('hero.findJobsCta')}
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: '/onboarding/employer' })}
            className="cascadia-mono-light flex-1 hover:cursor-pointer rounded-xl border-2 border-[#3F51B5] bg-white px-4 md:px-6 py-3 md:py-3.5 text-sm md:text-base font-bold text-[#3F51B5] shadow-sm transition-all duration-200 hover:bg-[#eef1ff] hover:shadow-md active:scale-[0.98]"
          >
            {t('hero.hireNowCta')}
          </button>
        </div>

        {/* Floating down arrow */}
        <div className="mt-7 vs:mt-8 animate-bounce [animation-duration:4s] text-[#3F51B5] opacity-80">
          <FaAnglesDown size={26} strokeWidth={2.5} />
        </div>
      </div>
    </>
  )
}

