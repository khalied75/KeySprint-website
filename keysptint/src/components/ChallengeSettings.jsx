import Icon from './Icon'
import DifficultySelector from './challenge/DifficultySelector'
import DurationSlider from './challenge/DurationSlider'
import WordFilters from './challenge/WordFilters'
import { isTimedGame, isWordGame } from '../utils/games'
export default function ChallengeSettings({
  settings,
  onChange,
  onStart,
  button = 'Start training',
}) {
  const update = (key, value) => onChange({ ...settings, [key]: value })
  const wordFilters = settings.game
    ? isWordGame(settings.game)
    : settings.mode === 'words'
  return (
    <section className="panel p-7 lg:p-8">
      <div className="mb-7 flex items-center gap-3">
        <span className="step">02</span>
        <h2 className="text-xl font-bold">Set your challenge</h2>
      </div>
      <DifficultySelector
        value={settings.difficulty}
        onChange={(value) => update('difficulty', value)}
      />
      {isTimedGame(settings.game) && (
        <DurationSlider
          value={settings.duration}
          onChange={(value) => update('duration', value)}
        />
      )}

      {wordFilters ? (
        <WordFilters settings={settings} onChange={update} />
      ) : (
        <p className="rounded-xl bg-violet-50 p-4 text-sm leading-6 text-slate-500">
          {settings.mode === 'letters'
            ? 'Start with the home row, then explore the whole keyboard.'
            : 'Practice real English from our curated lesson library.'}
        </p>
      )}
      <div className="my-6 flex items-start gap-2 text-xs leading-5 text-slate-400">
        <Icon name="book" className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Thoughtfully curated lessons.
          <br />
          No account needed. Just you and your keyboard.
        </p>
      </div>
      <button className="primary-button w-full" onClick={onStart}>
        {button}
        <Icon name="arrow" className="h-5 w-5" />
      </button>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        Your next little win starts here.
      </p>
    </section>
  )
}
