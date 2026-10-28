import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { challenges } from '../data/modes'
import Icon from '../components/Icon'
import ChallengeSettings from '../components/ChallengeSettings'
import ChallengePicker from '../components/games/ChallengePicker'

export default function Games() {
  const [params] = useSearchParams()
  const [settings, setSettings] = useState({
    game: challenges.some((game) => game.id === params.get('game'))
      ? params.get('game')
      : 'sprint',
    mode: 'sentences',
    difficulty: 'easy',
    category: 'common',
    length: '',
    starts: '',
    duration: 60,
  })
  const navigate = useNavigate()

  function handleGameSelect(game) {
    setSettings((previous) => ({ ...previous, game }))
  }

  function startGame() {
    navigate(`/practice?${new URLSearchParams(settings)}`)
  }

  return (
    <>
      <section className="hero mb-9 rounded-[26px] p-10">
        <Icon name="game" className="mb-5 h-9 w-9 text-amber-200" />
        <p className="eyebrow mb-3 text-violet-200!">A LITTLE PLAY. A LOT OF PROGRESS.</p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
          Play with purpose.
        </h1>
        <p className="text-violet-200">
          Choose a challenge, build a combo, and beat your best score.
        </p>
      </section>
      <div className="grid items-start gap-8 lg:grid-cols-[1.65fr_1fr]">
        <ChallengePicker selectedGame={settings.game} onSelect={handleGameSelect} />
        <ChallengeSettings
          settings={settings}
          onChange={setSettings}
          button="Let's play"
          onStart={startGame}
        />
      </div>
    </>
  )
}
