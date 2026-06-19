import { useEffect } from 'react'

// Re-runs whenever `key` changes (e.g. the hash route) so that newly
// mounted `.reveal` elements get observed again after navigation.
export function useReveal(key) {
  useEffect(() => {
    const reveal = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'))

    if (!('IntersectionObserver' in window)) {
      reveal()
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

    // Observe after the DOM has painted the (re)mounted view
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el))
    })

    // Safety net: if anything is still hidden shortly after, reveal it
    const t = setTimeout(reveal, 600)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      io.disconnect()
    }
  }, [key])
}
