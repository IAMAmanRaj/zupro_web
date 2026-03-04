import { useEffect, useRef, useState } from 'react'

type HeroCarouselProps = {
  slides: string[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
    <>
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
              onClick={() => {
                goToSlide(index)
                startTimer()
              }}
              style={{
                width: activeSlide === index ? '24px' : '10px',
                height: '10px',
                borderRadius: activeSlide === index ? '5px' : '50%',
                backgroundColor:
                  activeSlide === index ? '#fff' : 'rgba(255,255,255,0.5)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4 w-[85%] max-w-[560px]">
        <button
          type="button"
          className="cascadia-mono-light flex-1 hover:cursor-pointer rounded-xl bg-[#3F51B5] px-6 py-3.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#3647a3] hover:shadow-lg active:scale-[0.98]"
        >
          Find jobs
        </button>
        <button
          type="button"
          className="cascadia-mono-light flex-1 hover:cursor-pointer rounded-xl border-2 border-[#3F51B5] bg-white px-6 py-3.5 text-base font-bold text-[#3F51B5] shadow-sm transition-all duration-200 hover:bg-[#eef1ff] hover:shadow-md active:scale-[0.98]"
        >
          Hire Now
        </button>
      </div>
    </>
  )
}
