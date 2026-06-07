import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target) }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    // Observe all current .reveal elements on mount only
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, []) // run once on mount
}
