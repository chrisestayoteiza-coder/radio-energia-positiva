export const DN = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const DJS = [
  { id: 'lokillo', name: 'DJ Lokillo', show: 'Colección Retro / Retro Romántica', color: '#ff4f7b', days: [1], time: '22:00',
    bio: 'Amante de la música retro en inglés y español, bailable y romántica.' },
  { id: 'ghost', name: 'DJ Ghost', show: 'Nación Mp3', color: '#7c3aed', days: [2, 4], time: '21:30',
    bio: 'Junto a Rodrigo, bloques de música variada, información y buena compañía desde el estudio 19.' },
  { id: 'oz', name: 'DJ OZ', show: 'Club Retro', color: '#0ea5e9', days: [3], time: '21:30',
    bio: 'Un viaje por los clásicos de los 70, 80 y 90 en cada emisión.' },
  { id: 'deadpool', name: 'DJ Deadpool', show: 'Capeando la Noche', color: '#ef4444', days: [5, 6], time: '22:00',
    bio: 'Música de fiesta de ayer y hoy, con saludos y peticiones.' },
  { id: 'yuliett', name: 'Yuliett', show: 'La Movida Nocturna', color: '#f59e0b', days: [0], time: '21:30',
    bio: 'La historia de la música tropical, de lo retro a lo más actual.' },
  { id: 'jota', name: 'DJ Jota', show: 'Fiesta in the Mix', color: '#10b981', days: [], time: null,
    bio: 'Mezclas en vivo por distintos estilos para sentirte en una fiesta.' },
]

export const SOCIAL = [
  { name: 'Facebook', handle: 'Radio Energía Positiva', url: 'https://www.facebook.com/profile.php?id=61557443150057', bg: '#1877f2', ic: 'f' },
  { name: 'Instagram', handle: '@radio_energiapositiva', url: 'https://www.instagram.com/radio_energiapositiva/', bg: 'linear-gradient(45deg,#f9a03f,#dc2743,#8a3ab9)', ic: 'ig' },
  { name: 'TikTok', handle: '@radio.energia.positiva', url: 'https://www.tiktok.com/@radio.energia.positiva', bg: '#111', ic: '♪' },
  { name: 'WhatsApp', handle: '+56 9 7944 4345', url: 'https://wa.me/56979444345', bg: '#25d366', ic: 'wa' },
]

// Hora actual en Chile
export function chileNow() {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date())
  const g = (k) => p.find((x) => x.type === k).value
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday')), min: (+g('hour') % 24) * 60 + +g('minute') }
}

// DJ al aire (se asume una duración de 2 horas por programa)
export function liveNow() {
  const { day, min } = chileNow()
  return DJS.find((d) => {
    if (!d.time || !d.days.includes(day)) return false
    const [h, m] = d.time.split(':').map(Number)
    return min >= h * 60 + m && min < h * 60 + m + 120
  })
}
