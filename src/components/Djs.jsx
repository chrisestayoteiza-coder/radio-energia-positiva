import { useState } from 'react'
import { DJS, DN } from '../data.js'

function Avatar({ dj }) {
  const [failed, setFailed] = useState(false)
  const initials = dj.name.replace(/^DJ /, '').slice(0, 2).toUpperCase()
  return (
    <div className="av" style={{ background: dj.color }}>
      {failed ? initials : <img src={`/djs/${dj.id}.png`} alt={dj.name} onError={() => setFailed(true)} />}
    </div>
  )
}

export default function Djs() {
  return (
    <section id="djs" className="alt">
      <div className="w">
        <h2>Nuestros DJ’s</h2>
        <p className="sub">Las voces y las manos detrás de cada noche.</p>
        <div className="grid">
          {DJS.map((d) => (
            <article className="card" key={d.id}>
              <Avatar dj={d} />
              <h3>{d.name}</h3>
              <span className="tag">{d.show}</span>
              <p>{d.bio}</p>
              <b className="small">{d.days.length ? `${d.days.map((i) => DN[i]).join(' y ')}, ${d.time} hrs` : 'Horario por confirmar'}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}