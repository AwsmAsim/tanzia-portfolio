import { useEffect } from 'react'

/**
 * Adds `is-visible` to any `.reveal` element when it scrolls into view.
 * Elements already within the viewport on mount are revealed right away.
 *
 * Note: we intentionally avoid requestAnimationFrame for the initial pass —
 * rAF is throttled/paused in background or non-focused tabs, which would
 * leave hero content stuck hidden. A 0ms timeout always fires.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'))
    if (els.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    // Reveal what's already on screen, observe the rest.
    const t = window.setTimeout(() => {
      const vh = window.innerHeight
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.92 && rect.bottom > 0) {
          el.classList.add('is-visible')
        } else {
          io.observe(el)
        }
      })
    }, 0)

    return () => {
      window.clearTimeout(t)
      io.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep])
}
