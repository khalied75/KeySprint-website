import Icon from '../Icon'
import { challenges } from '../../data/modes'

export default function ChallengePicker({ selectedGame, onSelect }) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="step">01</span>
        <h2 className="text-xl font-bold">Choose your challenge</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {challenges.map((game) => (
          <button
            key={game.id}
            className={`mode-card ${selectedGame === game.id ? 'selected' : ''}`}
            aria-pressed={selectedGame === game.id}
            onClick={() => onSelect(game.id)}
          >
            <div className="mb-5 flex justify-between">
              <span className="icon-tile">
                <Icon name={game.icon} className="h-6 w-6" />
              </span>
              {selectedGame === game.id && (
                <Icon name="check" className="text-violet-600 h-5 w-5" />
              )}
            </div>
            <p className="mb-2 text-[9px] font-bold tracking-widest text-violet-500">
              {game.tag}
            </p>
            <h3 className="mb-2 text-lg font-bold">{game.name}</h3>
            <p className="text-sm leading-6 text-slate-400">{game.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
