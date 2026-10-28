import { normalizeDuration } from '../../utils/games'

export default function DurationSlider({ value, onChange, minimum = 5 }) {
  const duration = normalizeDuration(value, minimum)
  return (
    <div className="mb-6 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <label
          htmlFor="duration"
          className="text-xs font-bold tracking-wider text-slate-500"
        >
          TIME LIMIT
        </label>
        <output htmlFor="duration" className="text-sm font-bold text-violet-600">
          {duration} seconds
        </output>
      </div>
      <input
        id="duration"
        type="range"
        min={minimum}
        max="60"
        step="1"
        value={duration}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-violet-600"
      />
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        <span>{minimum}s</span>
        <span>60s</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Choose any duration from {minimum} to 60 seconds. The timer starts with your first
        keystroke.
      </p>
    </div>
  )
}
