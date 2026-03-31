import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 600
    const step = 16
    const totalSteps = duration / step
    const increment = end / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)

    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}