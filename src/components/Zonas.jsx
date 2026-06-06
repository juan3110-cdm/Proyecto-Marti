const zones = [
  {
    num: '01 / Capital',
    name: 'Caracas',
    img: '/caracas-zona.png',
    alt: 'Caracas con el cerro El Ávila al fondo',
    desc: 'El corazón residencial y corporativo del país, con la mayor variedad de inmuebles premium.',
    tags: ['Altamira', 'La Castellana', 'Los Palos Grandes', 'Las Mercedes', 'Country Club'],
  },
  {
    num: '02 / Isla',
    name: 'Isla de Margarita',
    img: '/margarita-zona.jpg',
    alt: 'Villa con piscina y vista al mar en la Isla de Margarita',
    desc: 'El Caribe venezolano: residencias de playa, inversión vacacional y segunda vivienda.',
    tags: ['Playa El Agua', 'Pampatar', 'Costa Azul', 'Porlamar'],
  },
]

export default function Zonas() {
  return (
    <section className="section section-dark" id="zonas">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Dónde operamos</p>
          <h2 className="section-title">Dos destinos, un mismo estándar.</h2>
          <p className="section-lead">Nos especializamos en las zonas de mayor demanda. Conocemos sus precios, sus calles y su gente.</p>
        </div>
        <div className="zones-grid">
          {zones.map((z, i) => (
            <article key={z.name} className="zone reveal" data-d={i + 1}>
              <img className="zone-img" src={z.img} alt={z.alt} loading="lazy" />
              <span className="zone-num">{z.num}</span>
              <div className="zone-body">
                <h3>{z.name}</h3>
                <p>{z.desc}</p>
                <div className="zone-tags">
                  {z.tags.map(t => <span key={t} className="zone-tag">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
