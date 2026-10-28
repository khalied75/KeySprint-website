import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { categories, challenges, modes } from '../data/modes'
import { normalizeDuration } from '../utils/games'
import TrainingSession from '../components/practice/TrainingSession'
import WordRushSession from '../components/word-rush/WordRushSession'

export default function Practice() {
  const [params] = useSearchParams()
  const settings = useMemo(
    () => ({
      mode: modes.some((mode) => mode.id === params.get('mode'))
        ? params.get('mode')
        : 'words',
      difficulty: ['easy', 'medium', 'hard'].includes(params.get('difficulty'))
        ? params.get('difficulty')
        : 'easy',
      category: categories.includes(params.get('category'))
        ? params.get('category')
        : 'common',
      game: challenges.some((game) => game.id === params.get('game'))
        ? params.get('game')
        : '',
      length: params.get('length') || '',
      starts: (params.get('starts') || '').slice(0, 1),
      duration: normalizeDuration(
        params.get('duration'),
        params.get('game') === 'rush' ? 10 : 5,
      ),
    }),
    [params],
  )
  if (settings.game === 'rush') {
    return <WordRushSession key={params.toString()} settings={settings} />
  }
  return <TrainingSession key={params.toString()} settings={settings} />
}
