import { useEffect, useRef, useState } from 'react'

/** Counts up from 0 → value when scrolled into view. */
export function Counter({
  value,
  suffix = '',
  duration = 1600,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      return
    }

    let timer: number | undefined

    const run = () => {
      if (started.current) return
      started.current = true
      const start = Date.now()
      // setInterval-based ticks fire even in non-focused tabs (unlike rAF),
      // and we always land exactly on `value`.
      timer = window.setInterval(() => {
        const p = Math.min((Date.now() - start) / duration, 1)
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setDisplay(Math.round(eased * value))
        if (p >= 1 && timer) window.clearInterval(timer)
      }, 32)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (timer) window.clearInterval(timer)
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
