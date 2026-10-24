import { useEffect, useState } from 'react'
import { usePlayer } from './player.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Djs from './components/Djs.jsx'
import Schedule from './components/Schedule.jsx'
import Videos from './components/Videos.jsx'
import Band from './components/Band.jsx'
import Chat from './components/Chat.jsx'
import Contact from './components/Contact.jsx'
import PlayerBar from './components/PlayerBar.jsx'
import SocialRail from './components/SocialRail.jsx'

export default function App() {
  const player = usePlayer()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <Header onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero player={player} />
        <About />
        <Djs />
        <Schedule />
        <Videos />
        <Band />
        <Chat />
        <Contact />
      </main>
      <footer>© {new Date().getFullYear()} Radio Energía Positiva · radioenergiapositiva.cl</footer>
      <SocialRail />
      <PlayerBar player={player} />
    </>
  )
}
