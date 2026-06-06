import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import PorQueElegirnos from './components/PorQueElegirnos'
import Propiedades from './components/Propiedades'
import Zonas from './components/Zonas'
import SobreNosotros from './components/SobreNosotros'
import Contacto from './components/Contacto'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import WAFloat from './components/WAFloat'
import { useReveal } from './components/useReveal'

const DEFAULT_FILTERS = { op: 'Todas', type: 'Todos', zone: 'Todas', q: '' }

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  useReveal()

  return (
    <>
      <Navbar />
      <Hero onSearch={setFilters} />
      <Servicios />
      <PorQueElegirnos />
      <Propiedades filters={filters} onFilterChange={setFilters} />
      <Zonas />
      <SobreNosotros />
      <Contacto />
      <CTAFinal />
      <Footer />
      <WAFloat />
    </>
  )
}
