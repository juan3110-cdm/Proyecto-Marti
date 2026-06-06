import { useEffect, useState } from 'react'
import { WaIcon } from './Icons'

export default function WAFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || !('IntersectionObserver' in window)) { setVisible(true); return }
    const io = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.15 }
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <a
      className={`wa-float${visible ? ' in' : ''}`}
      href="https://wa.me/584248462562"
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
    >
      <WaIcon />
      <span className="wa-label">Escríbenos</span>
    </a>
  )
}
