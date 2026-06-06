import { useState, useRef } from 'react'
import { WaIcon, MailIcon, LocationIcon, CheckIcon } from './Icons'

export default function Contacto() {
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  const validate = (data) => {
    const e = {}
    if (!data.nombre?.trim()) e.nombre = true
    if (!data.telefono?.trim()) e.telefono = true
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = true
    return e
  }

  const submit = e => {
    e.preventDefault()
    const fd = new FormData(formRef.current)
    const data = Object.fromEntries(fd)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSuccess(true)
  }

  return (
    <section className="section section-dark" id="contacto">
      <div className="container contact-grid">
        <div className="contact-aside reveal">
          <p className="eyebrow">Agenda tu visita</p>
          <h2>Conversemos sobre tu próxima propiedad.</h2>
          <p>Déjanos tus datos y un asesor te contactará para coordinar una visita o resolver tus dudas. También puedes escribirnos directo.</p>
          <ul className="contact-list">
            <li>
              <span className="ci"><WaIcon /></span>
              <div><small>WhatsApp</small><b>+58 424-8462562</b></div>
            </li>
            <li>
              <span className="ci"><MailIcon /></span>
              <div><small>Correo</small><b>info@proyectomarti.com</b></div>
            </li>
            <li>
              <span className="ci"><LocationIcon /></span>
              <div><small>Cobertura</small><b>Caracas · Isla de Margarita</b></div>
            </li>
          </ul>
        </div>

        <form className="form reveal" data-d="2" ref={formRef} onSubmit={submit} noValidate>
          {!success ? (
            <div className="form-body">
              <div className="form-row">
                <div className={`field${errors.nombre ? ' invalid' : ''}`}>
                  <label htmlFor="cName">Nombre <span className="req">*</span></label>
                  <input type="text" id="cName" name="nombre" placeholder="Tu nombre" autoComplete="name" onChange={() => setErrors(e => ({...e, nombre: false}))} />
                  <span className="err">Ingresa tu nombre.</span>
                </div>
                <div className={`field${errors.telefono ? ' invalid' : ''}`}>
                  <label htmlFor="cPhone">Teléfono / WhatsApp <span className="req">*</span></label>
                  <input type="tel" id="cPhone" name="telefono" placeholder="+58 …" autoComplete="tel" onChange={() => setErrors(e => ({...e, telefono: false}))} />
                  <span className="err">Ingresa un teléfono de contacto.</span>
                </div>
              </div>
              <div className={`field${errors.email ? ' invalid' : ''}`}>
                <label htmlFor="cEmail">Correo electrónico <span className="req">*</span></label>
                <input type="email" id="cEmail" name="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" onChange={() => setErrors(e => ({...e, email: false}))} />
                <span className="err">Ingresa un correo válido.</span>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="cInterest">Me interesa</label>
                  <select id="cInterest" name="interes">
                    <option>Comprar</option>
                    <option>Alquilar</option>
                    <option>Vender mi propiedad</option>
                    <option>Vacacionar en Margarita</option>
                    <option>Oficina / local</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="cZone">Zona de interés</label>
                  <select id="cZone" name="zona">
                    <option>Caracas</option>
                    <option>Isla de Margarita</option>
                    <option>Ambas</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="cMsg">Mensaje</label>
                <textarea id="cMsg" name="mensaje" placeholder="Cuéntanos qué estás buscando…" />
              </div>
              <div className="form-foot">
                <button type="submit" className="btn btn-gold-solid">Agendar visita</button>
                <span className="form-note">Te respondemos en menos de 24 horas hábiles.</span>
              </div>
            </div>
          ) : (
            <div className="form-success show">
              <span className="ok"><CheckIcon /></span>
              <h3>¡Solicitud enviada!</h3>
              <p>Gracias por escribirnos. Un asesor de Proyecto Martí te contactará muy pronto.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
