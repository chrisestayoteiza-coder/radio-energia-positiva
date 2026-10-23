import { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, db, firebaseReady, googleProvider } from '../firebase.js'

export default function Chat() {
  const [user, setUser] = useState(null)
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  const box = useRef(null)

  useEffect(() => (firebaseReady ? onAuthStateChanged(auth, setUser) : undefined), [])

  useEffect(() => {
    if (!firebaseReady) return
    const q = query(collection(db, 'chat'), orderBy('createdAt', 'desc'), limit(60))
    return onSnapshot(q, (s) => setMsgs(s.docs.map((d) => ({ id: d.id, ...d.data() })).reverse()), () => setErr('No se pudo cargar el chat.'))
  }, [])

  useEffect(() => {
  const el = box.current
  if (el) el.scrollTop = el.scrollHeight
}, [msgs])

  const login = () => signInWithPopup(auth, googleProvider).catch(() => setErr('No se pudo iniciar sesión con Google.'))
  const send = async (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t || !user) return
    setText('')
    try {
      await addDoc(collection(db, 'chat'), { text: t.slice(0, 280), uid: user.uid, name: user.displayName || 'Oyente', photo: user.photoURL || '', createdAt: serverTimestamp() })
    } catch { setText(t); setErr('No se pudo enviar el mensaje.') }
  }

  return (
    <section id="chat">
      <div className="w">
        <h2>Chat en vivo</h2>
        <p className="sub">Saluda, pide canciones y conversa con otros oyentes mientras escuchas.</p>
        {!firebaseReady && <p className="small warn">Chat desactivado: completa las variables VITE_FB_* en el archivo .env.</p>}
        <div className="chat">
         <div className="box">
  <div className="msgs" ref={box}>
    {msgs.length === 0 && <div className="small">{firebaseReady ? 'Sé el primero en saludar.' : 'Sin conexión con Firebase.'}</div>}
    {msgs.map((m) => (
      <div key={m.id} className={`m ${user && m.uid === user.uid ? 'me' : ''}`}>
        <small>{m.name}</small>{m.text}
      </div>
    ))}
  </div>
            <form className="in" onSubmit={send}>
              <input value={text} onChange={(e) => setText(e.target.value)} maxLength={280} disabled={!user} placeholder={user ? 'Escribe tu mensaje' : 'Inicia sesión para escribir'} />
              <button className="btn" disabled={!user || !text.trim()}>Enviar</button>
            </form>
          </div>
          <aside className="side">
            <div className="card">
              <h3>Tu sesión</h3>
              {user ? (
                <>
                  <p className="who">{user.photoURL && <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />}{user.displayName}</p>
                  <button className="btn ghost" onClick={() => signOut(auth)}>Cerrar sesión</button>
                </>
              ) : (
                <>
                  <p>Inicia sesión para participar.</p>
                  <button className="gbtn" onClick={login} disabled={!firebaseReady}>Continuar con Google</button>
                </>
              )}
              {err && <p className="small warn" role="alert">{err}</p>}
            </div>
            <div className="card"><h3>Normas</h3><p>Respeto ante todo. Sin spam ni insultos. Los mensajes son públicos.</p></div>
          </aside>
        </div>
      </div>
    </section>
  )
}
