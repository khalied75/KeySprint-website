import { Link } from 'react-router'
import Icon from '../Icon'

export default function SessionResult({ settings, session }) {
  const { wpm, accuracy, counts, guessing, timed, elapsed } = session
  return (
    <section className="panel px-5 py-14 text-center" aria-live="polite">
      <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <Icon name="trophy" className="h-9 w-9" />
      </span>
      <p className="eyebrow mb-3">ANOTHER STEP FORWARD</p>
      <h2 className="mb-3 text-3xl font-bold">
        {settings.game === 'survival'
          ? 'A good run. Ready for another?'
          : 'Look at you making progress.'}
      </h2>
      <p className="mb-3 text-slate-400">
        {wpm} WPM · {accuracy}% accuracy · {counts.correct * 10} points
      </p>
      {settings.game && (
        <p className="mb-5 text-sm text-violet-500">
          {counts.rounds} {guessing ? 'words solved' : 'rounds completed'}
          {timed ? ` in ${elapsed} seconds` : ''}
        </p>
      )}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button className="primary-button" onClick={session.restart}>
          <Icon name="refresh" />
          Try again
        </button>
        <Link className="secondary-button" to="/progress">
          View my progress
          <Icon name="arrow" />
        </Link>
      </div>
      <p className="mt-6 text-xs text-slate-400">
        Results are saved in this browser when local storage is available.
      </p>
    </section>
  )
}
