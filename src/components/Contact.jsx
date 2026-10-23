import { useState } from 'react'
import { SOCIAL } from '../data.js'

export default function Contact() {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const submit = (e) => {
    e.preventDefault()
    location.href = `mailto:contacto@radioenergiapositiva.cl?subject=${encodeURIComponent('Mensaje de ' + (name || 'oyente'))}&body=${encodeURIComponent(msg)}`
  }
  return (
    <section id="contacto" className="alt">
      <div className="w">
        <h2>Contacto y redes</h2>
        <p className="sub">Escríbenos, sigue nuestras redes o descarga la app.</p>
        <div className="soc">
          {SOCIAL.map((s) => (
            <a key={s.name} className="card" href={s.url} target="_blank" rel="noreferrer">
              <span className="ic" style={{ background: s.bg }}>{s.ic}</span>
              <span><b>{s.name}</b><br /><span className="small">{s.handle}</span></span>
            </a>
          ))}
        </div>
        <div className="two">
          <form className="card cf" onSubmit={submit}>
            <h3>Escríbenos</h3>
            <p className="small">contacto@radioenergiapositiva.cl</p>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" aria-label="Tu nombre" />
            <textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tu mensaje" aria-label="Tu mensaje" required />
            <button className="btn">Enviar por correo</button>
          </form>
          <div className="card">
            <h3>App móvil</h3>
            <p>Descarga “Radio Energía Positiva” en Google Play y lleva la programación a todas partes.</p>
            <a className="btn" href="https://play.google.com/store/search?q=Radio%20Energia%20Positiva&c=apps" target="_blank" rel="noreferrer">Ir a Google Play</a>
          </div>
        </div>
      </div>
    </section>
  )
}
