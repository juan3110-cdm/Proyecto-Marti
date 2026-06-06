import { useState, useEffect } from 'react'
import { LogoIcon, WaIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="container nav-inner">
        <a href="#hero" className="logo" aria-label="Proyecto Martí — inicio">
          <span className="logo-mark"><LogoIcon /></span>
          <span className="logo-name">Proyecto Martí<small>Bienes Raíces</small></span>
        </a>

        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          <a href="#servicios" onClick={close}>Servicios</a>
          <a href="#propiedades" onClick={close}>Propiedades</a>
          <a href="#zonas" onClick={close}>Zonas</a>
          <a href="#nosotros" onClick={close}>Nosotros</a>
          <a href="#contacto" onClick={close}>Contacto</a>
        </nav>

        <div className="nav-actions">
          <a href="#propiedades" className="btn btn-ghost">Ver propiedades</a>
          <a href="https://wa.me/584248462562" target="_blank" rel="noopener" className="btn btn-wa">
            <WaIcon /> WhatsApp
          </a>
          <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Abrir menú">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
