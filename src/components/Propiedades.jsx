import { useState } from 'react'
import PROPIEDADES from '../data/properties'
import { navigate } from './useHashRoute'
import { PinIcon, BedIcon, BathIcon, AreaIcon, HeartIcon, ArrowIcon } from './Icons'

function Card({ p }) {
  const [fav, setFav] = useState(false)

  const open = () => navigate(`/propiedad/${p.id}`)

  return (
    <article className="card reveal is-visible" onClick={open} style={{ cursor: 'pointer' }}>
      <div className="card-media">
        <span className="card-badge">{p.categoria}</span>
        <button
          className={`card-fav${fav ? ' on' : ''}`}
          aria-label="Guardar propiedad"
          onClick={e => { e.stopPropagation(); setFav(f => !f) }}
        >
          <HeartIcon />
        </button>
        <img className="card-img" src={p.fotos[0]} alt={p.nombre} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-loc"><PinIcon /> {p.ubicacion}</div>
        <h3>{p.nombre}</h3>
        <div className="card-specs">
          {p.habitaciones > 0 && <span><BedIcon /> {p.habitaciones} hab</span>}
          {p.banos        > 0 && <span><BathIcon /> {p.banos} baños</span>}
          {p.metros       > 0 && <span><AreaIcon /> {p.metros} m²</span>}
        </div>
        <div className="card-foot">
          <div className="card-price">{p.precio}</div>
          <button
            className="card-link"
            onClick={e => { e.stopPropagation(); open() }}
          >
            Consultar <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

// accent-insensitive normaliser
const norm = s =>
  (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

export default function Propiedades({ filters, onFilterChange }) {
  const q = norm(filters.q)

  const visibles = PROPIEDADES.filter(p => {
    const haystack = norm(`${p.nombre} ${p.ubicacion} ${p.categoria} ${p.descripcion}`)

    // Operación (chip + searchbar): Venta → VENTA; Alquiler → todo lo arrendable
    const okOp =
      filters.op === 'Venta'     ? p.categoria === 'VENTA' :
      filters.op === 'Alquiler'  ? p.categoria !== 'VENTA' :
      true

    // Ciudad
    const okZone =
      !filters.zone || filters.zone === 'Todas' ? true :
      filters.zone === 'Isla de Margarita'      ? norm(p.ubicacion).includes('margarita') :
      norm(p.ubicacion).includes(norm(filters.zone))

    // Tipo (Apartamento / Casa / Oficina / Local / Terreno / Edificio)
    const okType =
      !filters.type || filters.type === 'Todos' ? true :
      haystack.includes(norm(filters.type))

    // Texto libre
    const okQ = !q || haystack.includes(q)

    return okOp && okZone && okType && okQ
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
          <span className="result-count">
            <b>{visibles.length}</b> {visibles.length === 1 ? 'propiedad' : 'propiedades'}
          </span>
        </div>

        {/* Card grid */}
        {visibles.length > 0 ? (
          <div className="props-grid">
            {visibles.map(p => <Card key={p.id} p={p} />)}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', padding: '20px 4px' }}>Sin propiedades en esta categoría.</p>
        )}
      </div>
    </section>
  )
}
