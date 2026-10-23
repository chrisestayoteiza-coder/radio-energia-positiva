import { useEffect, useState } from 'react'

const KEY = import.meta.env.VITE_YT_API_KEY
const CHANNEL = import.meta.env.VITE_YT_CHANNEL_ID

// Videos de ejemplo mientras no se configure la API de YouTube
const SAMPLE = [
  { id: 's1', title: 'Colección Retro – Programa completo', dj: 'Lokillo' },
  { id: 's2', title: 'Nación Mp3 – Noche de clásicos', dj: 'Ghost' },
  { id: 's3', title: 'Club Retro – 70s, 80s y 90s', dj: 'OZ' },
  { id: 's4', title: 'Capeando la Noche – Viernes de fiesta', dj: 'Deadpool' },
  { id: 's5', title: 'La Movida Nocturna – Tropical', dj: 'Yuliett' },
  { id: 's6', title: 'Fiesta in the Mix – Sesión en vivo', dj: 'Jota' },
]

export function useVideos() {
  const [state, setState] = useState({ videos: SAMPLE, live: false, loading: Boolean(KEY && CHANNEL) })
  useEffect(() => {
    if (!KEY || !CHANNEL) return
    const ctl = new AbortController()
    ;(async () => {
      try {
        const api = 'https://www.googleapis.com/youtube/v3'
        const ch = await fetch(`${api}/channels?part=contentDetails&id=${CHANNEL}&key=${KEY}`, { signal: ctl.signal }).then((r) => r.json())
        const uploads = ch.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
        const pl = await fetch(`${api}/playlistItems?part=snippet&maxResults=24&playlistId=${uploads}&key=${KEY}`, { signal: ctl.signal }).then((r) => r.json())
        const videos = (pl.items || []).map((i) => ({
          id: i.snippet.resourceId.videoId,
          title: i.snippet.title,
          thumb: i.snippet.thumbnails?.high?.url || i.snippet.thumbnails?.medium?.url,
          dj: guessDj(i.snippet.title),
        }))
        setState({ videos: videos.length ? videos : SAMPLE, live: videos.length > 0, loading: false })
      } catch {
        setState({ videos: SAMPLE, live: false, loading: false })
      }
    })()
    return () => ctl.abort()
  }, [])
  return state
}

// Etiqueta cada video con el DJ si su nombre aparece en el título
function guessDj(title) {
  const t = title.toLowerCase()
  return ['Lokillo', 'Ghost', 'OZ', 'Deadpool', 'Yuliett', 'Jota'].find((n) => t.includes(n.toLowerCase())) || 'Otros'
}
