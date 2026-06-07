import { useState, useEffect, useRef } from 'react'
import PROPS from '../data/properties'
import { PinIcon, BedIcon, BathIcon, AreaIcon, HeartIcon, ArrowIcon } from './Icons'

const WA = 'https://wa.me/584248462562'
const INITIAL = 8

// accent-insensitive normaliser using explicit unicode range
const norm = s =>
  (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

function Card({ p, index, instant }) {
  const [fav, setFav] = useState(false)
  const ref = useRef(null)
  const href = p.ig || WA
  const cityShort = p.zone === 'Isla de Margarita' ? 'Margarita' : 'Caracas'
  const loc = p.area && p.area !== cityShort ? `${p.area} · ${p.zone}` : p.zone

  // When filtering is active, reveal immediately; otherwise use scroll observer
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (instant) {
      el.classList.add('is-visible')
      return
    }
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); io.unobserve(el) } },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [instant])

  return (
    <article ref={ref} className="card reveal" data-d={(index % 4) + 1}>
      <a className="card-media" href={href} target="_blank" rel="noopener" aria-label={`Ver ${p.name}`}>
        <span className="card-badge">{p.tag}</span>
        <button
          className={`card-fav${fav ? ' on' : ''}`}
          aria-label="Guardar propiedad"
          onClick={e => { e.preventDefault(); e.stopPropagation(); setFav(f => !f) }}
        >
          <HeartIcon />
        </button>
        <span className="ph"><span className="ph-tag">foto · {p.area}</span></span>
      </a>
      <div className="card-body">
        <div className="card-loc"><PinIcon /> {loc}</div>
        <h3>{p.name}</h3>
        <div className="card-specs">
          {p.beds  && <span><BedIcon />  {p.beds} hab</span>}
          {p.baths && <span><BathIcon /> {p.baths} baños</span>}
          {p.m2    && <span><AreaIcon /> {p.m2} m²</span>}
        </div>
        <div className="card-foot">
          <div className="card-price">{p.price}<small>{p.per || ''}</small></div>
          <a className="card-link" href={href} target="_blank" rel="noopener">Consultar <ArrowIcon /></a>
        </div>
      </div>
    </article>
  )
}

