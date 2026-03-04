import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { OtpSection } from '../features/auth/components/OtpSection'
import { PhoneStep } from '../features/auth/components/PhoneStep'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [isSending, setIsSending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const phoneRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    phoneRef.current?.focus()
  }, [])

  const handleSendOtp = async () => {
    if (phone.length < 10) return
    setIsSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSending(false)
    setStep('otp')
  }

  const isPhoneValid = phone.length === 10

  return (
    <div className="h-screen flex font-sans">
      <div className="hidden sm:block w-[50%] relative overflow-hidden">
        <img
          src="/images/auth/left_asset.png"
          alt="Zupro banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
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
              <h2 className="text-2xl font-bold text-slate-800">You're in!</h2>
              <p className="text-sm text-slate-500">Verified successfully. Redirecting...</p>
            </div>
          ) : (
            <>
              <div className="mb-8 fade-up">
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-3xl font-extrabold tracking-tight text-primary">Zu</span>
                  <span className="text-3xl font-extrabold tracking-tight text-slate-800">pro</span>
                  <span className="ml-1 mb-0.5 inline-block w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm font-medium text-slate-500">
                  {step === 'phone' ? 'Login / Sign Up' : 'Enter verification code'}
                </p>
              </div>

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
                  onVerified={() => setIsVerified(true)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
