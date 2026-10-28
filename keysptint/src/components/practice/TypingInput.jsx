import Icon from '../Icon'
import { useSettings } from '../../context/SettingsContext'

export default function TypingInput({ settings, session, field }) {
  const { playKey } = useSettings()
  const { input, status, guessing, revealed } = session

  function handleChange(event) {
    const value = event.target.value
    if (value !== input) {
      let sound = 'letter'
      if (value.length < input.length) sound = 'backspace'
      else if (value.endsWith(' ')) sound = 'space'
      playKey(sound)
    }
    session.change(value)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && guessing && input.trim()) playKey('enter')
  }

  return (
    <form
      onSubmit={guessing ? session.submitGuess : (event) => event.preventDefault()}
      className="mt-5"
    >
      <div className="flex items-center gap-4 rounded-2xl border-2 border-violet-300 bg-white p-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
        <Icon name="keyboard" className="ml-1 h-6 w-6 shrink-0 text-slate-400" />
        <input
          ref={field}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={(event) => event.preventDefault()}
          onDrop={(event) => event.preventDefault()}
          disabled={status === 'loading' || (settings.game === 'recall' && revealed)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label={guessing ? 'Your answer' : 'Type the displayed text'}
          className="w-full min-w-0 bg-transparent py-1 text-lg outline-none placeholder:text-slate-400"
          placeholder={
            settings.game === 'recall' && revealed
              ? 'Memorize the word above…'
              : guessing
                ? 'Type your answer…'
                : 'Start typing here…'
          }
        />
        {guessing && (
          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
            disabled={status !== 'running'}
          >
            Check
          </button>
        )}
      </div>
    </form>
  )
}
