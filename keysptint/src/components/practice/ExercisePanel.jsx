import {
  getExerciseLabel,
  getWordPrompt,
  getCharacterClass,
} from '../../utils/trainingDisplay'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export default function ExercisePanel({ settings, session, field }) {
  const { status, guessing, timed, counts, text, input } = session
  const partLabel = getExerciseLabel(settings.game, session.revealed)
  const wordPrompt = getWordPrompt(settings, session)
  const content = useRef(null)

  const keepCaretVisible = useCallback(() => {
    const area = content.current
    const caret = area?.querySelector('.typing-caret')
    if (!area || !caret || area.scrollHeight <= area.clientHeight) return
    const bounds = area.getBoundingClientRect()
    const cursor = caret.getBoundingClientRect()
    if (cursor.top < bounds.top + 8 || cursor.bottom > bounds.bottom - 8) {
      area.scrollTop += cursor.top - bounds.top - area.clientHeight * 0.35
    }
  }, [])

  useLayoutEffect(keepCaretVisible, [input, text, status, keepCaretVisible])

  useEffect(() => {
    const area = content.current
    if (!area || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(keepCaretVisible)
    observer.observe(area)
    return () => observer.disconnect()
  }, [keepCaretVisible])

  return (
    <section className="typing-panel" onClick={() => field.current?.focus()}>
      <div className="exercise-heading mb-7 flex justify-between gap-3 text-xs font-bold tracking-[.15em] text-[#9ca6c7]">
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
      <div
        className="exercise-content"
        ref={content}
        tabIndex={0}
        role="region"
        aria-label="Exercise text"
      >
        {status === 'loading' ? (
          <p className="py-10 text-xl text-slate-400" role="status">
            Preparing your next challenge…
          </p>
        ) : guessing ? (
          <div className="word-prompt py-7">
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
      </div>
      <p className="exercise-tip mt-auto pt-10 text-xs text-[#7e89ac]">
        {guessing
          ? 'Type your answer below, then press Enter.'
          : 'Stay relaxed. Accuracy first, speed will follow.'}
      </p>
    </section>
  )
}
