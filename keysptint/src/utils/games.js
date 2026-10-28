export const isTimedGame = (game) => game === 'sprint' || game === 'scramble'
export const isWordGame = (game) => ['recall', 'detective', 'scramble'].includes(game)

export function normalizeDuration(value) {
  const duration = Number(value)
  return Number.isFinite(duration) &&
    value !== null &&
    value !== '' &&
    value !== undefined
    ? Math.max(5, Math.min(60, Math.round(duration)))
    : 60
}

export function scrambleWord(word, random = Math.random) {
  const letters = [...word]
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  // Even a random shuffle can return the original word. Guarantee a new order
  // whenever the word contains at least two different letters.
  if (letters.join('') === word) {
    const different = letters.findIndex((letter) => letter !== letters[0])
    if (different > 0) [letters[0], letters[different]] = [letters[different], letters[0]]
  }
  return letters.join('')
}
