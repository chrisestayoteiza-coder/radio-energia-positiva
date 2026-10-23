const LINKS = [['radio', 'La radio'], ['djs', 'DJ’s'], ['parrilla', 'Programación'], ['videos', 'Videos'], ['chat', 'Chat'], ['contacto', 'Contacto']]

export default function Header({ onTheme }) {
  return (
    <header className="hd">
      <nav className="w nav">
        <a className="logo" href="#top" aria-label="Radio Energía Positiva, inicio">
  <img src="/logo.png" alt="" />
  <span>Energía Positiva</span>
</a>
        <div className="links">
          {LINKS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <button className="icon" onClick={onTheme} aria-label="Cambiar tema">◐</button>
      </nav>
    </header>
  )
}
