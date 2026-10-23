import { useEffect, useRef, useState } from 'react'
import { liveNow } from '../data.js'

const STREAM = import.meta.env.VITE_STREAM_URL

export default function Hero() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [msg, setMsg] = useState('')
  const [live, setLive] = useState(liveNow())

  useEffect(() => {
    const t = setInterval(() => setLive(liveNow()), 60000)
    return () => { clearInterval(t); audio.current?.pause() }
  }, [])

  const toggle = async () => {
    if (!STREAM) return setMsg('Falta configurar VITE_STREAM_URL en el archivo .env.')
    if (!audio.current) audio.current = new Audio(STREAM)
    try {
      if (audio.current.paused) { await audio.current.play(); setPlaying(true); setMsg('') }
      else { audio.current.pause(); setPlaying(false) }
    } catch { setMsg('No se pudo reproducir el stream. Revisa la URL.') }
  }

  return (
    <div className="hero" id="top">
      <div className="w hero-grid">
        <div>
          <span className="pill"><i className="dot" /> Transmitiendo desde Chile</span>
          <h1>La mejor <span className="gt">energía musical</span>, las 24 horas.</h1>
          <p className="sub">Retro, tropical, mezclas en vivo y fiesta. Pide tus canciones favoritas por WhatsApp y recárgate con nosotros.</p>
          <a className="btn" href="#chat">Entrar al chat en vivo</a>{' '}
          <a className="btn ghost" href="https://wa.me/56979444345" target="_blank" rel="noreferrer">Pedir una canción</a>
        </div>
        <div className={`player ${playing ? 'on' : ''}`}>
          <div className="row">
            <button className="play" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>{playing ? '❚❚' : '▶'}</button>
            <div>
              <div className="small">Ahora en vivo</div>
              <b className="big">{live ? live.show : 'Radio Energía Positiva'}</b>
              <div className="small">{live ? `Con ${live.name}` : 'Música non-stop'}</div>
            </div>
          </div>
          <div className="eq" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <b key={i} />)}</div>
          {msg && <div className="small warn" role="status">{msg}</div>}
        </div>
      </div>
    </div>
  )
}
