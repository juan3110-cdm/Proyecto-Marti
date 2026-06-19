import { useState, useEffect, useRef, useCallback } from 'react'

const WA_BASE = 'https://wa.me/584248462562'

const PROPIEDADES = [
  {
    id: 'prop-001',
    nombre: 'Apartamento en Chacao',
    categoria: 'ALQUILER',
    precio: '$ 800 / mes',
    ubicacion: 'Chacao, Caracas',
    metros: 85,
    habitaciones: 2,
    banos: 2,
    estacionamiento: 1,
    descripcion: 'Moderno apartamento en zona residencial exclusiva de Chacao. Excelente iluminación natural, cocina equipada y área de lavandería.',
    fotos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
  },
  {
    id: 'prop-002',
    nombre: 'Casa en La Lagunita',
    categoria: 'VENTA',
    precio: '$ 280,000',
    ubicacion: 'La Lagunita, Caracas',
    metros: 320,
    habitaciones: 4,
    banos: 3,
    estacionamiento: 2,
    descripcion: 'Espectacular casa en una de las urbanizaciones más exclusivas de Caracas. Amplio jardín, piscina y terraza panorámica.',
    fotos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
    ],
  },
  {
    id: 'prop-003',
    nombre: 'Apartamento Vacacional Margarita',
    categoria: 'VACACIONES',
    precio: '$ 120 / noche',
    ubicacion: 'Porlamar, Isla de Margarita',
    metros: 65,
    habitaciones: 2,
    banos: 1,
    estacionamiento: 1,
    descripcion: 'Acogedor apartamento a 5 minutos de la playa. Ideal para vacaciones en familia. Vista al mar desde la terraza.',
    fotos: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
    ],
  },
  {
    id: 'prop-004',
    nombre: 'Oficina en Las Mercedes',
    categoria: 'OFICINA',
    precio: '$ 1,200 / mes',
    ubicacion: 'Las Mercedes, Caracas',
    metros: 120,
    habitaciones: 0,
    banos: 2,
    estacionamiento: 2,
    descripcion: 'Oficina corporativa en el corazón de Las Mercedes. Planta libre, piso de porcelanato, sistema eléctrico trifásico.',
    fotos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    ],
  },
]

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
          <span className="result-count"><b>{PROPIEDADES.length}</b> propiedades</span>
        </div>

        {/* Horizontal scroll row */}
        <PropRow props={PROPIEDADES} />
      </div>

      {/* Modal */}
      {modal && <Modal prop={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
