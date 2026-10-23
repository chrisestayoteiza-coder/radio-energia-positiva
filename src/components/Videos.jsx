import { useEffect, useMemo, useState } from 'react'
import { useVideos } from '../hooks.js'
import { DJS } from '../data.js'

const CHANNEL_URL = import.meta.env.VITE_YT_CHANNEL_URL || 'https://www.youtube.com/'

export default function Videos() {
  const { videos, live, loading } = useVideos()
  const [filter, setFilter] = useState('Todos')
  const [open, setOpen] = useState(null)
  const cats = useMemo(() => ['Todos', ...new Set(videos.map((v) => v.dj))], [videos])
  const shown = videos.filter((v) => filter === 'Todos' || v.dj === filter)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const color = (dj) => DJS.find((d) => d.name.includes(dj))?.color || '#7c3aed'

  return (
    <section id="videos" className="alt">
      <div className="w">
        <h2>Galería de videos</h2>
        <p className="sub">Programas resubidos de nuestro canal de YouTube.</p>
        {!live && !loading && <p className="small warn">Mostrando videos de ejemplo. Configura VITE_YT_API_KEY y VITE_YT_CHANNEL_ID para cargar los reales.</p>}
        <div className="chips">
          {cats.map((c) => <button key={c} className={`chip ${c === filter ? 'sel' : ''}`} onClick={() => setFilter(c)}>{c}</button>)}
        </div>
        <div className="grid">
          {shown.map((v) => (
            <button className="card vid" key={v.id} onClick={() => live && setOpen(v)} disabled={!live}>
              <div className="th" style={v.thumb ? { backgroundImage: `url(${v.thumb})` } : { background: `linear-gradient(135deg, ${color(v.dj)}, #241a2e)` }}>
                <span className="playico">▶</span>
              </div>
              <div className="vt"><h3>{v.title}</h3><span className="small">{v.dj}</span></div>
            </button>
          ))}
        </div>
        <p><a className="btn" href={CHANNEL_URL} target="_blank" rel="noreferrer">Ver todo el canal en YouTube</a></p>
      </div>
      {open && (
        <div className="modal" onClick={() => setOpen(null)} role="dialog" aria-label={open.title}>
          <div className="mbox" onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://www.youtube-nocookie.com/embed/${open.id}?autoplay=1`} title={open.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            <button className="btn ghost" onClick={() => setOpen(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  )
}
