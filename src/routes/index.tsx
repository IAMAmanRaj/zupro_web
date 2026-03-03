import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import image1 from '../assets/Home/image_1.png'
import image2 from '../assets/Home/image_2.png'
import image3 from '../assets/Home/image_3.png'
import image4 from '../assets/Home/image_4.png'

export const Route = createFileRoute(`/`)({
  component: Index,
})

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = useMemo(() => [image1, image2, image3, image4], [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % slides.length)
    }, 3500)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [slides.length])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f5f7fb] text-slate-900">
      <section className="mx-auto flex h-full w-full max-w-[1600px] flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
        <div className="relative flex h-[68vh] w-[88vw] max-w-[1200px] min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white/75 sm:w-[84vw] md:h-[69vh] md:w-[82vw] lg:w-[80vw]">
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`Job marketplace visual ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                activeSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-[#3F51B5]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex w-[88vw] max-w-[560px] min-w-0 flex-col items-center gap-3 sm:mt-6 sm:w-[84vw] sm:flex-row md:w-[82vw] lg:w-[80vw] lg:justify-center">
          <button
            type="button"
            className="w-full rounded-lg bg-[#3F51B5] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3647a3] active:bg-[#303f90]"
          >
            Get a Job
          </button>
          <button
            type="button"
            className="w-full rounded-lg border-2 border-[#3F51B5] bg-transparent px-6 py-3 text-base font-semibold text-[#3F51B5] transition-colors hover:bg-[#eef1ff] active:bg-[#dde2ff]"
          >
            Hire Talent
          </button>
        </div>
      </section>

      {isModalOpen ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-[420px] rounded-xl bg-white p-5 sm:p-6">
            <button
              type="button"
              aria-label="Close selection modal"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 rounded-md px-2 py-1 text-xl leading-none text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200"
            >
              ?
            </button>

            <p className="pr-8 text-sm font-medium text-slate-600">What are you looking for?</p>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                className="w-full rounded-lg bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3647a3] active:bg-[#303f90]"
              >
                Do you want to get hired?
              </button>
              <button
                type="button"
                className="w-full rounded-lg bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3647a3] active:bg-[#303f90]"
              >
                Do you want to offer jobs?
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}