function Group({ zone, filters, isFiltering }) {
  const [expanded, setExpanded] = useState(false)

  // Collapse "ver más" whenever filters change
  useEffect(() => { setExpanded(false) }, [filters])

  const q = norm(filters.q)

  const items = PROPS.filter(p => {
    if (p.zone !== zone) return false
    const okOp   = filters.op   === 'Todas' || p.op   === filters.op
    const okType = filters.type === 'Todos' || p.type === filters.type
    const okZone = filters.zone === 'Todas' || p.zone === filters.zone
    const okQ    = !q || norm(`${p.area} ${p.zone} ${p.name} ${p.type}`).includes(q)
    return okOp && okType && okZone && okQ
  })

  if (items.length === 0) return null

  const cap     = isFiltering || expanded ? items.length : INITIAL
  const visible = items.slice(0, cap)
  const hidden  = items.length - cap

  return (
    <div className="props-group">
      <div className="group-head reveal">
        <h3>{zone}</h3>
        <span className="group-count">
          <b>{items.length}</b> {items.length === 1 ? 'propiedad' : 'propiedades'}
        </span>
      </div>
      <div className="props-grid">
        {visible.map((p, i) => (
          <Card key={`${zone}-${p.name}-${i}`} p={p} index={i} instant={isFiltering} />
        ))}
      </div>
      {!isFiltering && hidden > 0 && (
        <div className="group-more">
          <button className="btn btn-ghost" onClick={() => setExpanded(true)}>
            Ver {hidden} más en {zone === 'Isla de Margarita' ? 'Margarita' : zone}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Propiedades({ filters, onFilterChange }) {
  const chips = ['Todas', 'Venta', 'Alquiler']

  const q = norm(filters.q)
  const isFiltering = q !== '' || filters.op !== 'Todas' || filters.type !== 'Todos' || filters.zone !== 'Todas'

  const total = PROPS.filter(p => {
    const okOp   = filters.op   === 'Todas' || p.op   === filters.op
    const okType = filters.type === 'Todos' || p.type === filters.type
    const okZone = filters.zone === 'Todas' || p.zone === filters.zone
    const okQ    = !q || norm(`${p.area} ${p.zone} ${p.name} ${p.type}`).includes(q)
    return okOp && okType && okZone && okQ
  }).length

  return (
    <section className="section" id="propiedades">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Propiedades destacadas</p>
          <h2 className="section-title">Una selección que vale la pena conocer.</h2>
        </div>

        {/* Filtros */}
        <div className="props-bar reveal">
          <div className="filter-chips">
            {chips.map(op => (
              <button
                key={op}
                className={`chip${filters.op === op ? ' active' : ''}`}
                onClick={() => onFilterChange({ ...filters, op })}
              >
                {op}
              </button>
            ))}
          </div>

          {/* Filtro tipo inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <select
              value={filters.type}
              onChange={e => onFilterChange({ ...filters, type: e.target.value })}
              style={{
                fontFamily: 'var(--text)', fontWeight: 600, fontSize: 14,
                padding: '8px 32px 8px 14px', borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--line)', background: 'var(--white)',
                color: 'var(--ink)', appearance: 'none', cursor: 'pointer', outline: 'none',
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23D99E00' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
              }}
            >
              <option value="Todos">Todos los tipos</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Oficina">Oficina</option>
              <option value="Local">Local</option>
              <option value="Terreno">Terreno</option>
            </select>

            <select
              value={filters.zone}
              onChange={e => onFilterChange({ ...filters, zone: e.target.value })}
              style={{
                fontFamily: 'var(--text)', fontWeight: 600, fontSize: 14,
                padding: '8px 32px 8px 14px', borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--line)', background: 'var(--white)',
                color: 'var(--ink)', appearance: 'none', cursor: 'pointer', outline: 'none',
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23D99E00' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
              }}
            >
              <option value="Todas">Todas las ciudades</option>
              <option value="Caracas">Caracas</option>
              <option value="Isla de Margarita">Isla de Margarita</option>
            </select>

            {isFiltering && (
              <button
                onClick={() => onFilterChange({ op: 'Todas', type: 'Todos', zone: 'Todas', q: '' })}
                style={{
                  fontFamily: 'var(--text)', fontWeight: 700, fontSize: 13,
                  padding: '8px 16px', borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--gold)', background: 'transparent',
                  color: 'var(--gold-deep)', cursor: 'pointer',
                }}
              >
                Limpiar filtros ×
              </button>
            )}
          </div>

          <div className="result-count">
            <b>{total}</b> {total === 1 ? 'propiedad' : 'propiedades'}
          </div>
        </div>

        {/* Búsqueda por texto */}
        <div className="reveal" style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            background: 'var(--white)', border: '1px solid var(--line)',
            borderRadius: 'var(--radius)', padding: '12px 16px',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <svg style={{ width: 18, height: 18, stroke: 'var(--muted)', flex: 'none' }} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar por zona o urbanización (Altamira, Pampatar…)"
              value={filters.q}
              onChange={e => onFilterChange({ ...filters, q: e.target.value })}
              style={{
                flex: 1, border: 0, outline: 'none', fontFamily: 'var(--text)',
                fontSize: 15, fontWeight: 500, color: 'var(--ink)',
                background: 'transparent',
              }}
            />
            {filters.q && (
              <button onClick={() => onFilterChange({ ...filters, q: '' })}
                style={{ border: 0, background: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 18, lineHeight: 1 }}>
                ×
              </button>
            )}
          </div>
        </div>

        {/* Grupos por ciudad */}
        <Group zone="Caracas"           filters={filters} isFiltering={isFiltering} />
        <Group zone="Isla de Margarita" filters={filters} isFiltering={isFiltering} />

        {total === 0 && (
          <div className="no-results show">
            <b>Sin resultados</b>
            Ajusta los filtros o escríbenos por WhatsApp y buscamos la propiedad ideal para ti.
          </div>
        )}
      </div>
    </section>
  )
}
