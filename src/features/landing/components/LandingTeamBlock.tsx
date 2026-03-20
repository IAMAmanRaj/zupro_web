export function LandingTeamBlock() {
  return (
    <>
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
    </>
  )
}

