import { useState, useEffect } from 'react'
import PROPS from '../data/properties'
import { PinIcon, BedIcon, BathIcon, AreaIcon, HeartIcon, ArrowIcon } from './Icons'

const WA = 'https://wa.me/584248462562'
const INITIAL = 8

const stripAccents = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
const norm = s => stripAccents((s || '').toString().toLowerCase()).trim()

function Card({ p, index }) {
  const [fav, setFav] = useState(false)
  const href = p.ig || WA
  const cityShort = p.zone === 'Isla de Margarita' ? 'Margarita' : 'Caracas'
  const loc = (p.area && p.area !== cityShort) ? `${p.area} · ${p.zone}` : p.zone

  return (
    <article className="card reveal" data-d={(index % 4) + 1}>
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
          {p.beds  && <span><BedIcon /> {p.beds} hab</span>}
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

function Group({ zone, gridId, groupId, countId, moreBtnLabel, filters }) {
  const [expanded, setExpanded] = useState(false)

  const q = norm(filters.q)
  const filtering = q !== '' || filters.op !== 'Todas' || filters.type !== 'Todos' || filters.zone !== 'Todas'

  const items = PROPS.filter(p => {
    if (p.zone !== zone) return false
    const okOp   = filters.op   === 'Todas' || p.op   === filters.op
    const okType = filters.type === 'Todos' || p.type === filters.type
    const okZone = filters.zone === 'Todas' || p.zone === filters.zone
    const okQ    = !q || norm(`${p.area} ${p.zone} ${p.name} ${p.type}`).includes(q)
    return okOp && okType && okZone && okQ
  })

  useEffect(() => { setExpanded(false) }, [filters])

  const cap = (filtering || expanded) ? items.length : INITIAL
  const visible = items.slice(0, cap)
  const hidden  = items.length - cap

  if (items.length === 0) return null

  return (
    <div className="props-group reveal" id={groupId}>
      <div className="group-head">
        <h3>{zone}</h3>
        <span className="group-count" id={countId}>
          <b>{items.length}</b> {items.length === 1 ? 'propiedad' : 'propiedades'}
        </span>
      </div>
      <div className="props-grid" id={gridId}>
        {visible.map((p, i) => <Card key={`${p.name}-${i}`} p={p} index={i} />)}
      </div>
      {!filtering && hidden > 0 && (
        <div className="group-more">
          <button className="btn btn-ghost group-more-btn" onClick={() => setExpanded(true)}>
            Ver {hidden} más en {zone === 'Isla de Margarita' ? 'Margarita' : zone}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Propiedades({ filters, onFilterChange }) {
  const chips = ['Todas', 'Venta', 'Alquiler']

  const totalVisible = PROPS.filter(p => {
    const q = norm(filters.q)
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
          <div className="result-count">
            <b>{totalVisible}</b> {totalVisible === 1 ? 'propiedad' : 'propiedades'}
          </div>
        </div>

        <Group zone="Caracas"           gridId="gridCaracas"   groupId="groupCaracas"   countId="countCaracas"   filters={filters} />
        <Group zone="Isla de Margarita" gridId="gridMargarita" groupId="groupMargarita" countId="countMargarita" filters={filters} />

        {totalVisible === 0 && (
          <div className="no-results show">
            <b>Sin resultados</b>
            Ajusta los filtros o escríbenos por WhatsApp y buscamos la propiedad ideal para ti.
          </div>
        )}
      </div>
    </section>
  )
}
