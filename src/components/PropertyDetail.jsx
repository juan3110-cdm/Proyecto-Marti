import { useState, useEffect } from 'react'
import PROPIEDADES from '../data/properties'
import { navigate } from './useHashRoute'
import { PinIcon, BedIcon, BathIcon, AreaIcon, WaIcon } from './Icons'

const WA_BASE = 'https://wa.me/584248462562'

export default function PropertyDetail({ id }) {
  const prop = PROPIEDADES.find(p => p.id === id)
  const [mainIdx, setMainIdx] = useState(0)
  const [zoom, setZoom] = useState(false)

  // Reset gallery + scroll to top when the property changes
  useEffect(() => {
    setMainIdx(0)
    setZoom(false)
    window.scrollTo(0, 0)
  }, [id])

  const mediaCount = prop ? prop.fotos.length + (prop.videos?.length || 0) : 0

  // Lightbox keyboard: Escape closes, arrows navigate; lock body scroll
  useEffect(() => {
    if (!zoom) return
    const onKey = e => {
      if (e.key === 'Escape') setZoom(false)
      else if (e.key === 'ArrowRight') setMainIdx(i => (i + 1) % mediaCount)
      else if (e.key === 'ArrowLeft')  setMainIdx(i => (i - 1 + mediaCount) % mediaCount)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom, mediaCount])

  if (!prop) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Propiedad no encontrada</h2>
          <button className="btn btn-gold-solid" onClick={() => navigate('/')}>← Volver a propiedades</button>
        </div>
      </section>
    )
  }

  const waLink = `${WA_BASE}?text=${encodeURIComponent(`Hola, me interesa la propiedad: ${prop.nombre}`)}`

  // Combined media: photos first, then videos
  const media = [
    ...prop.fotos.map(src => ({ type: 'image', src })),
    ...(prop.videos || []).map(src => ({ type: 'video', src })),
  ]
  const current = media[mainIdx] || media[0]

  const specs = [
    prop.habitaciones > 0 && { Icon: BedIcon,  label: `${prop.habitaciones} ${prop.habitaciones === 1 ? 'habitación' : 'habitaciones'}` },
    prop.banos        > 0 && { Icon: BathIcon, label: `${prop.banos} ${prop.banos === 1 ? 'baño' : 'baños'}` },
    prop.metros       > 0 && { Icon: AreaIcon, label: `${prop.metros} m²` },
  ].filter(Boolean)

  return (
    <section className="section detail-page" id="detalle">
      <div className="container detail-wrap">

        {/* Back link */}
        <button className="detail-back" onClick={() => navigate('/')}>
          ← Volver
        </button>

        {/* Two-column: gallery (left) + info (right) */}
        <div className="detail-layout">

        {/* Gallery — vertical thumbnail strip + large portrait media */}
        <div className="detail-gallery">
          {media.length > 1 && (
            <div className="detail-thumbs">
              {media.map((m, i) => (
                <button
                  key={i}
                  className={`detail-thumb${i === mainIdx ? ' active' : ''}${m.type === 'video' ? ' is-video' : ''}`}
                  onClick={() => setMainIdx(i)}
                  aria-label={m.type === 'video' ? 'Ver video' : `Ver foto ${i + 1}`}
                >
                  {m.type === 'video'
                    ? <video src={m.src} muted preload="metadata" />
                    : <img src={m.src} alt={`miniatura ${i + 1}`} />}
                  {m.type === 'video' && <span className="thumb-play">▶</span>}
                </button>
              ))}
            </div>
          )}
          <div className="detail-main-img-wrap">
            <span className="detail-badge">{prop.categoria}</span>
            {current.type === 'video'
              ? <video src={current.src} className="detail-main-img" controls autoPlay playsInline />
              : (
                <img
                  src={current.src}
                  alt={`${prop.nombre} ${mainIdx + 1}`}
                  className="detail-main-img is-zoomable"
                  onClick={() => setZoom(true)}
                />
              )}
            <button className="detail-zoom-hint" onClick={() => setZoom(true)} aria-label="Ampliar">⤢</button>
          </div>
        </div>

        {/* Info */}
        <div className="detail-info">
          <div className="detail-loc"><PinIcon /> {prop.ubicacion}</div>
          <h1 className="detail-title">{prop.nombre}</h1>

          {specs.length > 0 && (
            <div className="detail-specs">
              {specs.map(({ Icon, label }) => (
                <span key={label}><Icon /> {label}</span>
              ))}
            </div>
          )}

          <div className="detail-price">{prop.precio}</div>

          <p className="detail-desc">{prop.descripcion}</p>

          <a href={waLink} target="_blank" rel="noopener" className="btn btn-gold-solid detail-wa">
            <WaIcon /> Consultar por WhatsApp
          </a>
        </div>
        </div>
      </div>

      {/* Lightbox / zoom overlay — navigates all media (photos + video) */}
      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setZoom(false)} aria-label="Cerrar">✕</button>

          {media.length > 1 && (
            <>
              <button
                className="lightbox-arrow lightbox-arrow-l"
                onClick={e => { e.stopPropagation(); setMainIdx(i => (i - 1 + media.length) % media.length) }}
                aria-label="Anterior"
              >‹</button>
              <button
                className="lightbox-arrow lightbox-arrow-r"
                onClick={e => { e.stopPropagation(); setMainIdx(i => (i + 1) % media.length) }}
                aria-label="Siguiente"
              >›</button>
            </>
          )}

          {current.type === 'video'
            ? (
              <video
                src={current.src}
                className="lightbox-img"
                controls autoPlay playsInline
                onClick={e => e.stopPropagation()}
              />
            )
            : (
              <img
                src={current.src}
                alt={prop.nombre}
                className="lightbox-img"
                onClick={e => e.stopPropagation()}
              />
            )}

          {media.length > 1 && (
            <div className="lightbox-nav" onClick={e => e.stopPropagation()}>
              {media.map((m, i) => (
                <button
                  key={i}
                  className={`lightbox-dot${i === mainIdx ? ' active' : ''}${m.type === 'video' ? ' is-video' : ''}`}
                  onClick={() => setMainIdx(i)}
                  aria-label={m.type === 'video' ? 'Video' : `Foto ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
