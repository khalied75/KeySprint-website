import Icon from '../Icon'

export default function GameScore({ settings, session }) {
  const { counts, timed, timeLimit, elapsed } = session
  return (
    <section className="mb-6 flex items-center justify-between rounded-2xl bg-[#252d50] px-7 py-5 text-white">
      <div className="flex items-center gap-4">
        <Icon name="trophy" className="h-8 w-8 text-amber-200" />
        <div>
          <p className="eyebrow text-violet-200!">YOUR SCORE</p>
          <p className="text-3xl font-bold">{counts.correct * 10}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="eyebrow mb-2 text-violet-200!">
          {settings.game === 'survival'
            ? 'LIVES LEFT'
            : timed
              ? 'TIME LEFT'
              : 'ROUNDS COMPLETE'}
        </p>
        <div className="text-2xl font-bold">
          {settings.game === 'survival' ? (
            <span aria-label={`${Math.max(0, 3 - counts.mistakes)} lives remaining`}>
              {Array.from({ length: 3 }, (_, i) => (
                <span
                  key={i}
                  className={i < 3 - counts.mistakes ? 'text-rose-400' : 'text-slate-600'}
                >
                  ♥{' '}
                </span>
              ))}
            </span>
          ) : timed ? (
            `${Math.max(0, timeLimit - elapsed)}s`
          ) : (
            `${counts.rounds} / 5`
          )}
        </div>
      </div>
    </section>
  )
}
