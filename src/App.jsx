import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Djs from './components/Djs.jsx'
import Schedule from './components/Schedule.jsx'
import Videos from './components/Videos.jsx'
import Chat from './components/Chat.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '')
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme
    else delete document.documentElement.dataset.theme
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggle = () => {
    const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(dark ? 'light' : 'dark')
  }
  return (
    <>
      <Header onTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Djs />
        <Schedule />
        <Videos />
        <Chat />
        <Contact />
      </main>
      <footer>© {new Date().getFullYear()} Radio Energía Positiva · radioenergiapositiva.cl</footer>
    </>
  )
}
