export function LandingHowItWorksBlock() {
  return (
    <>
      {/* ══════════════════════════════════════════
          BLOCK 4 — HOW IT WORKS
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-12 md:pt-20 lg:pt-28 pb-20 lg:pb-28">
        <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
          How It Works
        </p>

        <h2 className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] tracking-tight mb-16 lg:mb-20 max-w-[700px]">
          From posting a job to finding the right person —<br className="hidden lg:block" />
          <span className="text-[#3F51B5]">in minutes, not weeks.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Workers */}
          <div>
            <div className="inline-block sora-bold text-white bg-[#3F51B5] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10">
              For Workers
            </div>
            <div className="flex flex-col gap-8">
              {[
                { n: '01', text: 'Register with mobile number — simple, guided, vernacular.' },
                { n: '02', text: 'Set skills, preferred area & availability. No resume needed.' },
                { n: '03', text: 'Receive instant nearby job alerts matched to your exact location.' },
                { n: '04', text: 'Accept the job and connect directly with the hirer.' },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-6">
                  <span className="sora-bold text-[#1e1b4b]/15 font-black text-3xl leading-none tabular-nums flex-shrink-0 mt-0.5">{n}</span>
                  <p className="cascadia-mono-light text-[#374151] text-sm leading-relaxed pt-1 border-t border-[rgba(63,81,181,0.12)] flex-1">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hirers */}
          <div>
            <div className="inline-block sora-bold text-white bg-[#1e1b4b] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10">
              For Hirers
            </div>
            <div className="flex flex-col gap-8">
              {[
                { n: '01', text: 'Post a job in 60 seconds — type it or describe it.' },
                { n: '02', text: 'Platform sends matched, verified workers instantly.' },
                { n: '03', text: 'View profiles, ratings & identity-verified details.' },
                { n: '04', text: 'Connect, confirm and schedule — easy from start to finish.' },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-6">
                  <span className="sora-bold text-[#1e1b4b]/15 font-black text-3xl leading-none tabular-nums flex-shrink-0 mt-0.5">{n}</span>
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

