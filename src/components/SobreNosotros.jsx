import { LogoIcon } from './Icons'

export default function SobreNosotros() {
  return (
    <section className="section" id="nosotros">
      <div className="container about-grid">
        <div className="about-media reveal">
          <div className="ph"><span className="ph-tag">foto · equipo u<br/>oficina Proyecto Martí</span></div>
          <span className="about-frame" />
        </div>
        <div className="about reveal" data-d="2">
          <p className="eyebrow">Sobre nosotros</p>
          <h2>Una inmobiliaria venezolana, hecha de confianza.</h2>
          <p className="lead">Desde hace más de 20 años acompañamos a familias e inversionistas a encontrar su lugar en Venezuela.</p>
          <p>Nacimos en Caracas y crecimos junto al país. Conocemos de cerca cada urbanización de la capital y cada rincón de la Isla de Margarita, porque hemos trabajado en ellos durante dos décadas. Esa cercanía es lo que nos permite asesorar con honestidad: recomendamos lo que realmente conviene, no lo que es más fácil de vender.</p>
          <p>En Proyecto Martí cada cliente tiene nombre. Trabajamos con dedicación, discreción y un compromiso real con que su próxima propiedad sea la decisión correcta.</p>
          <div className="about-sign">
            <span className="mark"><LogoIcon /></span>
            <div>
              <b>Equipo Proyecto Martí</b>
              <span>Especialistas en bienes raíces · Venezuela</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
