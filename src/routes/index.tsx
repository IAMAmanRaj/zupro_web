import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      {/* ── DESKTOP HERO (md and above) ── */}
      <section className="relative hidden lg:flex min-h-[calc(100vh-72px)] bg-white overflow-hidden items-center">
        <div className="relative z-10 w-full mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 py-20">

          {/* LEFT: Text block */}
          <div className="flex-1 md:max-w-[720px]">
            <h1 className="text-[#111827] text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="sora-bold">India's Blue-Collar &</span><br />
              <span className="relative inline-block">
                <span className="relative z-10 sora-bold">Domestic Jobs</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 320 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M2 9C60 3 140 1 318 9" stroke="#2A5298" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{' '}
              <span className="sora-bold">Network</span>
            </h1>
            <p className="text-[#4B5563] dosis-semibold leading-relaxed mb-10 max-w-[460px] text-xl">
              Connecting workers and hirers — households, enterprises &amp;{' '}
              quick-commerce:{' '}
              <span className="font-semibold text-[#1B2A4A]">instantly, locally, at scale.</span>
            </p>
          </div>

          {/* RIGHT: Phone hand asset */}
          <div className="relative flex-shrink-0 w-full max-w-[520px] lg:max-w-[600px] flex items-end justify-center">
            <img
              src="/images/landing/mobile_hand_asset.png"
              alt="Zupro app showing today's jobs"
              className="relative z-10 w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── MOBILE HERO (under 768px) ── */}
      <div className="lg:hidden min-h-[calc(100vh-72px)] bg-white flex flex-col items-center px-5 pt-10 pb-8">

        {/* Headline */}
        <h1 className="sora-bold text-[#1B2A4A] text-[2rem] font-black leading-tight tracking-tight text-center mb-4">
          India's Blue-Collar &amp; Domestic<br />Jobs Network
        </h1>

        {/* Subtitle */}
        <p className="text-[#6B7280] dosis-semibold text-base text-center leading-relaxed max-w-[320px] mb-4">
          Connecting workers and hirers—households, enterprises &amp; quick-commerce: instantly, locally, at scale.
        </p>

        {/* Phone hand asset */}

          <img
            src="/images/landing/mobile_hand_asset.png"
            alt="Zupro app showing today's jobs"
            className="object-cover w-[380px] -mt-2 h-[380px] "
          />
      

      </div>
    </>
  )
}