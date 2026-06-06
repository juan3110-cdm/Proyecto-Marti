import { WaIcon } from './Icons'

export default function CTAFinal() {
  return (
    <section className="section section-dark cta">
      <div className="container cta-inner reveal">
        <h2>¿Listo para encontrar <span className="gold">tu lugar</span> en Venezuela?</h2>
        <p>Escríbenos por WhatsApp y conversemos hoy mismo. Más de 20 años de experiencia, a un mensaje de distancia.</p>
        <div className="cta-actions">
          <a href="https://wa.me/584248462562" target="_blank" rel="noopener" className="btn btn-wa">
            <WaIcon /> Escríbenos por WhatsApp
          </a>
          <a href="#propiedades" className="btn btn-ghost">Ver propiedades</a>
        </div>
      </div>
    </section>
  )
}
