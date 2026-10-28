import Icon from '../Icon'

export default function DifficultySelector({ value, onChange }) {
  return (
    <>
      <label className="field-label">Difficulty</label>
      <div className="mb-6 grid grid-cols-3 rounded-xl bg-[#f3f3f9] p-1">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            aria-pressed={value === level}
            className={`flex items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition ${value === level ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {value === level && <Icon name="check" className="h-4 w-4" />}
            {level}
          </button>
        ))}
      </div>
    </>
  )
}
