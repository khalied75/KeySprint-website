import Icon from '../Icon'
import { modes } from '../../data/modes'

export default function PracticeModePicker({ selectedMode, onSelect }) {
  return (
    <>
      <div className="mb-5 flex items-center gap-3">
        <span className="step">01</span>
        <h2 className="text-xl font-bold">Choose a practice mode</h2>
        <span className="ml-auto hidden text-xs text-slate-400 sm:block">
          Small steps. Real skills.
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            aria-pressed={selectedMode === mode.id}
            className={`mode-card group ${selectedMode === mode.id ? 'selected' : ''}`}
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="icon-tile">
                <Icon name={mode.icon} className="h-6 w-6" />
              </span>
              <span
                className={`selection-dot ${selectedMode === mode.id ? 'checked' : ''}`}
              >
                {selectedMode === mode.id && <Icon name="check" className="h-3 w-3" />}
              </span>
            </div>
            <h3 className="mb-1 text-lg font-bold">{mode.name}</h3>
            <p className="text-sm text-slate-400">{mode.description}</p>
          </button>
        ))}
      </div>
    </>
  )
}
