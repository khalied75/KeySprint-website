import {
  getExerciseLabel,
  getWordPrompt,
  getCharacterClass,
} from '../../utils/trainingDisplay'

export default function ExercisePanel({ settings, session, field }) {
  const { status, guessing, timed, counts, text, input } = session
  const partLabel = getExerciseLabel(settings.game, session.revealed)
  const wordPrompt = getWordPrompt(settings, session)
  return (
    <section className="typing-panel" onClick={() => field.current?.focus()}>
      <div className="mb-7 flex justify-between gap-3 text-xs font-bold tracking-[.15em] text-[#9ca6c7]">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
          {partLabel}
        </span>
        <span className="shrink-0">
          {guessing && !timed
            ? `${Math.min(5, counts.rounds + 1)} / 5`
            : `ROUND ${counts.rounds + 1}`}
        </span>
      </div>
      {status === 'loading' ? (
        <p className="py-10 text-xl text-slate-400" role="status">
          Preparing your next challenge…
        </p>
      ) : guessing ? (
        <div className="py-7">
          <p className="mb-5 break-words font-mono text-3xl tracking-widest text-white md:text-5xl">
            {wordPrompt.text}
          </p>
          <p className="text-sm leading-7 text-[#a6aec8]">{wordPrompt.hint}</p>
        </div>
      ) : (
        <p className="typing-text">
          {[...text].map((char, index) => (
            <span key={index} className={getCharacterClass(char, index, input)}>
              {char}
            </span>
          ))}
        </p>
      )}
      <p className="mt-auto pt-10 text-xs text-[#7e89ac]">
        {guessing
          ? 'Type your answer below, then press Enter.'
          : 'Stay relaxed. Accuracy first, speed will follow.'}
      </p>
    </section>
  )
}
