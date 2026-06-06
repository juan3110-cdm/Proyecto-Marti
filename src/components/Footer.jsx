import { LogoIcon, WaIcon, InstagramIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#hero" className="logo" aria-label="Proyecto Martí — inicio">
              <span className="logo-mark"><LogoIcon /></span>
              <span className="logo-name">Proyecto Martí<small>Bienes Raíces</small></span>
            </a>
            <p className="footer-about">Inmobiliaria venezolana premium con más de 20 años de experiencia en Caracas y la Isla de Margarita.</p>
          </div>
          <div>
            <h4>Navegación</h4>
            <ul>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#propiedades">Propiedades</a></li>
              <li><a href="#zonas">Zonas</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
            </ul>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><a href="#propiedades">Venta</a></li>
              <li><a href="#propiedades">Alquiler</a></li>
              <li><a href="#propiedades">Vacaciones Margarita</a></li>
              <li><a href="#propiedades">Oficinas</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href="https://wa.me/584248462562" target="_blank" rel="noopener">
                  <WaIcon /> +58 424-8462562
                </a>
              </li>
              <li>
                <a href="https://instagram.com/proyecto_marti" target="_blank" rel="noopener">
                  <InstagramIcon /> @proyecto_marti
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Proyecto Martí · Especialistas en Bienes Raíces · Caracas &amp; Isla de Margarita</span>
          <a href="https://instagram.com/proyecto_marti" target="_blank" rel="noopener">Instagram · @proyecto_marti</a>
        </div>
      </div>
    </footer>
  )
}
