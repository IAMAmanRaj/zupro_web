import { HiArrowRight } from 'react-icons/hi'

export function LandingInsightBlock() {
  return (
    <>
      {/* Full-bleed dark divider */}
      <div className="bg-[#1e1b4b] sora-bold  py-6 px-5 lg:px-16">
        <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white text-[15px] tracking-[0.28em] uppercase font-bold">The Insight</p>
          <p className="text-white font-semibold text-[15px]">
            Behaviour change has already happened.{' '}
            <span className="text-[#7986cb]">We are the infrastructure.</span>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BLOCK 2 — THE INSIGHT
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-16 lg:pt-24">
        {/* Cinematic headline */}
        <div className=" md:mb-16 lg:mb-20">
          <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
            Before → After
          </p>
          <div className="flex flex-col gap-4 border-t border-[rgba(63,81,181,0.12)] pt-10">
            {[
              { before: 'Called restaurants directly', after: 'Zomato', dim: true },
              { before: 'Went to the store', after: 'Blinkit', dim: true },
              { before: 'WhatsApp / word of mouth', after: 'ZUPRO', dim: false, highlight: true },
            ].map(({ before, after, dim, highlight }) => (
              <div
                key={after}
                className={`flex hover:cursor-pointer hover:opacity-100 opacity-80 transition-all duration-300 items-center justify-between gap-6 pb-4 border-b ${highlight ? 'border-[#3F51B5]/30' : 'border-[rgba(63,81,181,0.08)]'}`}
              >
                <p
                  className={`text-xl md:text-2xl lg:text-3xl sora-bold font-black tracking-tight ${
                    dim ? 'text-[#1e1b4b]/30' : 'text-[#1e1b4b]'
                  }`}
                >
                  {before}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <HiArrowRight size={16} className={dim ? 'text-[#1e1b4b]/20' : 'text-[#3F51B5]'} />
                  <p
                    className={`text-xl md:text-2xl lg:text-3xl sora-bold font-black tracking-tight ${
                      highlight ? 'text-[#3F51B5]' : 'text-[#1e1b4b]/30'
                    }`}
                  >
                    {after}
                  </p>
                  {highlight && (
                    <span className="hidden sora-bold sm:inline-block text-[10px] font-bold tracking-[0.16em] uppercase bg-[#3F51B5] text-white px-3 py-1.5 rounded-full">
                      That's us
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

