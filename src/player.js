import { useEffect, useRef, useState } from 'react'
import { liveNow } from './data.js'

const STREAM = import.meta.env.VITE_STREAM_URL

export function usePlayer() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [msg, setMsg] = useState('')
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)

  useEffect(() => () => audio.current?.pause(), [])
  useEffect(() => { if (audio.current) audio.current.volume = volume }, [volume])
  useEffect(() => { if (audio.current) audio.current.muted = muted }, [muted])

  const toggle = async () => {
    if (!STREAM) return setMsg('Falta configurar VITE_STREAM_URL en el archivo .env.')
    if (!audio.current) { audio.current = new Audio(STREAM); audio.current.volume = volume; audio.current.muted = muted }
    try {
      if (audio.current.paused) { await audio.current.play(); setPlaying(true); setMsg('') }
      else { audio.current.pause(); setPlaying(false) }
    } catch { setMsg('No se pudo reproducir el stream. Revisa la URL.') }
  }
  return { playing, msg, volume, setVolume, muted, toggleMute: () => setMuted((m) => !m), toggle }
}

export function useLive() {
  const [live, setLive] = useState(liveNow())
  useEffect(() => {
    const t = setInterval(() => setLive(liveNow()), 60000)
    return () => clearInterval(t)
  }, [])
  return live
}
