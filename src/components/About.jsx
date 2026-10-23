const STATS = [['6', 'DJ’s y locutores'], ['24/7', 'Música online'], ['70s–hoy', 'Décadas de éxitos'], ['En vivo', 'Pide tus temas']]

export default function About() {
  return (
    <section id="radio">
      <div className="w two">
        <div>
          <h2>Tu estación de recarga favorita</h2>
          <p className="sub">Radio Energía Positiva nació para acompañarte con buena onda: clásicos de los 70, 80 y 90, música tropical, retro romántico y sesiones de DJ en vivo.</p>
          <p className="sub">Somos una radio online hecha por amantes de la música, con locutores y DJ’s que conversan contigo, reciben tus saludos y tocan tus peticiones. También estamos en la app móvil de Play Store.</p>
        </div>
        <div className="stats">
          {STATS.map(([n, l]) => <div key={l}><b className="gt">{n}</b>{l}</div>)}
        </div>
      </div>
    </section>
  )
}
