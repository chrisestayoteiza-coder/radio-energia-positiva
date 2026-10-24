import { useLive } from '../player.js'

export default function PlayerBar({ player }) {
  const live = useLive()
  return (
    <div className={`pbar ${player.playing ? 'on' : ''}`} role="region" aria-label="Reproductor de la radio">
      <div className="w pb">
        <button className="play sm" onClick={player.toggle} aria-label={player.playing ? 'Pausar' : 'Reproducir'}>
          {player.playing ? '❚❚' : '▶'}
        </button>
        <div className="pinfo">
          <b>{live ? live.show : 'Radio Energía Positiva'}</b>
          <span className="small">{player.msg || (live ? `Con ${live.name}` : 'Música non-stop')}</span>
        </div>
        <div className="eq" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <b key={i} />)}</div>
        <button className="icon" onClick={player.toggleMute} aria-label={player.muted ? 'Activar sonido' : 'Silenciar'}>{player.muted ? '🔇' : '🔊'}</button>
        <label className="vol">
          <span className="sr">Volumen</span>
          <input type="range" min="0" max="1" step="0.05" value={player.volume} onChange={(e) => player.setVolume(+e.target.value)} />
        </label>
        <a className="btn ghost req" href="https://wa.me/56979444345" target="_blank" rel="noreferrer">Pedir canción</a>
      </div>
    </div>
  )
}
