import { useState, useEffect, useRef, useCallback } from 'react'
import PROPIEDADES from '../data/properties'

const WA_BASE = 'https://wa.me/584248462562'

// ─── Photo carousel inside card ───────────────────────────────────────────────
function CardCarousel({ fotos, nombre }) {
  const [idx, setIdx] = useState(0)

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + fotos.length) % fotos.length) }
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % fotos.length) }

  return (
    <div className="pcard-carousel">
      <img
        src={fotos[idx]}
        alt={`${nombre} foto ${idx + 1}`}
        className="pcard-img"
        draggable={false}
      />
      {fotos.length > 1 && (
        <>
          <button className="pcarousel-btn pcarousel-prev" onClick={prev} aria-label="Foto anterior">‹</button>
          <button className="pcarousel-btn pcarousel-next" onClick={next} aria-label="Foto siguiente">›</button>
          <div className="pcarousel-dots">
            {fotos.map((_, i) => (
              <button
                key={i}
                className={`pcarousel-dot${i === idx ? ' active' : ''}`}
                onClick={e => { e.stopPropagation(); setIdx(i) }}
                aria-label={`Ir a foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Full-screen modal ─────────────────────────────────────────────────────────
function Modal({ prop, onClose }) {
  const [mainIdx, setMainIdx] = useState(0)
  const thumbsRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const waLink = `${WA_BASE}?text=${encodeURIComponent(`Hola, me interesa la propiedad: ${prop.nombre}`)}`

  const specs = [
    prop.metros      && { icon: '📐', label: `${prop.metros} m²` },
    prop.habitaciones > 0 && { icon: '🛏', label: `${prop.habitaciones} hab.` },
    prop.banos       && { icon: '🚿', label: `${prop.banos} baños` },
    prop.estacionamiento && { icon: '🚗', label: `${prop.estacionamiento} est.` },
  ].filter(Boolean)

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Main photo */}
        <div className="modal-main-img-wrap">
          <img src={prop.fotos[mainIdx]} alt={`${prop.nombre} ${mainIdx + 1}`} className="modal-main-img" />
          {prop.fotos.length > 1 && (
            <>
              <button className="modal-arr modal-arr-l"
                onClick={() => setMainIdx(i => (i - 1 + prop.fotos.length) % prop.fotos.length)}>‹</button>
              <button className="modal-arr modal-arr-r"
                onClick={() => setMainIdx(i => (i + 1) % prop.fotos.length)}>›</button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {prop.fotos.length > 1 && (
          <div className="modal-thumbs" ref={thumbsRef}>
            {prop.fotos.map((f, i) => (
              <button
                key={i}
                className={`modal-thumb${i === mainIdx ? ' active' : ''}`}
                onClick={() => setMainIdx(i)}
              >
                <img src={f} alt={`miniatura ${i + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-badge">{prop.categoria}</span>
            <h2 className="modal-title">{prop.nombre}</h2>
            <p className="modal-ubicacion">📍 {prop.ubicacion}</p>
          </div>

          {/* Specs grid */}
          {specs.length > 0 && (
            <div className="modal-specs">
              {specs.map(({ icon, label }) => (
                <div className="modal-spec" key={label}>
                  <span className="modal-spec-icon">{icon}</span>
                  <span className="modal-spec-label">{label}</span>
                </div>
              ))}
            </div>
          )}

          <p className="modal-desc">{prop.descripcion}</p>

          <div className="modal-footer">
            <span className="modal-price">{prop.precio}</span>
            <a href={waLink} target="_blank" rel="noopener" className="btn btn-gold-solid modal-wa-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Single property card ──────────────────────────────────────────────────────
function PropCard({ prop, onDetail }) {
  return (
    <article className="pcard">
      <div className="pcard-media">
        <span className="pcard-badge">{prop.categoria}</span>
        <CardCarousel fotos={prop.fotos} nombre={prop.nombre} />
      </div>
      <div className="pcard-body">
        <p className="pcard-ubicacion">📍 {prop.ubicacion}</p>
        <h3 className="pcard-nombre">{prop.nombre}</h3>
        <p className="pcard-precio">{prop.precio}</p>
        <button className="pcard-btn" onClick={() => onDetail(prop)}>
          Ver detalles →
        </button>
      </div>
    </article>
  )
}

// ─── Horizontal scroll row ─────────────────────────────────────────────────────
function PropRow({ props }) {
  const rowRef = useRef(null)

  const scroll = (dir) => {
    const el = rowRef.current
    if (!el) return
    const card = el.querySelector('.pcard')
    const gap = 24
    const amount = card ? card.offsetWidth + gap : 340
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="prow-wrap">
      <button className="prow-arr prow-arr-l" onClick={() => scroll(-1)} aria-label="Anterior">‹</button>
      <div className="prow" ref={rowRef}>
        {props.map(p => (
          <PropCard key={p.id} prop={p} onDetail={window.__openPropModal} />
        ))}
      </div>
      <button className="prow-arr prow-arr-r" onClick={() => scroll(1)} aria-label="Siguiente">›</button>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function Propiedades({ filters, onFilterChange }) {
  const [modal, setModal] = useState(null)

  // Expose setter so PropCard can call it without prop drilling
  window.__openPropModal = useCallback((prop) => setModal(prop), [])

  // Filter by operation chip. "Venta" → VENTA; "Alquiler" → todo lo arrendable.
  const visibles = PROPIEDADES.filter(p => {
    if (filters.op === 'Venta')    return p.categoria === 'VENTA'
    if (filters.op === 'Alquiler') return p.categoria !== 'VENTA'
    return true
  })

  return (
    <section className="section" id="propiedades">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Propiedades destacadas</p>
          <h2 className="section-title">Una selección que vale la pena conocer.</h2>
        </div>

        {/* Filter chips */}
        <div className="props-bar reveal">
          <div className="filter-chips">
            {['Todas', 'Venta', 'Alquiler'].map(op => (
              <button
                key={op}
                className={`chip${filters.op === op ? ' active' : ''}`}
                onClick={() => onFilterChange({ ...filters, op })}
              >
                {op}
              </button>
            ))}
          </div>
          <span className="result-count"><b>{visibles.length}</b> {visibles.length === 1 ? 'propiedad' : 'propiedades'}</span>
        </div>

        {/* Horizontal scroll row */}
        {visibles.length > 0
          ? <PropRow props={visibles} />
          : <p style={{ color: 'var(--muted)', padding: '20px 4px' }}>Sin propiedades en esta categoría.</p>}
      </div>

      {/* Modal */}
      {modal && <Modal prop={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
