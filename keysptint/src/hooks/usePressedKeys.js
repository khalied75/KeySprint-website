import { useEffect, useState } from 'react'
import { keyboardCodes } from '../data/keyboardLayout'

export default function usePressedKeys() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set())

  function clearKeys() {
    setPressedKeys((previous) => (previous.size ? new Set() : previous))
  }

  function pressKey(event) {
    if (event.isComposing || !keyboardCodes.has(event.code)) return
    const code = event.code
    setPressedKeys((previous) =>
      previous.has(code) ? previous : new Set([...previous, code]),
    )
  }

  useEffect(() => {
    // Release keys even if focus moved before keyup (for example after Tab).
    function releaseKey(event) {
      setPressedKeys((previous) => {
        if (!previous.has(event.code)) return previous
        const next = new Set(previous)
        next.delete(event.code)
        return next
      })
    }

    function handleVisibilityChange() {
      if (document.hidden) clearKeys()
    }

    window.addEventListener('keyup', releaseKey)
    window.addEventListener('blur', clearKeys)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      window.removeEventListener('keyup', releaseKey)
      window.removeEventListener('blur', clearKeys)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return { pressedKeys, pressKey, clearKeys }
}
