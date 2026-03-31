import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { OtpSection } from '../../features/auth/components/OtpSection'
import { PhoneStep } from '../../features/auth/components/PhoneStep'
import { RiShieldCheckLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { useOnboardingFlowStore } from '../../stores/onboardingFlowStore'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

// ─── Mobile top banner stats ──────────────────────────────────────────────────
function MobileStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-white text-base font-bold leading-tight">{value}</p>
      <p className="text-indigo-300 text-[11px] mt-0.5 leading-tight">{label}</p>
    </div>
  )
}

function RouteComponent() {
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [isSending, setIsSending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const phoneRef = useRef<HTMLInputElement>(null)
  const formPanelRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const completeOtpVerification = useOnboardingFlowStore((s) => s.completeOtpVerification)
  const setPendingSeeker = useOnboardingFlowStore((s) => s.setPendingSeeker)
  const setPendingEmployer = useOnboardingFlowStore((s) => s.setPendingEmployer)

  useEffect(() => {
    phoneRef.current?.focus()
  }, [])

  // Ensure /auth always starts at the top (native behavior).
  // This fixes offsets when navigating here from other pages while Lenis was active.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      formPanelRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

      const mainEl = document.querySelector('main')
      if (mainEl instanceof HTMLElement) {
        mainEl.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    })

    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!isVerified) return

    const timer = setTimeout(() => {
      const userType = useOnboardingFlowStore.getState().user?.userType
      if (userType === 'seeker') {
        navigate({ to: '/search/jobs' })
        return
      }
      if (userType === 'employer') {
        navigate({ to: '/search/candidates' })
        return
      }
      navigate({ to: '/' })
    }, 900)

    return () => clearTimeout(timer)
  }, [isVerified, navigate])

  const handleSendOtp = async () => {
    if (phone.length < 10) return
    setIsSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSending(false)
    setStep('otp')
  }

  const isPhoneValid = phone.length === 10

  const stepLabel = step === 'phone' ? t('auth.header.stepLabelPhone') : t('auth.header.stepLabelOtp')

  return (
    <div className="h-screen flex flex-col md:flex-row font-sans overflow-y-auto ">

      {/* ── Desktop left image panel (md+) ─────────────────────────────────── */}
      <div className="hidden md:block md:w-[55%] relative overflow-hidden">
        <img
          src="/images/auth/left_asset.webp"
          alt={t('auth.desktop.bannerAlt')}
          className="w-full h-full object-cover mt-16"
        />
      </div>

      {/* ── Mobile top banner (< md only) ──────────────────────────────────── */}
      <div className="md:hidden relative bg-[#1e1b4b] px-6 pt-26 pb-8 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

        {/* Logo */}
        {/* <div className="mb-5">
          <span
            className="text-white text-2xl font-extrabold tracking-tight select-none"
            style={{ fontFamily: '"Trebuchet MS", "Gill Sans", sans-serif' }}
          >
            Zupro
          </span>
          <div className="mt-0.5 w-8 h-1 rounded-full bg-amber-400" />
        </div> */}

        {/* Headline + badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 text-indigo-200 text-[11px] font-medium px-2.5 py-1 rounded-full mb-2">
          <RiShieldCheckLine size={11} />
          {t('auth.mobile.badge')}
        </div>
        <h2 className="text-white text-xl font-bold leading-snug mb-1">
          {t('auth.mobile.title')}
        </h2>
        <p className="text-indigo-300 text-xs leading-relaxed mb-5">
          {t('auth.mobile.subtitle')}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 border-t border-white/10 pt-4">
          <MobileStat
            value={t('auth.mobile.stats.activeJobsValue')}
            label={t('auth.mobile.stats.activeJobsLabel')}
          />
          <MobileStat
            value={t('auth.mobile.stats.avgMatchValue')}
            label={t('auth.mobile.stats.avgMatchLabel')}
          />
          <MobileStat
            value={t('auth.mobile.stats.freeValue')}
            label={t('auth.mobile.stats.freeLabel')}
          />
          <MobileStat
            value={t('auth.mobile.stats.trustedValue')}
            label={t('auth.mobile.stats.trustedLabel')}
          />
        </div>
      </div>

      {/* ── Right / bottom form panel ───────────────────────────────────────── */}
      <div
        ref={formPanelRef}
        className="flex-1 flex items-center justify-center px-6 py-8 sm:px-8 sm:py-12 bg-[#F3F4F4] "
      >
        <div className="w-full max-w-sm">

          {isVerified ? (
            <div className="scale-in flex flex-col items-center gap-4 py-12 text-center">
              <div className="check-pop w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{t('auth.verified.title')}</h2>
              <p className="text-sm text-slate-500">{t('auth.verified.subtitle')}</p>
            </div>

          ) : (
            <>
              {/* Brand — hidden on mobile since the banner above shows it */}
              <div className="mb-8 fade-up hidden md:block">
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-3xl font-extrabold tracking-tight text-primary">{t('brand.zu')}</span>
                  <span className="text-3xl font-extrabold tracking-tight text-slate-800">{t('brand.pro')}</span>
                  <span className="ml-1 mb-0.5 inline-block w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm font-medium text-slate-500">
                  {stepLabel}
                </p>
              </div>

              {/* Mobile step label (brand already in banner) */}
              <p className="-mt-4  md:hidden text-xl font-semibold text-slate-500 mb-6 fade-up">
                {stepLabel}
              </p>

              {step === 'phone' && (
                <PhoneStep
                  phone={phone}
                  isPhoneValid={isPhoneValid}
                  isSending={isSending}
                  phoneInputRef={phoneRef}
                  onPhoneChange={setPhone}
                  onSendOtp={handleSendOtp}
                />
              )}

              {step === 'otp' && (
                <OtpSection
                  phone={phone}
                  onBack={() => setStep('phone')}
                  onVerified={() => {
                    // If the user comes to `/auth` directly (e.g. from "Get Started"),
                    // there may be no pending onboarding data for `completeOtpVerification()`.
                    // Create a minimal pending record so the store can mark the user verified.
                    if (!useOnboardingFlowStore.getState().pending) {
                      const role =
                        typeof window !== 'undefined'
                          ? new URLSearchParams(window.location.search).get('role')
                          : null

                      if (role === 'employer') {
                        setPendingEmployer({
                          employerName: '',
                          jobTitle: '',
                          jobDescription: '',
                          jobLocation: '',
                          payAmount: '',
                          payType: 'monthly',
                          educationLevel: '',
                        })
                      } else {
                        setPendingSeeker({
                          name: '',
                          age: '',
                          gender: '',
                          profession: '',
                          location: '',
                          education: '',
                        })
                      }
                    }
                    completeOtpVerification()
                    setIsVerified(true)
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
