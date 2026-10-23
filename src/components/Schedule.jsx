import { DJS, DN, chileNow } from '../data.js'

export default function Schedule() {
  const today = chileNow().day
  return (
    <section id="parrilla">
      <div className="w">
        <h2>Programación semanal</h2>
        <p className="sub">Horarios de Chile. El día de hoy aparece resaltado.</p>
        <div className="sched">
          {[1, 2, 3, 4, 5, 6, 0].map((i) => {
            const slots = DJS.filter((d) => d.days.includes(i)).sort((a, b) => a.time.localeCompare(b.time))
            return (
              <div key={i} className={`day ${i === today ? 'today' : ''}`}>
                <h4>{DN[i]}</h4>
                {slots.length ? slots.map((d) => (
                  <div className="slot" key={d.id} style={{ borderColor: d.color }}>
                    <b>{d.show}</b><span className="small">{d.time} · {d.name}</span>
                  </div>
                )) : <div className="small">Música non-stop</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
