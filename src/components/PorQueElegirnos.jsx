const stats = [
  { num: '+20', title: 'Años de experiencia', desc: 'Una trayectoria construida operación a operación en el mercado venezolano.' },
  { num: '2',   title: 'Caracas & Isla de Margarita', desc: 'Presencia y conocimiento profundo de las dos plazas más buscadas del país.' },
  { num: '1:1', title: 'Atención personalizada', desc: 'Un asesor dedicado que acompaña su caso de principio a fin, sin intermediarios.' },
]

export default function PorQueElegirnos() {
  return (
    <section className="section section-dark" id="porque">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Por qué elegirnos</p>
          <h2 className="section-title">Dos décadas conociendo cada esquina del país.</h2>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.title} className="stat reveal" data-d={i + 1}>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
