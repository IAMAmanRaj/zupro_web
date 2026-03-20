import { LandingFooter } from './Footer'

export function LandingClosingCTABlock() {
  return (
    <>
      {/* ══════════════════════════════════════════
    BLOCK 8 — CLOSING CTA
══════════════════════════════════════════ */}
      <div className="bg-[#1e1b4b] w-full">
        <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-12 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">
            <div className="max-w-[680px]">
              <p className="text-[20px] sora-bold font-bold   text-[#ffffff] mb-8">Zupro hai, toh job hai !</p>
              <h2 className="sora-bold text-white text-4xl md:text-5xl lg:text-[3.4rem] font-black leading-[1.05] tracking-tight mb-8">
                The world's largest<br />
                workforce deserves<br />
                <span className="text-[#7986cb]">a platform built for them.</span>
              </h2>
              <p className="cascadia-mono-light text-white/50 text-sm leading-relaxed max-w-[480px]">
                ZUPRO is building India's blue-collar jobs infrastructure —
                from households to Blinkit dark stores, one job at a time.
              </p>
            </div>

            {/* Contact card */}
            <div className="border border-white/20 p-8 lg:p-10 flex-shrink-0 min-w-[280px]">
              <p className="text-[10px] sora-bold font-bold tracking-[0.22em] uppercase text-[#7986cb] mb-6">
                Get in touch
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="cascadia-mono-light text-white text-[10px] tracking-[0.18em] uppercase mb-1">
                    Email
                  </p>
                  <p className="cascadia-mono-light text-[#7986cb] text-sm">zuprofounding@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <LandingFooter />
        </div>
      </div>
    </>
  )
}

