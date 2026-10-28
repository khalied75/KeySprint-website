import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import useTraining from '../../hooks/useTraining'
import { getSessionHint } from '../../utils/trainingDisplay'
import SessionHeader from './SessionHeader'
import GameScore from './GameScore'
import SessionMetrics from './SessionMetrics'
import SessionResult from './SessionResult'
import ExercisePanel from './ExercisePanel'
import TypingInput from './TypingInput'

function SessionError({ error, onRetry, game }) {
  return (
    <div role="alert" className="panel p-10 text-center">
      <p className="mb-6 text-red-600">{error}</p>
      <button className="primary-button mx-auto" onClick={onRetry}>
        Try again
      </button>
      <Link to={game ? '/games' : '/'} className="mt-5 block text-violet-600">
        Change settings
      </Link>
    </div>
  )
}

export default function TrainingSession({ settings }) {
  const session = useTraining(settings)
  const field = useRef(null)
  const { status, revealed, elapsed } = session

  useEffect(() => {
    const canType = status === 'ready' || status === 'running'
    const hasPointer = window.matchMedia('(pointer: fine)').matches

    if (canType && hasPointer) field.current?.focus({ preventScroll: true })
  }, [status, revealed])

  return (
    <div className="practice-session mx-auto max-w-[1060px]">
      <SessionHeader settings={settings} session={session} />

      {status === 'error' ? (
        <SessionError
          error={session.error}
          onRetry={session.restart}
          game={settings.game}
        />
      ) : (
        <>
          {settings.game && <GameScore settings={settings} session={session} />}
          <SessionMetrics session={session} />

          {status === 'done' ? (
            <SessionResult settings={settings} session={session} />
          ) : (
            <div className="practice-workspace">
              <ExercisePanel settings={settings} session={session} field={field} />
              <TypingInput settings={settings} session={session} field={field} />

              {session.feedback && (
                <p role="status" className="session-feedback mt-3 text-sm text-amber-600">
                  {session.feedback}
                </p>
              )}

              <div className="session-actions mt-5 flex items-center justify-between gap-4 text-xs text-slate-400">
                <span>{getSessionHint(settings, session)}</span>
                <button
                  className="shrink-0 font-semibold text-violet-500 hover:text-violet-700"
                  onClick={session.finish}
                  disabled={!elapsed}
                >
                  Finish session
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
