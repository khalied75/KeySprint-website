import { Link } from 'react-router'
import Icon from '../Icon'
import { challenges } from '../../data/modes'

export default function SessionHeader({ settings, session }) {
  const { guessing, timeLimit } = session
  const challenge = challenges.find((game) => game.id === settings.game)
  const title =
    settings.game === 'sprint'
      ? `${timeLimit}-second sprint`
      : challenge?.name || 'Focus mode'
  return (
    <div className="session-header mb-8 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <Link
          to={settings.game ? '/games' : '/'}
          className="secondary-button shrink-0 p-3!"
          aria-label="Back to settings"
        >
          <Icon name="arrow" className="h-5 w-5 rotate-180" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
          <p className="mt-1 text-xs capitalize text-slate-400 sm:text-sm">
            {settings.difficulty} ·{' '}
            {guessing ? settings.category : settings.game ? 'sentences' : settings.mode}
          </p>
        </div>
      </div>
      <button
        onClick={session.restart}
        className="secondary-button shrink-0"
        aria-label="Restart session"
      >
        <Icon name="refresh" />
        <span className="hidden sm:inline">Restart</span>
      </button>
    </div>
  )
}
