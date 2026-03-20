import { HiArrowRight } from 'react-icons/hi'
import { TbBuildingSkyscraper } from 'react-icons/tb'
import { PiFactoryLight } from 'react-icons/pi'
import { MdOutlineStorefront } from 'react-icons/md'
import {
  HiOutlineGlobe,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineDeviceMobile,
} from 'react-icons/hi'

export function LandingSectionTwo() {
  return (
    <section className="bg-white w-full">

      {/* ══════════════════════════════════════════
          BLOCK 1 — THE PROBLEM
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-5 lg:px-16 pt-20 lg:pt-24 pb-16 lg:pb-20">

        {/* Eyebrow */}
        <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-10">
          The Problem
        </p>

        {/* ── Asymmetric header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
          <h2 className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl lg:text-[3.6rem] font-black leading-[1.05] tracking-tight max-w-[620px]">
            Ask any working couple<br />
            in Delhi or Bangalore.
          </h2>
          <p className="text-[#3F51B5] italic text-lg md:text-xl lg:text-2xl lg:text-right max-w-[280px] lg:mb-2 leading-snug">
            "How did you<br className="hidden lg:block" /> find your maid?"
          </p>
        </div>

        {/* ── Cinematic quote — large text, no cards ── */}
        <div className="border-t border-[rgba(63,81,181,0.12)] pt-10 mb-10">
          <div className="flex flex-col gap-5">
            {[
              { text: 'Through a neighbour.', size: 'text-3xl md:text-4xl lg:text-5xl', opacity: 'text-[#1e1b4b]' },
              { text: 'Through luck.', size: 'text-2xl md:text-3xl lg:text-4xl', opacity: 'text-[#1e1b4b]/60' },
              { text: 'After weeks of asking around.', size: 'text-xl md:text-2xl lg:text-3xl', opacity: 'text-[#1e1b4b]/35' },
            ].map(({ text, size, opacity }) => (
              <p key={text} className={`sora-bold font-black italic leading-none ${size} ${opacity} tracking-tight`}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Trailing context line */}
        <div className="flex items-center gap-5 mb-20">
          <div className="w-8 h-px bg-[#3F51B5]" />
          <p className="text-[#6B7280] cascadia-mono-light text-sm">
            In 2025, this is still how{' '}
            <span className="font-bold text-[#1e1b4b]">50 million people</span> find work.
          </p>
        </div>

        {/* ── Stats — side-by-side with dividing lines ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(63,81,181,0.12)]">
          {[
            { value: '50M+', label: 'Domestic workers in India', sub: '3rd largest employment sector after agriculture & construction' },
            { value: '1 in 3', label: 'Urban Indians is a migrant', sub: '"I just moved — now what?" Everyone\'s problem.' },
            { value: 'Zero', label: 'Formal digital platforms exist', sub: 'Not LinkedIn. Not Naukri. No structured marketplace.' },
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
            The problem is real. The market is massive.{' '}
            <span className="text-[#3F51B5]">The platform doesn't exist yet.</span>
          </p>
          <span className="flex sora-bold items-center gap-2 text-[#9CA3AF] text-[10px] font-bold tracking-[0.22em] uppercase">
            Until now <HiArrowRight size={12} />
          </span>
        </div>

      </div>

      {/* Full-bleed dark divider */}
      <div className="bg-[#1e1b4b] sora-bold  py-6 px-5 lg:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
      <div className="max-w-[1200px] mx-auto px-5 lg:px-16 pt-16 lg:pt-24 pb-20 lg:pb-28">

        {/* Cinematic headline */}
        <div className="mb-16 lg:mb-20">
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
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
                className={`flex items-center justify-between gap-6 pb-4 border-b ${highlight ? 'border-[#3F51B5]/30' : 'border-[rgba(63,81,181,0.08)]'}`}
              >
                <p className={`text-xl md:text-2xl lg:text-3xl sora-bold font-black tracking-tight ${dim ? 'text-[#1e1b4b]/30' : 'text-[#1e1b4b]'}`}>
                  {before}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <HiArrowRight size={16} className={dim ? 'text-[#1e1b4b]/20' : 'text-[#3F51B5]'} />
                  <p className={`text-xl md:text-2xl lg:text-3xl sora-bold font-black tracking-tight ${highlight ? 'text-[#3F51B5]' : 'text-[#1e1b4b]/30'}`}>
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

    </section>
  )
}