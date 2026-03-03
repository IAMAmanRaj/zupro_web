import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { FiPhone } from 'react-icons/fi'
import { PiHandshakeBold } from "react-icons/pi";
import { MdOutlineDeliveryDining } from 'react-icons/md'
import { MdOutlineSegment } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

export const Route = createFileRoute(`/`)({
  component: Index,
})

const FEATURES = [
  {
    icon: <FiPhone className="text-[#3F51B5]" size={28} />,
    title: 'Easy Contact',
    subtitle: 'Call the boss directly',
  },
  {
    icon: <PiHandshakeBold className="text-amber-500" size={30} />,
    title: 'Jobs for All',
    subtitle: 'Daily & skilled work',
  },
  {
    icon: <MdOutlineDeliveryDining className="text-[#3F51B5]" size={32} />,
    title: 'Get Paid Daily',
    subtitle: 'No need to wait',
  },
]

function Index() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = useMemo(
    () => [
      '/images/home/image_1.png',
      '/images/home/image_2.png',
      '/images/home/image_3.png',
      '/images/home/image_4.png',
    ],
    [],
  )

  const goToSlide = (index: number) => {
    if (index === activeSlide || transitioning) return
    setPrevSlide(activeSlide)
    setTransitioning(true)
    setActiveSlide(index)
    setTimeout(() => {
      setPrevSlide(null)
      setTransitioning(false)
    }, 700)
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % slides.length
        setPrevSlide(prev)
        setTransitioning(true)
        setTimeout(() => {
          setPrevSlide(null)
          setTransitioning(false)
        }, 700)
        return next
      })
    }, 3500)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [slides.length])

  return (
    <div className="min-h-screen bg-[#f0f2f8] flex flex-col">
      {/* ── Navbar ── */}
      <nav className="bg-[#3F51B5] px-8 flex items-center justify-between h-14 shadow-md">
        <span className="text-white text-2xl font-extrabold tracking-tight select-none">
          Zupro
        </span>

        <div className="flex items-center gap-8">
          <a href="#" className="text-white/90 text-sm font-medium hover:text-white transition-colors">Find Jobs</a>
          <a href="#" className="text-white/90 text-sm font-medium hover:text-white transition-colors">Hire Talent</a>
          <a href="#" className="text-white/90 text-sm font-medium hover:text-white transition-colors">FAQs</a>
        </div>

              <div className="flex items-center gap-3">
              <FaRegUserCircle className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:cursor-pointer" size={26} />
          <button
            type="button"
            className="flex items-center gap-1.5 text-white/90 text-sm font-medium hover:text-white transition-colors"
          >
            <MdOutlineSegment className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:cursor-pointer" size={30} />
          </button>
         
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <main className="flex-1 flex flex-col items-center pt-6 pb-8 px-4">

        {/* Carousel */}
        <div
          className="w-[85%] max-w-[1200px] relative rounded-2xl overflow-hidden shadow-xl"
          style={{ aspectRatio: '16/7' }}
        >
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: activeSlide === index ? 1 : 0,
                transition: 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: activeSlide === index ? 2 : prevSlide === index ? 1 : 0,
              }}
            />
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => {
                  goToSlide(index)
                  startTimer()
                }}
                style={{
                  width: activeSlide === index ? '24px' : '10px',
                  height: '10px',
                  borderRadius: activeSlide === index ? '5px' : '50%',
                  backgroundColor: activeSlide === index ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4 w-[85%] max-w-[560px]">
          <button
            type="button"
            className="flex-1 rounded-xl bg-[#3F51B5] px-6 py-3.5 text-base font-bold text-white shadow-md
                       transition-all duration-200 hover:bg-[#3647a3] hover:shadow-lg active:scale-[0.98]"
          >
            Get a Job
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl border-2 border-[#3F51B5] bg-white px-6 py-3.5 text-base font-bold
                       text-[#3F51B5] shadow-sm transition-all duration-200 hover:bg-[#eef1ff]
                       hover:shadow-md active:scale-[0.98]"
          >
            Hire Talent
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-6 w-[85%] max-w-[1200px] grid grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl px-6 py-5 flex items-center gap-4 shadow-sm
                         border border-slate-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-[15px] leading-tight">{f.title}</p>
                <p className="text-slate-500 text-sm mt-0.5">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 w-7 h-7 flex items-center justify-center rounded-full
                         text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors text-sm font-medium"
            >
              ✕
            </button>

            <p className="text-slate-700 font-semibold text-base pr-6">What are you looking for?</p>
            <p className="text-slate-400 text-sm mt-1">Choose how you'd like to use Zupro</p>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full rounded-xl bg-[#3F51B5] px-4 py-3.5 text-sm font-bold text-white
                           transition-all hover:bg-[#3647a3] active:scale-[0.98]"
              >
                🙋 I want to get hired
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full rounded-xl border-2 border-[#3F51B5] bg-white px-4 py-3.5 text-sm
                           font-bold text-[#3F51B5] transition-all hover:bg-[#eef1ff] active:scale-[0.98]"
              >
                💼 I want to offer jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
