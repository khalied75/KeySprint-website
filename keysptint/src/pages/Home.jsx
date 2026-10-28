import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Icon from '../components/Icon'
import ChallengeSettings from '../components/ChallengeSettings'
import HomeHero from '../components/home/HomeHero'
import PracticeModePicker from '../components/home/PracticeModePicker'
import PracticeSummary from '../components/home/PracticeSummary'
import { getHistory } from '../utils/storage'
import GooglePlayComingSoon from '../components/GooglePlayComingSoon'

export default function Home() {
  const [settings, setSettings] = useState({
    mode: 'letters',
    difficulty: 'easy',
    category: 'common',
    length: '',
    starts: '',
  })
  const navigate = useNavigate()
  const history = getHistory()

  function handleModeSelect(mode) {
    setSettings((previous) => ({ ...previous, mode }))
  }

  function startTraining() {
    navigate(`/practice?${new URLSearchParams(settings)}`)
  }

  return (
    <>
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-2">YOUR DAILY DOSE OF PROGRESS</p>
          <h1 className="text-2xl font-bold tracking-tight">
            A good day to get better<span className="text-violet-500">.</span>
          </h1>
        </div>
        <span className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Your own pace. Your own progress.
        </span>
      </div>
      <HomeHero />
      <div className="grid items-start gap-7 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.65fr_1fr]">
        <div>
          <PracticeModePicker selectedMode={settings.mode} onSelect={handleModeSelect} />
          <Link
            to="/games"
            className="mt-5 flex items-center gap-4 rounded-2xl border border-amber-200/60 bg-[#fff7e2] p-5 transition hover:bg-amber-100"
          >
            <span className="rounded-xl bg-[#ffedbc] p-3 text-[#b78929]">
              <Icon name="game" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="mb-1 font-bold">A little challenge?</h3>
              <p className="text-xs text-[#9b8b65]">
                Beat the clock, build a combo, beat your best.
              </p>
            </div>
            <Icon name="arrow" className="ml-auto h-5 w-5 text-[#b78929]" />
          </Link>
        </div>
        <ChallengeSettings
          settings={settings}
          onChange={setSettings}
          onStart={startTraining}
        />
      </div>
      <PracticeSummary history={history} />
      <div className="mt-7">
        <GooglePlayComingSoon />
      </div>
    </>
  )
}
