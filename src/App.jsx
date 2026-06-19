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
import PropertyDetail from './components/PropertyDetail'
import { useReveal } from './components/useReveal'
import { useHashRoute } from './components/useHashRoute'

const DEFAULT_FILTERS = { op: 'Todas', type: 'Todos', zone: 'Todas', q: '' }

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const route = useHashRoute()
  useReveal(route)

  const detailMatch = route.match(/^\/propiedad\/(.+)$/)

  return (
    <>
      <Navbar />
      {detailMatch ? (
        <PropertyDetail id={detailMatch[1]} />
      ) : (
        <>
          <Hero onSearch={setFilters} />
          <Servicios />
          <PorQueElegirnos />
          <Propiedades filters={filters} onFilterChange={setFilters} />
          <Zonas />
          <SobreNosotros />
          <Contacto />
          <CTAFinal />
        </>
      )}
      <Footer />
      <WAFloat />
    </>
  )
}
