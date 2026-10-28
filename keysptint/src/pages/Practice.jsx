import { useMemo, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import Icon from '../components/Icon'
import { categories, challenges, modes } from '../data/modes'
import useTraining from '../hooks/useTraining'
import { normalizeDuration } from '../utils/games'
import { useSettings } from '../context/SettingsContext'

export default function Practice() {
  const [params] = useSearchParams()
  const settings = useMemo(() => ({
    mode: modes.some(mode => mode.id === params.get('mode')) ? params.get('mode') : 'words',
    difficulty: ['easy', 'medium', 'hard'].includes(params.get('difficulty')) ? params.get('difficulty') : 'easy',
    category: categories.includes(params.get('category')) ? params.get('category') : 'common',
    game: challenges.some(game => game.id === params.get('game')) ? params.get('game') : '',
    length: params.get('length') || '', starts: (params.get('starts') || '').slice(0, 1),
    duration: normalizeDuration(params.get('duration')),
  }), [params])
  return <TrainingSession key={params.toString()} settings={settings} />
}

function TrainingSession({ settings }) {
  const session = useTraining(settings)
  const { playKey } = useSettings()
  const field = useRef(null)
  const { text, input, status, counts, elapsed, accuracy, wpm, guessing, revealed, timed, timeLimit } = session
  const challenge = challenges.find(game => game.id === settings.game)
  const scramble = settings.game === 'scramble'
  useEffect(() => {
    if ((status === 'ready' || status === 'running') && window.matchMedia('(pointer: fine)').matches) field.current?.focus({ preventScroll: true })
  }, [status, revealed])

  const progress = timed ? elapsed / timeLimit * 100 : guessing ? counts.rounds / 5 * 100 : text ? input.length / text.length * 100 : 0
  const hiddenWord = [...text].map((letter, index) => index === 0 || index === text.length - 1 ? letter : '_').join(' ')
  const title = settings.game === 'sprint' ? `${timeLimit}-second sprint` : challenge?.name || 'Focus mode'
  const partLabel = scramble ? 'PUT THE LETTERS IN ORDER' : settings.game === 'recall' ? revealed ? 'MEMORIZE THIS WORD' : 'TYPE FROM MEMORY' : settings.game === 'detective' ? 'FOLLOW THE CLUES' : settings.game === 'survival' ? 'KEEP THE STREAK' : 'TYPE THIS PART'

  return <div className="mx-auto max-w-[1060px]">
    <div className="mb-8 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4"><Link to={settings.game ? '/games' : '/'} className="secondary-button shrink-0 p-3!" aria-label="Back to settings"><Icon name="arrow" className="h-5 w-5 rotate-180" /></Link><div className="min-w-0"><h1 className="text-xl font-bold sm:text-2xl">{title}</h1><p className="mt-1 text-xs capitalize text-slate-400 sm:text-sm">{settings.difficulty} · {guessing ? settings.category : settings.game ? 'sentences' : settings.mode}</p></div></div>
      <button onClick={session.restart} className="secondary-button shrink-0" aria-label="Restart session"><Icon name="refresh" /><span className="hidden sm:inline">Restart</span></button>
    </div>

    {status === 'error' ? <div role="alert" className="panel p-10 text-center"><p className="mb-6 text-red-600">{session.error}</p><button className="primary-button mx-auto" onClick={session.restart}>Try again</button><Link to={settings.game ? '/games' : '/'} className="mt-5 block text-violet-600">Change settings</Link></div> : <>
      {settings.game && <section className="mb-6 flex items-center justify-between rounded-2xl bg-[#252d50] px-7 py-5 text-white">
        <div className="flex items-center gap-4"><Icon name="trophy" className="h-8 w-8 text-amber-200" /><div><p className="eyebrow text-violet-200!">YOUR SCORE</p><p className="text-3xl font-bold">{counts.correct * 10}</p></div></div>
        <div className="text-right"><p className="eyebrow mb-2 text-violet-200!">{settings.game === 'survival' ? 'LIVES LEFT' : timed ? 'TIME LEFT' : 'ROUNDS COMPLETE'}</p><div className="text-2xl font-bold">{settings.game === 'survival' ? <span aria-label={`${Math.max(0, 3 - counts.mistakes)} lives remaining`}>{Array.from({ length: 3 }, (_, i) => <span key={i} className={i < 3 - counts.mistakes ? 'text-rose-400' : 'text-slate-600'}>♥ </span>)}</span> : timed ? `${Math.max(0, timeLimit - elapsed)}s` : `${counts.rounds} / 5`}</div></div>
      </section>}

      <div className="mb-3 flex justify-between text-xs font-semibold text-slate-400"><span className="tracking-widest">{timed ? 'SESSION TIME' : 'YOUR PROGRESS'}</span><span>{timed ? `${elapsed} / ${timeLimit} seconds` : guessing ? `${counts.rounds} / 5 words` : `${input.length} / ${text.length} characters`}</span></div>
      <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-[#e6e7f2]"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="mb-7 grid grid-cols-4 gap-2 text-center">{[[wpm, 'WPM'], [`${accuracy}%`, 'ACCURACY'], [counts.mistakes, 'MISTAKES'], [`${elapsed}s`, 'TIME']].map(([value, label]) => <div key={label}><p className="mb-2 text-2xl font-bold md:text-3xl">{value}</p><p className="text-[10px] font-bold tracking-widest text-slate-400">{label}</p></div>)}</div>

      {status === 'done' ? <section className="panel px-5 py-14 text-center" aria-live="polite">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"><Icon name="trophy" className="h-9 w-9" /></span>
        <p className="eyebrow mb-3">ANOTHER STEP FORWARD</p><h2 className="mb-3 text-3xl font-bold">{settings.game === 'survival' ? 'A good run. Ready for another?' : 'Look at you making progress.'}</h2>
        <p className="mb-3 text-slate-400">{wpm} WPM · {accuracy}% accuracy · {counts.correct * 10} points</p>
        {settings.game && <p className="mb-5 text-sm text-violet-500">{counts.rounds} {guessing ? 'words solved' : 'rounds completed'}{timed ? ` in ${elapsed} seconds` : ''}</p>}
        <div className="mt-7 flex flex-wrap justify-center gap-3"><button className="primary-button" onClick={session.restart}><Icon name="refresh" />Try again</button><Link className="secondary-button" to="/progress">View my progress<Icon name="arrow" /></Link></div>
        <p className="mt-6 text-xs text-slate-400">Results are saved in this browser when local storage is available.</p>
      </section> : <>
        <section className="typing-panel" onClick={() => field.current?.focus()}>
          <div className="mb-7 flex justify-between gap-3 text-xs font-bold tracking-[.15em] text-[#9ca6c7]"><span className="flex items-center gap-2"><span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300" />{partLabel}</span><span className="shrink-0">{guessing && !timed ? `${Math.min(5, counts.rounds + 1)} / 5` : `ROUND ${counts.rounds + 1}`}</span></div>
          {status === 'loading' ? <p className="py-10 text-xl text-slate-400" role="status">Preparing your next challenge…</p> : guessing ? <div className="py-7">
            <p className="mb-5 break-words font-mono text-3xl tracking-widest text-white md:text-5xl">{scramble ? session.scrambled.split('').join(' ') : settings.game === 'detective' ? hiddenWord : revealed ? text : '•'.repeat(text.length)}</p>
            <p className="text-sm leading-7 text-[#a6aec8]">{scramble ? `Category: ${settings.category} · ${text.length} letters. Use every letter once to make a word.` : settings.game === 'detective' ? `Category: ${settings.category} · ${text.length} letters · starts with “${text[0]}” and ends with “${text.at(-1)}”` : revealed ? 'You have 3 seconds. Take a good look.' : `${text.length} letters. You've got this.`}</p>
          </div> : <p className="typing-text">{[...text].map((char, index) => <span key={index} className={index < input.length ? input[index] === char ? 'text-emerald-300' : 'bg-red-500/25 text-red-300' : index === input.length ? 'typing-caret' : 'text-[#dce1f6]'}>{char}</span>)}</p>}
          <p className="mt-auto pt-10 text-xs text-[#7e89ac]">{guessing ? 'Type your answer below, then press Enter.' : 'Stay relaxed. Accuracy first, speed will follow.'}</p>
        </section>
        <form onSubmit={guessing ? session.submitGuess : event => event.preventDefault()} className="mt-5"><div className="flex items-center gap-4 rounded-2xl border-2 border-violet-300 bg-white p-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
          <Icon name="keyboard" className="ml-1 h-6 w-6 shrink-0 text-slate-400" />
          <input ref={field} value={input} onChange={event => { const value = event.target.value; if (value !== input) playKey(value.length < input.length ? 'backspace' : value.endsWith(' ') ? 'space' : 'letter'); session.change(value) }} onKeyDown={event => { if (event.key === 'Enter' && guessing && input.trim()) playKey('enter') }} onPaste={event => event.preventDefault()} onDrop={event => event.preventDefault()} disabled={status === 'loading' || (settings.game === 'recall' && revealed)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} aria-label={guessing ? 'Your answer' : 'Type the displayed text'} className="w-full min-w-0 bg-transparent py-1 text-lg outline-none placeholder:text-slate-400" placeholder={settings.game === 'recall' && revealed ? 'Memorize the word above…' : guessing ? 'Type your answer…' : 'Start typing here…'} />
          {guessing && <button type="submit" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white" disabled={status !== 'running'}>Check</button>}
        </div></form>
        {session.feedback && <p role="status" className="mt-3 text-sm text-amber-600">{session.feedback}</p>}
        <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-400"><span>{status === 'ready' ? settings.game === 'recall' && revealed ? 'Memorize first. The word disappears in 3 seconds.' : 'The timer starts with your first keystroke.' : settings.game ? `Combo ×${counts.combo} · ${counts.rounds} rounds` : 'Tip: keep your fingers on the home row.'}</span><button className="shrink-0 font-semibold text-violet-500 hover:text-violet-700" onClick={session.finish} disabled={!elapsed}>Finish session</button></div>
      </>}
    </>}
  </div>
}
