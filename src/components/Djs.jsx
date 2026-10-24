import { useRef, useState } from 'react'
import { DJS, DN } from '../data.js'

const ROLES = {
  dj: { label: 'DJ', cls: 'r-dj' },
  locutor: { label: 'Locutor', cls: 'r-loc' },
  productor: { label: 'Productor', cls: 'r-prod' },
}

function Photo({ dj }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="ini" style={{ background: dj.color }}>{dj.name.replace(/^DJ /, '').slice(0, 2).toUpperCase()}</div>
  return <img src={`/djs/${dj.id}.png`} alt={dj.name} onError={() => setFailed(true)} />
}

export default function Djs() {
  const [i, setI] = useState(0)
  const x0 = useRef(0)
  const n = DJS.length
  const d = DJS[i]
  const go = (s) => setI((i + s + n) % n)
  const pad = (v) => String(v).padStart(2, '0')

  return (
    <section id="djs" className="alt">
      <div className="w">
        <h2>Nuestros DJ’s</h2>
        <p className="sub">Las voces y las manos detrás de cada noche.</p>
        <div className="dcar" onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - x0.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }}>
          <div className="dnum" aria-hidden="true">{pad(i + 1)}</div>
          <div className="dtxt" key={d.id}>
            <div className="roles">
              {(d.roles || ['dj']).map((r) => <span key={r} className={`role ${ROLES[r]?.cls}`}>{ROLES[r]?.label || r}</span>)}
            </div>
            <h3>{d.name}</h3>
            <p className="dshow">{d.show}</p>
            <p className="dbio">{d.bio}</p>
            <b className="small">{d.days.length ? `${d.days.map((k) => DN[k]).join(' y ')} · ${d.time} hrs` : 'Horario por confirmar'}</b>
          </div>
          <div className="dpic" key={`p${d.id}`}><Photo dj={d} /></div>
        </div>
        <div className="dctl">
          <button className="icon" onClick={() => go(-1)} aria-label="DJ anterior">←</button>
          <span aria-live="polite">{pad(i + 1)} / {pad(n)}</span>
          <button className="icon" onClick={() => go(1)} aria-label="DJ siguiente">→</button>
        </div>
        <div className="thumbs">
          {DJS.map((x, k) => <button key={x.id} className={`chip ${k === i ? 'sel' : ''}`} onClick={() => setI(k)}>{x.name.replace(/^DJ /, '')}</button>)}
        </div>
      </div>
    </section>
  )
}
