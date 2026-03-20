import { Link } from '@tanstack/react-router'

export function LandingFooter() {
  return (
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
  )
}

