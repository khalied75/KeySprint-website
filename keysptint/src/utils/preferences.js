export const PREFERENCES_KEY = 'keysprint-settings'

export function normalizePreferences(value, systemDark = false) {
  return {
    theme:
      value?.theme === 'dark' || value?.theme === 'light'
        ? value.theme
        : systemDark
          ? 'dark'
          : 'light',
    keyboardSound: value?.keyboardSound === true,
    showKeyboard: value?.showKeyboard !== false,
  }
}

export function readPreferences(systemDark = false) {
  try {
    return normalizePreferences(
      JSON.parse(localStorage.getItem(PREFERENCES_KEY)),
      systemDark,
    )
  } catch {
    return normalizePreferences(null, systemDark)
  }
}

export function writePreferences(value) {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(normalizePreferences(value)))
  } catch {
    /* Preferences still work for this session when storage is disabled. */
  }
}
