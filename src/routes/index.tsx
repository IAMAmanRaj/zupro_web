import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { FiPhone } from 'react-icons/fi'
import { PiHandshakeBold } from 'react-icons/pi'
import { MdOutlineSegment } from 'react-icons/md'
import { TbCurrentLocation } from "react-icons/tb";
import { FaRegUserCircle } from 'react-icons/fa'
import { RiBriefcase4Line, RiSearchLine, RiArrowRightLine, RiCloseLine } from 'react-icons/ri'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute(`/`)({
  component: Index,
})

const FEATURES = [
  {
    icon: <FiPhone className="text-[#3F51B5]" size={28} />,
    title: 'Form network',
    subtitle: 'Connect with an employer easily',
  },
  {
    icon: <PiHandshakeBold className="text-amber-500" size={30} />,
    title: 'Jobs for All',
    subtitle: 'Daily & skilled work',
  },
  {
    icon: <TbCurrentLocation className="text-[#3F51B5]" size={32} />,
    title: 'Jobs near you !',
    subtitle: 'No need to wait',
  },
]

const SEEKER_PERKS = [
  'Browse 1000+ daily jobs',
  'Get hired same day',
  'Receive instant pay',
  'No experience needed',
]

const HIRER_PERKS = [
  'Post jobs in 60 seconds',
  'Find people',
  'Pay only on completion',
  'Rate & review talent',
]

function Index() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<'seeker' | 'hirer' | null>(null)
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
      <nav className="px-8 flex items-center justify-between h-16 bg-transparent">
        <span
          className="text-[#3F51B5] text-4xl font-extrabold tracking-tight select-none"
          style={{ fontFamily: '"Trebuchet MS", "Gill Sans", sans-serif' }}
        >
          Zupro
        </span>

              <div className="flex items-center absolute top-4 left-1/2 -translate-x-1/2 gap-8">
              <a href="#" className="text-slate-700 text-lg font-semibold hover:text-[#3F51B5] transition-colors">FAQs</a>
              <a href="#" className="text-slate-700 text-lg font-semibold hover:text-[#3F51B5] transition-colors">Contact Us</a>

                  <a href="#" className="text-slate-700 text-lg font-semibold hover:text-[#3F51B5] transition-colors">About Us</a>
        </div>

        <div className="flex items-center gap-4">
          <FaRegUserCircle className="text-[#3F51B5] transition-all duration-300 hover:scale-110 hover:cursor-pointer" size={30} />
          <button type="button" className="flex items-center gap-2 text-[#3F51B5] text-lg font-semibold hover:cursor-pointer transition-colors">
            <MdOutlineSegment className="text-[#3F51B5] transition-all duration-300 hover:scale-110" size={32} />
            <span>Dashboard</span>
          </button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <main className="flex-1 flex flex-col items-center pt-6 pb-8 px-4">
        {/* Carousel */}
        <div className="relative h-[410px] w-[750px] rounded-2xl overflow-hidden shadow-xl">
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => { goToSlide(index); startTimer() }}
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
          <button type="button" className="flex-1 hover:cursor-pointer rounded-xl bg-[#3F51B5] px-6 py-3.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#3647a3] hover:shadow-lg active:scale-[0.98]">
            Find jobs
          </button>
          <button type="button" className="flex-1 hover:cursor-pointer rounded-xl border-2 border-[#3F51B5] bg-white px-6 py-3.5 text-base font-bold text-[#3F51B5] shadow-sm transition-all duration-200 hover:bg-[#eef1ff] hover:shadow-md active:scale-[0.98]">
            Hire Now
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-6 w-[85%] max-w-[1200px] grid grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-xl px-6 py-5 flex items-center gap-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
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

      {/* ── Modal with Framer Motion ── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Panel */}
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="pointer-events-auto relative w-full max-w-[760px] rounded-3xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-8 pt-8 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 mb-1">
                    <HiOutlineSparkles className="text-[#3F51B5]" size={20} />
                    <p className="text-xs font-semibold text-[#3F51B5] uppercase tracking-widest">Welcome to Zupro</p>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-800 leading-snug">
                    How would you like to get started?
                  </h2>
                </div>

                {/* Two-column card area */}
                <div className="grid grid-cols-2 gap-0 divide-x divide-slate-100">

                  {/* LEFT — Job Seeker */}
                  <motion.div
                    className="relative p-7 flex flex-col cursor-pointer group"
                    onHoverStart={() => setHoveredCard('seeker')}
                    onHoverEnd={() => setHoveredCard(null)}
                    transition={{ duration: 0.2 }}
                  >
                                      {/* Icon circle */}
                                      <div className='flex flex-row gap-1 items-center'>
                                      <h3 className="text-lg font-extrabold text-slate-800">Find a Job</h3>
                                      <motion.div
                      className="w-8 h-8 mb-2 flex items-center justify-center"
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <RiSearchLine className="text-[#3F51B5] mt-1" size={26} />
                      
                    </motion.div>
                                      </div>


                  
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      Browse hundreds of daily jobs near you.
                    </p>

                    <ul className="flex flex-col gap-2 mb-6">
                      {SEEKER_PERKS.map((perk) => (
                        <motion.li
                          key={perk}
                          className="flex items-center gap-2 text-sm text-slate-600"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3F51B5] flex-shrink-0" />
                          {perk}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      type="button"
                      className="mt-auto hover:cursor-pointer w-full rounded-xl bg-[#3F51B5] py-3 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-md"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      Search
                      <motion.span
                        animate={hoveredCard === 'seeker' ? { x: 4 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RiArrowRightLine size={16} />
                      </motion.span>
                    </motion.button>
                  </motion.div>

                  {/* RIGHT — Hirer */}
                  <motion.div
                    className="relative p-7 flex flex-col cursor-pointer group"
                    onHoverStart={() => setHoveredCard('hirer')}
                    onHoverEnd={() => setHoveredCard(null)}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon circle */}
                    <div className='flex flex-row gap-1 items-center'>
                    <h3 className="text-lg font-extrabold text-slate-800 mb-1">Hire</h3>
                                      <motion.div
                      className="w-8 h-8 mb-2 flex items-center justify-center"
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                       <RiBriefcase4Line className="text-amber-500 mt-1" size={26} />
                      
                    </motion.div>
                                      </div>

                  
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      Post a job in under a minute and connect with reliable workers ready to start today.
                    </p>

                    <ul className="flex flex-col gap-2 mb-6">
                      {HIRER_PERKS.map((perk) => (
                        <motion.li
                          key={perk}
                          className="flex items-center gap-2 text-sm text-slate-600"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          {perk}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      type="button"
                      className="mt-auto w-full rounded-xl hover:cursor-pointer border-2 border-amber-400 bg-white py-3 text-sm font-bold text-amber-600 flex items-center justify-center gap-2"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      Proceed to hire
                      <motion.span
                        animate={hoveredCard === 'hirer' ? { x: 4 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RiArrowRightLine size={16} />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Bottom close button */}
                <div className="flex justify-center py-5 border-t border-slate-100 bg-slate-50/60">
                  <motion.button
                    type="button"
                    aria-label="Close modal"
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center gap-2 text-slate-400 text-sm font-medium px-5 py-2 rounded-full border border-[#3F51B5] hover:cursor-pointer bg-white hover:border-slate-300 hover:text-slate-600 transition-colors"
                    whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                      whileTap={{
                        scale: 0.96,
                        transition: { duration: 0.5, ease: 'easeInOut' },
                      }}
                  >
                    <RiCloseLine size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
