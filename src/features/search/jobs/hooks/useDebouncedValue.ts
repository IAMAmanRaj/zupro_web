import { useCallback, useEffect, useRef, useState } from 'react'

export type UseDebouncedValueResult<T> = {
  debouncedValue: T
  isDebouncing: boolean
  flush: (nextValue?: T) => void
  cancel: () => void
}

export function useDebouncedValue<T>(
  value: T,
  delayMs: number,
): UseDebouncedValueResult<T> {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isDebouncing, setIsDebouncing] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancel = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    setIsDebouncing(false)
  }, [])

  const flush = useCallback(
    (nextValue?: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      setDebouncedValue(nextValue ?? value)
      setIsDebouncing(false)
    },
    [value],
  )

  useEffect(() => {
    if (Object.is(value, debouncedValue)) {
      setIsDebouncing(false)
      return
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setIsDebouncing(true)
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
      setIsDebouncing(false)
      timeoutRef.current = null
    }, delayMs)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [debouncedValue, delayMs, value])

  return { debouncedValue, isDebouncing, flush, cancel }
}

