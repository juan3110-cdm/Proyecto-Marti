import { useState, useEffect } from 'react'

// Tiny hash router. Returns the current hash path (without the leading '#').
export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1) || '/')

  useEffect(() => {
    const onChange = () => setHash(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

export function navigate(path) {
  window.location.hash = path
}
