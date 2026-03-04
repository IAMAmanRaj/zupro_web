import { FaRegUserCircle } from 'react-icons/fa'

export function Navbar() {
  return (
    <nav className="px-8 flex items-center justify-between h-16 bg-transparent">
      <span
        className="text-[#3F51B5] text-4xl font-extrabold tracking-tight select-none"
        style={{ fontFamily: '"Trebuchet MS", "Gill Sans", sans-serif' }}
      >
        Zupro
      </span>

      <div className="flex items-center absolute top-4 left-1/2 -translate-x-1/2 gap-8">
        <a
          href="#"
          className="text-slate-700 text-lg font-semibold hover:text-[#3F51B5] transition-colors"
        >
          FAQs
        </a>
        <a
          href="#"
          className="text-slate-700 text-lg font-semibold hover:text-[#3F51B5] transition-colors"
        >
          Contact Us
        </a>
        <a
          href="#"
          className="text-slate-700 text-lg font-semibold hover:text-[#3F51B5] transition-colors"
        >
          About Us
        </a>
      </div>

      <div className="flex items-center gap-4">
        <FaRegUserCircle
          className="text-[#3F51B5] transition-all duration-300 hover:scale-110 hover:cursor-pointer"
          size={30}
        />
        <button
          type="button"
          className="flex items-center gap-2 text-[#3F51B5] text-lg font-semibold hover:cursor-pointer transition-colors"
        >
          <span>Dashboard</span>
        </button>
      </div>
    </nav>
  )
}
