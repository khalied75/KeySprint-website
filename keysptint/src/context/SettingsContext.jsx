import { createContext, useContext, useLayoutEffect, useState } from 'react'
import { PREFERENCES_KEY, normalizePreferences, readPreferences, writePreferences } from '../utils/preferences'
import { playMechanicalKey } from '../utils/keyboardAudio'

const SettingsContext = createContext(null)
const systemDark = () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-color-scheme: dark)').matches)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => readPreferences(systemDark()))
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = settings.theme
    document.documentElement.style.colorScheme = settings.theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', settings.theme === 'dark' ? '#101426' : '#6656dc')
    writePreferences(settings)
  }, [settings])
  useLayoutEffect(() => {
    const sync = event => {
      if (event.key !== PREFERENCES_KEY && event.key !== null) return
      try { setSettings(normalizePreferences(JSON.parse(event.newValue), systemDark())) }
      catch { /* Ignore malformed updates from another tab. */ }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const updateSettings = change => setSettings(previous => normalizePreferences({ ...previous, ...change }))
  const playKey = key => { if (settings.keyboardSound) playMechanicalKey(key) }
  return <SettingsContext.Provider value={{ settings, updateSettings, playKey }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside SettingsProvider')
  return value
}
