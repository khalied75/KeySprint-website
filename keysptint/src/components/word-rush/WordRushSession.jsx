import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import useWordRush from '../../hooks/useWordRush'
import SessionHeader from '../practice/SessionHeader'
import SessionMetrics from '../practice/SessionMetrics'
import SessionResult from '../practice/SessionResult'
import GameScore from '../practice/GameScore'
import TypingInput from '../practice/TypingInput'
import WordRushBoard from './WordRushBoard'

export default function WordRushSession({ settings }) {
  const session = useWordRush(settings)
  const field = useRef(null)

  useEffect(() => {
    const canType = ['ready', 'running'].includes(session.status)
    if (canType && window.matchMedia('(pointer: fine)').matches) {
      field.current?.focus({ preventScroll: true })
    }
  }, [session.status])

  return (
    <div className="practice-session rush-session mx-auto max-w-[1060px]">
      <SessionHeader settings={settings} session={session} />
      {session.status === 'error' ? (
        <div role="alert" className="panel p-8 text-center">
          <p className="mb-5 text-red-600">{session.error}</p>
          <button className="primary-button mx-auto" onClick={session.restart}>
            Try again
          </button>
          <Link
            to="/games?game=rush"
            className="mt-5 inline-block text-sm text-violet-600"
          >
            Change filters
          </Link>
        </div>
      ) : (
        <>
          <GameScore settings={settings} session={session} />
          <SessionMetrics session={session} />
          {session.status === 'done' ? (
            <>
              <p role="status" className="mb-5 text-center text-sm text-slate-400">
                {session.endReason === 'lives'
                  ? 'Three words crossed the line. Your run is complete.'
                  : session.endReason === 'time'
                    ? 'Time is up. Great catching!'
                    : 'Session finished.'}
              </p>
              <SessionResult settings={settings} session={session} />
            </>
          ) : (
            <div className="practice-workspace">
              <WordRushBoard session={session} onFocus={() => field.current?.focus()} />
              <TypingInput settings={settings} session={session} field={field} />
              {session.feedback && (
                <p className="session-feedback mt-3 text-sm text-amber-600" role="status">
                  {session.feedback || ''}
                </p>
              )}
              <div className="session-actions mt-3 flex items-start justify-between gap-4 text-xs leading-6 text-slate-400">
                <span>Three missed words end your run. Misses reset your combo.</span>
                <button
                  className="shrink-0 font-semibold text-violet-500"
                  disabled={session.status !== 'running'}
                  onClick={session.finish}
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
