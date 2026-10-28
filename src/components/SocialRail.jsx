import { SOCIAL } from '../data.js'
import { SocialIcon } from './Icons.jsx'

export default function SocialRail() {
  return (
    <aside className="rail" aria-label="Redes sociales">
      {SOCIAL.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} style={{ background: s.bg }}>
          <SocialIcon s={s} size={22} />
        </a>
      ))}
    </aside>
  )
}
