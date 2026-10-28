import { wordTravelTime } from '../../utils/wordRush'

export default function WordRushBoard({ session, onFocus }) {
  const { status, text, position, elapsed, timeLimit, counts, difficulty } = session
  const travelTime = wordTravelTime(counts.rounds, difficulty)

  return (
    <section className="rush-playing-field" aria-label="Word rush playing field">
      <p className="rush-time-hint mb-4 text-center text-xs font-semibold leading-6 text-slate-400 sm:text-sm">
        {status === 'ready'
          ? 'Type to start the word moving'
          : `${Math.max(0, timeLimit - elapsed)}s remaining`}
        {' · '}Speed increases after every word
      </p>
      <div className="rush-board" onClick={onFocus}>
        {status === 'loading' ? (
          <p className="rush-loading" role="status">
            Getting your words ready…
          </p>
        ) : (
          <>
            <div className="rush-rail" aria-hidden="true" />
            <div className="rush-deadline" aria-hidden="true" />
            <div className="rush-track">
              <div
                className="rush-word"
                style={{
                  left: `${position * 100}%`,
                  transform: `translateX(-${position * 100}%)`,
                }}
              >
                {text}
              </div>
            </div>
            <p className="rush-instruction">
              Type before the word reaches the right line
            </p>
          </>
        )}
      </div>
      <div
        className="rush-word-progress mt-3 h-1 overflow-hidden rounded-full bg-[#e6e7f2]"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-violet-500"
          style={{ width: `${Math.max(0, (1 - position) * 100)}%` }}
        />
      </div>
      <div className="rush-word-hints mt-3 flex flex-wrap justify-between gap-2 text-[11px] text-slate-400">
        <span>Type the full word to catch it automatically.</span>
        <span>
          {(travelTime / 1000).toFixed(1)}s per word · {counts.rounds} caught
        </span>
      </div>
    </section>
  )
}
