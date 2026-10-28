import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { challenges } from '../data/modes'
import Icon from '../components/Icon'
import ChallengeSettings from '../components/ChallengeSettings'
export default function Games() {
  const [params] = useSearchParams()
  const [settings, setSettings] = useState({ game: challenges.some(game => game.id === params.get('game')) ? params.get('game') : 'sprint', mode: 'sentences', difficulty: 'easy', category: 'common', length: '', starts: '', duration: 60 })
  const navigate = useNavigate()
  return <><section className="hero mb-9 rounded-[26px] p-10"><Icon name="game" className="mb-5 h-9 w-9 text-amber-200" /><p className="eyebrow mb-3 text-violet-200!">A LITTLE PLAY. A LOT OF PROGRESS.</p><h1 className="mb-3 text-4xl font-extrabold tracking-tight">Play with purpose.</h1><p className="text-violet-200">Choose a challenge, build a combo, and beat your best score.</p></section><div className="grid items-start gap-8 lg:grid-cols-[1.65fr_1fr]"><section><div className="mb-5 flex items-center gap-3"><span className="step">01</span><h2 className="text-xl font-bold">Choose your challenge</h2></div><div className="grid gap-4 sm:grid-cols-2">{challenges.map(game => <button key={game.id} className={`mode-card ${settings.game === game.id ? 'selected' : ''}`} aria-pressed={settings.game === game.id} onClick={() => setSettings({ ...settings, game: game.id })}><div className="mb-5 flex justify-between"><span className="icon-tile"><Icon name={game.icon} className="h-6 w-6" /></span>{settings.game === game.id && <Icon name="check" className="text-violet-600 h-5 w-5" />}</div><p className="mb-2 text-[9px] font-bold tracking-widest text-violet-500">{game.tag}</p><h3 className="mb-2 text-lg font-bold">{game.name}</h3><p className="text-sm leading-6 text-slate-400">{game.description}</p></button>)}</div></section><ChallengeSettings settings={settings} onChange={setSettings} button="Let's play" onStart={() => navigate(`/practice?${new URLSearchParams(settings)}`)} /></div></>
}
