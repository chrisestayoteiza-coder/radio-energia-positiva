import { DJS, DN, chileNow, nextBroadcasts } from '../data.js'

export default function Schedule() {
  const today = chileNow().day
  const next = nextBroadcasts(4)
  const rows = [1, 2, 3, 4, 5, 6, 0].flatMap((day) =>
    DJS.filter((d) => d.days.includes(day)).sort((a, b) => a.time.localeCompare(b.time)).map((dj) => ({ day, dj }))
  )
  return (
    <section id="parrilla">
      <div className="w">
        <h2>Programación</h2>
        <p className="sub">Horarios de Chile. Lo que viene y la semana completa.</p>

        <h3 className="mh">Próximas transmisiones</h3>
        <div className="next">
          {next.map((n, k) => (
            <article className="nx" key={k} style={{ '--c2': n.dj.color }}>
              <div className="nxd"><b>{n.num}</b><span>{n.mon}</span></div>
              <div>
                <span className="tag">{n.label}</span>
                <h4>{n.dj.show}</h4>
                <p className="small">{n.dj.name} · {n.dj.time} hrs</p>
              </div>
            </article>
          ))}
        </div>

        <h3 className="mh">Semana completa</h3>
        <ol className="tracks">
          {rows.map((r, i) => (
            <li key={r.dj.id + r.day} className={`tr ${r.day === today ? 'today' : ''}`}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="d">{DN[r.day]}</span>
              <span className="s"><b>{r.dj.show}</b><small>{r.dj.name}</small></span>
              <span className="t">{r.dj.time}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
