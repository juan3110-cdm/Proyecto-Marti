import { useEffect, useRef, useState } from 'react'
import { WaIcon } from './Icons'

export default function Hero({ onSearch }) {
  const heroRef = useRef(null)
  const [op,   setOp]   = useState('Todas')
  const [type, setType] = useState('Todos')
  const [zone, setZone] = useState('Todas')
  const [q,    setQ]    = useState('')

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('in')))
    const t = setTimeout(() => hero.classList.add('in'), 1200)
    return () => clearTimeout(t)
  }, [])

  const go = () => {
    onSearch({ op, type, zone, q })
    setTimeout(() => {
      document.getElementById('propiedades')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg">
        <img className="hero-img" alt="Edificio residencial en Caracas" src="/hero-edificio.jpg" />
        <div className="hero-scrim" />
        <div className="hero-grain" />
      </div>

      <div className="container hero-inner">
        <p className="hero-kicker">
          <span className="hero-kicker-line" />
          Bienes raíces en Venezuela · desde 2003
        </p>
        <h1 className="hero-title">
          <span className="hl" style={{ '--i': 1 }}>Su próxima propiedad,</span>
          <span className="hl" style={{ '--i': 2 }}>en las <em>mejores manos</em></span>
          <span className="hl" style={{ '--i': 3 }}>de Venezuela.</span>
        </h1>
        <p className="hero-tagline">
          Especialistas en bienes raíces con más de 20 años de experiencia en Caracas y la Isla de Margarita.
        </p>
        <div className="hero-actions">
          <a href="#propiedades" className="btn btn-gold-solid">Ver propiedades</a>
          <a href="https://wa.me/584248462562" target="_blank" rel="noopener" className="btn btn-line">
            <WaIcon /> Hablar por WhatsApp
          </a>
        </div>

        <div className="hero-meta">
          <div className="hero-stat"><b>+20</b><span>años de experiencia</span></div>
          <div className="hero-stat"><b>+1.500</b><span>familias atendidas</span></div>
          <div className="hero-stat"><b>2</b><span>Caracas &amp; Margarita</span></div>
        </div>
      </div>

      <div className="container hero-search-dock">
        <div className="search-wrap">
          <div className="search-lead">Encuentra tu propiedad</div>
          <div className="search" role="search">
            <div className="search-field select">
              <label htmlFor="fOp">Operación</label>
              <select id="fOp" value={op} onChange={e => setOp(e.target.value)}>
                <option value="Todas">Todas</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </select>
            </div>
            <div className="search-field select">
              <label htmlFor="fType">Tipo</label>
              <select id="fType" value={type} onChange={e => setType(e.target.value)}>
                <option value="Todos">Todos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Oficina">Oficina</option>
                <option value="Local">Local</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>
            <div className="search-field select">
              <label htmlFor="fZone">Ciudad</label>
              <select id="fZone" value={zone} onChange={e => setZone(e.target.value)}>
                <option value="Todas">Todas</option>
                <option value="Caracas">Caracas</option>
                <option value="Isla de Margarita">Isla de Margarita</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="fQ">Zona o urbanización</label>
              <input
                type="text" id="fQ" value={q}
                placeholder="Altamira, La Lagunita, Pampatar…"
                autoComplete="off"
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && go()}
              />
            </div>
            <button className="btn btn-gold-solid search-go" onClick={go}>Buscar</button>
          </div>
        </div>
      </div>
    </section>
  )
}
