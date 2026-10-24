import { DJS } from '../data.js'
import { useLive } from '../player.js'

const NOTES = ['♪', '♫', '♬']

export default function Hero({ player }) {
  const live = useLive()
  const shows = [...new Set(DJS.map((d) => d.show))]
  return (
    <div className={`hero ${player.playing ? 'on-air' : ''}`} id="top">
      <div className="hero-bg" aria-hidden="true">
        <i className="ring" /><i className="ring" /><i className="ring" />
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className="note" style={{ left: `${(i * 53) % 96}%`, animationDelay: `${(i * 1.3) % 10}s`, fontSize: `${18 + ((i * 5) % 26)}px` }}>{NOTES[i % 3]}</span>
        ))}
      </div>
      <div className="w hero-c">
        <span className="pill"><i className="dot" /> {live ? `En vivo: ${live.show}` : 'Transmitiendo desde Chile'}</span>
        <p className="kick">Bienvenido a</p>
        <h1>Energía <span className="out">Positiva</span></h1>
        <p className="tl">La mejor energía musical, las 24 horas</p>
        <div>
          <button className="btn big" onClick={player.toggle}>{player.playing ? '❚❚ Pausar' : '▶ Escuchar ahora'}</button>
          <a className="btn ghost big" href="https://wa.me/56979444345" target="_blank" rel="noreferrer">Pedir una canción</a>
        </div>
        {player.msg && <p className="small warn" role="status">{player.msg}</p>}
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="mq">
          {[0, 1].map((k) => <span className="mqg" key={k}>{shows.map((s) => <span key={s}>{s} ✦</span>)}</span>)}
        </div>
      </div>
    </div>
  )
}
