export function Navbar() {
  return (
    <nav className="px-8 flex items-center justify-between h-16 bg-transparent">
      <span
        className="text-[#3F51B5] text-4xl font-extrabold tracking-tight select-none"
        style={{ fontFamily: '"Trebuchet MS", "Gill Sans", sans-serif' }}
      >
        Zupro.
      </span>

      <div className="flex items-center absolute top-5 left-1/2 -translate-x-1/2 gap-8">
        <a
          href="#"
          className="text-slate-700 text-md font-semibold hover:text-[#3F51B5] transition-colors"
        >
          FAQs
        </a>
        <a
          href="#"
          className="text-slate-700 text-md font-semibold hover:text-[#3F51B5] transition-colors"
        >
          Contact Us
        </a>
        <a
          href="#"
          className="text-slate-700 text-md font-semibold hover:text-[#3F51B5] transition-colors"
        >
          About Us
        </a>
      </div>

      <div className="flex items-center gap-4">
        <span className='hover:cursor-pointer cascadia-mono-bold opacity-95 hover:opacity-100 font-bold '>
        Sign in
        </span>
        <button
          type="button"
          className="flex cascadia-mono-bold hover:opacity-100 opacity-95 hover:cursor-pointer items-center gap-2 text-sm text-white bg-[#3F51B5] px-6 py-2 font-semibold transition-all "
        >
          <span>Sign up</span>
        </button>
      </div>
    </nav>
  )
}
