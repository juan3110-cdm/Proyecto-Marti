const services = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/><path d="M3 20h18"/></svg>,
    title: 'Alquiler',
    desc: 'Inmuebles residenciales y comerciales en alquiler, con contratos claros y respaldo legal.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><circle cx="12" cy="15" r="2"/></svg>,
    title: 'Venta',
    desc: 'Tasación justa, marketing del inmueble y negociación hasta cerrar al mejor valor.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V10l9-7 9 7v11"/><path d="M9 21v-7h6v7"/></svg>,
    title: 'Casas',
    desc: 'Quintas y casas familiares en las mejores urbanizaciones de Caracas y Margarita.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 5 0"/><path d="M5 14V7l4-2 4 3"/><path d="M13 14V8l5-3 1 2v7"/></svg>,
    title: 'Vacaciones en Margarita',
    desc: 'Villas y apartamentos frente al mar para temporadas inolvidables en la isla.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 9h4a1 1 0 0 1 1 1v11"/><path d="M8 8h3M8 12h3M8 16h3M2 21h20"/></svg>,
    title: 'Oficinas',
    desc: 'Espacios corporativos y locales comerciales en zonas estratégicas de negocios.',
  },
]

export default function Servicios() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Nuestros servicios</p>
          <h2 className="section-title">Acompañamos cada decisión inmobiliaria.</h2>
          <p className="section-lead">Desde la primera consulta hasta la firma. Un mismo equipo, conocimiento real del mercado venezolano y trato personalizado en cada operación.</p>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <article key={s.title} className="svc reveal" data-d={i + 1}>
              <span className="svc-ico">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
