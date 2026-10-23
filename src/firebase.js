import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const e = import.meta.env
export const firebaseReady = Boolean(e.VITE_FB_API_KEY && e.VITE_FB_PROJECT_ID)

let app = null
if (firebaseReady) {
  app = initializeApp({
    apiKey: e.VITE_FB_API_KEY,
    authDomain: e.VITE_FB_AUTH_DOMAIN,
    projectId: e.VITE_FB_PROJECT_ID,
    appId: e.VITE_FB_APP_ID,
  })
}
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const googleProvider = new GoogleAuthProvider()
