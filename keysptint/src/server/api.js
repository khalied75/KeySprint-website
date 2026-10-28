import { isWordGame } from '../utils/games.js'
import { calculateContentStats } from '../utils/contentStats.js'

const cache = new Map()
export async function loadContent(type) {
  if (!cache.has(type)) {
    cache.set(
      type,
      fetch(`${import.meta.env?.BASE_URL ?? '/'}public%20json/${type}.json`)
        .then((response) => {
          if (!response.ok)
            throw new Error('Could not load your lesson. Please try again.')
          return response.json()
        })
        .catch((error) => {
          cache.delete(type)
          throw error
        }),
    )
  }
  return cache.get(type)
}

export async function loadLibraryStats() {
  const [words, sentences, paragraphs, grammar] = await Promise.all(
    ['words', 'sentences', 'paragraphs', 'grammar'].map(loadContent),
  )

  return calculateContentStats({ words, sentences, paragraphs, grammar })
}

export function shuffle(items) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
export async function getExercise({
  mode = 'words',
  difficulty = 'easy',
  category = 'common',
  length = '',
  starts = '',
  game = '',
}) {
  if (mode === 'letters' && !game) {
    const alphabet =
      difficulty === 'easy'
        ? 'asdfjkl'
        : difficulty === 'medium'
          ? 'abcdefghijklmnopqrstuvwxyz'
          : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length: 10 }, () =>
      Array.from(
        { length: 3 },
        () => alphabet[Math.floor(Math.random() * alphabet.length)],
      ).join(''),
    ).join(' ')
  }
  const type = isWordGame(game)
    ? 'words'
    : game === 'sprint' || game === 'survival'
      ? 'sentences'
      : mode === 'letters'
        ? 'words'
        : mode
  const content = await loadContent(type)
  let items = type === 'words' ? content[difficulty][category] : content[difficulty]
  if (type === 'words')
    items = items.filter(
      (word) =>
        (!length || word.length === Number(length)) &&
        (!starts || word.toLowerCase().startsWith(starts.toLowerCase())),
    )
  if (game === 'scramble')
    items = items.filter((word) => new Set(word.toLowerCase()).size > 1)
  if (!items.length)
    throw new Error(
      'No words match these filters. Try another length or starting letter.',
    )
  return shuffle(items)
    .slice(0, isWordGame(game) ? 1 : type === 'words' ? 18 : type === 'sentences' ? 3 : 1)
    .join(' ')
}
