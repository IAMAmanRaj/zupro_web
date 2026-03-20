import {
  HiOutlineDeviceMobile,
  HiOutlineGlobe,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
} from 'react-icons/hi'

export function LandingSolutionBlock() {
  return (
    <>
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
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
              <div
                key={title}
                className="bg-white opacity-85 hover:opacity-100 duration-300 transition-all hover:cursor-pointer  p-4 md:p-8 lg:p-10 flex flex-col gap-4"
              >
                <div className="text-[#3F51B5]">{icon}</div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="sora-bold text-[#1e1b4b] font-black text-lg tracking-tight">{title}</span>
                  {tag && (
                    <span
                      className={`text-[10px] sora-bold font-bold tracking-[0.14em] uppercase text-white px-2.5 py-1 rounded-full ${
                        tagColor ?? 'bg-[#3F51B5]'
                      }`}
                    >
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
    </>
  )
}

