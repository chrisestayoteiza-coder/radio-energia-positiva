import { useEffect, useState } from 'react'

const LINKS = [['top', 'Inicio'], ['chat', 'Chat en vivo'], ['radio', 'La radio'], ['djs', 'DJ’s'], ['parrilla', 'Programación'], ['videos', 'Videos'], ['contacto', 'Contacto']]

export default function Header({ onTheme }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])
  return (
    <header className="hd">
      <nav className="w nav">
        <a className="logo" href="#top" aria-label="Radio Energía Positiva, inicio">
          <img src="/logo.png" alt="" />
          <span>Energía Positiva</span>
        </a>
        <div className="links">
          {LINKS.slice(1).map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <button className="icon" onClick={onTheme} aria-label="Cambiar tema">◐</button>
        <button className="icon burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menú">{open ? '✕' : '☰'}</button>
      </nav>
      {open && (
        <div className="menu" onClick={() => setOpen(false)}>
          {LINKS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      )}
    </header>
  )
}
