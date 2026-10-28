export default function SessionMetrics({ session }) {
  const { timed, elapsed, timeLimit, guessing, counts, text, input, wpm, accuracy } =
    session
  let progress = 0
  let progressLabel = `${input.length} / ${text.length} characters`
  if (timed) {
    progress = (elapsed / timeLimit) * 100
    progressLabel = `${elapsed} / ${timeLimit} seconds`
  } else if (guessing) {
    progress = (counts.rounds / 5) * 100
    progressLabel = `${counts.rounds} / 5 words`
  } else if (text) {
    progress = (input.length / text.length) * 100
  }
  return (
    <section className="session-metrics" aria-label="Session statistics">
      <div className="session-progress-label mb-3 flex justify-between text-xs font-semibold text-slate-400">
        <span className="tracking-widest">
          {timed ? 'SESSION TIME' : 'YOUR PROGRESS'}
        </span>
        <span>{progressLabel}</span>
      </div>
      <div className="session-progress-bar mb-7 h-1.5 overflow-hidden rounded-full bg-[#e6e7f2]">
        <div
          className="h-full rounded-full bg-violet-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="session-stat-grid mb-7 grid grid-cols-4 gap-2 text-center">
        {[
          [wpm, 'WPM'],
          [`${accuracy}%`, 'ACCURACY'],
          [counts.mistakes, 'MISTAKES'],
          [`${elapsed}s`, 'TIME'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="mb-2 text-2xl font-bold md:text-3xl">{value}</p>
            <p className="text-[10px] font-bold tracking-widest text-slate-400">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
