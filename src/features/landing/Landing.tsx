import { HiArrowRight } from 'react-icons/hi'
import {
  HiOutlineGlobe,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineDeviceMobile,
} from 'react-icons/hi'
import { Link } from '@tanstack/react-router'

export function LandingSectionTwo() {
  return (
    <section className="bg-white w-full">

      {/* ══════════════════════════════════════════
          BLOCK 1 — THE PROBLEM
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-10 pt-20 lg:pt-4 pb-16 lg:pb-20">

        {/* Eyebrow */}
        <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-10">
          The Problem
        </p>

        {/* ── Asymmetric header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-16 lg:mb-20">
          <h2 className="sora-bold text-[#1e1b4b] text-3xl  sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black leading-[1.05] tracking-tight max-w-[620px]">
            Ask any working couple<br />
            in Delhi or Bangalore.
          </h2>
          <p className="text-[#3F51B5] cascadia-mono-light italic text-lg md:text-xl lg:text-2xl lg:text-right max-w-[375px] sm:max-w-[280px] lg:mb-2 leading-snug">
            "How did you<br className="hidden lg:block" /> find your maid?"
          </p>
        </div>

        {/* ── Cinematic quote — large text, no cards ── */}
        <div className="border-t border-[rgba(63,81,181,0.12)] pt-10 mb-10">
          <div className="flex flex-col gap-5">
            {[
              { text: 'After weeks of asking around.', size: 'text-[25px] sm:text-3xl md:text-4xl lg:text-5xl', opacity: 'text-[#1e1b4b]' },
              { text: 'Through a neighbour.', size: 'text-[20px] sm:text-2xl md:text-3xl lg:text-4xl', opacity: 'text-[#1e1b4b]/60' },
              { text: 'Through luck.', size: 'text-[15px] sm:text-xl md:text-2xl lg:text-3xl', opacity: 'text-[#1e1b4b]/35' },
            ].map(({ text, size, opacity }) => (
              <p key={text} className={`sora-bold font-black italic leading-none ${size} ${opacity} tracking-tight`}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Trailing context line */}
        <div className="flex items-center w-full mb-20">
          <div className="w-[40%] sm:w-[90%] md:w-full h-px bg-[#3F51B5]" />
          <div className="text-[#6B7280] max-w-[350px] flex justify-center text-center sm:max-w-[500px] md:w-full cascadia-mono-light text-sm">
            <span className=''>In 2026, this is still how{' '}<span className='cascadia-mono-bold text-black'>50 million</span> people find work.</span>
                  </div>
                  <div className="w-[40%] sm:w-[90%] md:w-full h-px bg-[#3F51B5]" />
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

      {/* ══════════════════════════════════════════
          BLOCK 3 — THE SOLUTION
      ══════════════════════════════════════════ */}
      <div className="bg-[#f8f8fc] w-full">
        <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-16 lg:pt-20 pb-12 md:pb-20 lg:pb-20">

          <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
            The Solution
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-16">
           
            <h2 className="sora-bold text-[#1e1b4b] text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight w-full">
              Built from the ground up<br />for India's 500M+ informal workforce.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(63,81,181,0.1)]">
            {[
              {
                icon: <HiOutlineGlobe size={22} />,
                title: 'Vernacular-First',
                tag: null,
                desc: 'Hindi, Tamil, Telugu + 10 more languages. No English required.',
              },
              {
                icon: <HiOutlineLightningBolt size={22} />,
                title: 'Fast Match',
                tag: null,
                desc: 'UltraFast matching connects hirers with the right workers quickly and accurately.',
              },
              {
                icon: <HiOutlineLocationMarker size={22} />,
                title: 'Hyperlocal',
                tag: null,
                desc: 'Pin-code level matching — find a maid or cook in your exact neighbourhood.',
              },
              {
                icon: <HiOutlineShieldCheck size={22} />,
                title: 'Verified Trust',
                tag: 'For maids & cooks',
                desc: 'Aadhaar-backed identity check for household roles. Hirers get the trust they need.',
              },
              {
                icon: <HiOutlineDeviceMobile size={22} />,
                title: 'Worker-First UI',
                tag: 'Core focus',
                desc: 'Designed for all literacy levels. Simple, visual, guided — workers pick it up in minutes.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                ),
                title: 'Voice Interface',
                tag: 'Coming Soon',
                tagColor: 'bg-[#7986cb]',
                desc: 'Post or find jobs by speaking — eliminating the typing barrier for workers.',
              },
            ].map(({ icon, title, tag, tagColor, desc }) => (
              <div key={title} className="bg-white opacity-85 hover:opacity-100 duration-300 transition-all hover:cursor-pointer  p-4 md:p-8 lg:p-10 flex flex-col gap-4">
                <div className="text-[#3F51B5]">{icon}</div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="sora-bold text-[#1e1b4b] font-black text-lg tracking-tight">{title}</span>
                  {tag && (
                    <span className={`text-[10px] sora-bold font-bold tracking-[0.14em] uppercase text-white px-2.5 py-1 rounded-full ${tagColor ?? 'bg-[#3F51B5]'}`}>
                      {tag}
                    </span>
                  )}
                </div>
                <p className="cascadia-mono-light text-[#6B7280] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

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
            <div className="inline-block sora-bold text-white bg-[#1e1b4b] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10">
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
            <div className="inline-block sora-bold text-white bg-[#E65100] text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-2 mb-10">
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

      {/* ══════════════════════════════════════════
          BLOCK 7 — THE TEAM
      ══════════════════════════════════════════ */}
      <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-4 lg:pt-4 pb-20 lg:pb-28">

        <p className="text-[15px] xl:text-[20px] sora-bold font-bold tracking-[0.28em] uppercase text-[#3F51B5] mb-8">
          The Team
        </p>

        <h2 className="sora-bold text-[#1e1b4b] text-4xl md:text-5xl lg:text-[3.2rem] font-black leading-[1.05] tracking-tight mb-16 max-w-[640px]">
          Founders who have lived the problem —<br />
          <span className="text-[#3F51B5]">and built for it.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[rgba(63,81,181,0.1)]">

          {/* Aman */}
          <div className="bg-white  lg:p-12">
            <div className="flex items-center gap-5 mb-8">
            
              <div>
                <p className="sora-bold text-[#1e1b4b] font-black text-xl tracking-tight leading-tight">Aman Pratap Yadav</p>
                <p className="text-[#E65100] cascadia-mono-light text-xs font-semibold tracking-[0.12em] uppercase mt-1">Co-Founder & CEO</p>
              </div>
            </div>

            <div className="border border-[rgba(63,81,181,0.12)] p-2 mb-7">
              <p className="cascadia-mono-light text-[#6B7280] text-xs leading-relaxed">
                IIT Kanpur · Civil Engineering<br />
                Real Estate Operations — daily interface with labour markets & worker challenges
              </p>
            </div>
          </div>

          {/* Atulya */}
          <div className="bg-white pt-8 lg:p-12">
            <div className="flex items-center gap-5 mb-8">
              <div>
                <p className="sora-bold text-[#1e1b4b] font-black text-xl tracking-tight leading-tight">Atulya Sundaram</p>
                <p className="text-[#3F51B5] cascadia-mono-light text-xs font-semibold tracking-[0.12em] uppercase mt-1">Co-Founder & CTO</p>
              </div>
            </div>

            <div className="border border-[rgba(63,81,181,0.12)] p-2 mb-7">
              <p className="cascadia-mono-light text-[#6B7280] text-xs leading-relaxed">
                IIT Kanpur · Computer Science<br />
                Currently based in Japan — leading all tech development and product architecture
              </p>
            </div>
          </div>

        </div>

        {/* IIT note */}
        <div className="mt-8 bg-[#1e1b4b]  px-4 lg:px-12 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="cascadia-mono-light text-white/90 text-xs">IIT alumni network of investors, mentors & B2B leads</p>
          <p className="cascadia-mono-light text-white/90 text-xs">One built it, one lived it · Complementary skills across ops & tech</p>
        </div>

      </div>

   {/* ══════════════════════════════════════════
    BLOCK 8 — CLOSING CTA
══════════════════════════════════════════ */}
<div className="bg-[#1e1b4b] w-full">
  <div className="max-w-[1200px] xl:max-w-[1300px] mx-auto px-5 lg:px-16 pt-12 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16">

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">

                      <div className="max-w-[680px]">
                      <p className="text-[20px] sora-bold font-bold   text-[#ffffff] mb-8">
          Zupro hai, toh job hai !
        </p>
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
        <p className="text-[10px] sora-bold font-bold tracking-[0.22em] uppercase text-[#7986cb] mb-6">Get in touch</p>

        <div className="flex flex-col gap-5">
          <div>
            <p className="cascadia-mono-light text-white text-[10px] tracking-[0.18em] uppercase mb-1">Email</p>
            <p className="cascadia-mono-light text-[#7986cb] text-sm">zuprofounding@gmail.com</p>
          </div>
        </div>
      </div>

    </div>

    {/* ── Footer ── */}
    <div className="mt-12 sm:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="sora-bold text-white font-black text-xl tracking-tight">ZUPRO</span>
        <span className="w-px h-4 bg-white/20" />
        <span className="cascadia-mono-light text-white/80 text-xs">India's Blue-Collar & Domestic Jobs Network</span>
      </div>
      <div className="flex items-center justify-center gap-6">
      <Link to={"/auth"} className="cascadia-mono-light text-white/80 text-xs hover:text-white/60 transition-colors">
          Get Started
        </Link>
                          <Link to={"/contact-us"} className="cascadia-mono-light text-white/80 text-xs hover:text-white/60 transition-colors">
          Contact Us
        </Link>
      </div>
    </div>

  </div>
</div>

    </section>
  )
}