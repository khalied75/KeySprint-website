import { Link } from 'react-router'
import Icon from '../components/Icon'
import GooglePlayComingSoon from '../components/GooglePlayComingSoon'
import { challenges } from '../data/modes'
import ContentLibraryStats from '../components/ContentLibraryStats'

const features = [
  {
    title: 'Letters & words',
    description:
      'Start small, then explore useful English vocabulary. Choose a category, a word length, or a starting letter to make each session your own.',
    icon: 'letters',
  },
  {
    title: 'Sentences & paragraphs',
    description:
      'Build a smooth rhythm with longer, natural text. Explore everyday life, travel, science, work, and stories at three difficulty levels.',
    icon: 'paragraphs',
  },
  {
    title: 'Game challenges',
    description:
      'Race the clock, protect your three lives, catch moving words, remember a hidden word, follow letter clues, or solve a scramble. Six ways to keep learning playful.',
    icon: 'game',
  },
  {
    title: 'Clear progress',
    description:
      'See your WPM, accuracy, mistakes, and personal best. Your recent sessions are saved in this browser so you can see your progress over time.',
    icon: 'chart',
  },
]

export default function About({ notFound = false }) {
  if (notFound)
    return (
      <section className="panel mx-auto max-w-2xl p-12">
        <p className="eyebrow mb-3">404 · A LITTLE DETOUR</p>
        <h1 className="mb-5 text-3xl font-bold">Let's get you back in the flow.</h1>
        <p className="mb-7 leading-7 text-slate-500">
          This page could not be found. Your next practice session is just a click away.
        </p>
        <Link to="/" className="primary-button w-fit">
          Back to practice
          <Icon name="arrow" />
        </Link>
      </section>
    )

  return (
    <div className="mx-auto max-w-[1060px]">
      <div className="mb-8 flex items-center gap-4">
        <Link to="/" className="secondary-button p-3!" aria-label="Back to practice">
          <Icon name="arrow" className="h-5 w-5 rotate-180" />
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight">
          <Icon name="bolt" className="h-7 w-7 text-violet-600" />
          KeySprint
          <span className="ml-2 hidden text-xs font-medium tracking-normal text-slate-400 sm:inline">
            A little practice. A lot of progress.
          </span>
        </div>
      </div>
      <section className="hero mb-9 rounded-[24px] p-8 md:p-10">
        <p className="eyebrow mb-4 text-violet-200!">GET TO KNOW YOUR PRACTICE SPACE</p>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          Small steps. Stronger English.
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-violet-200">
          KeySprint brings English learning and typing together. Build confidence with
          every letter, find your flow with natural text, and make room for a little
          progress every day.
        </p>
      </section>
      <ContentLibraryStats />
      <p className="eyebrow mb-5 text-slate-500!">WHAT YOU CAN PRACTICE</p>
      <div className="mb-7 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.title} className="panel flex items-start gap-5 p-6">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Icon name={feature.icon} className="h-7 w-7" />
            </span>
            <div>
              <h2 className="mb-2 text-lg font-bold">{feature.title}</h2>
              <p className="text-sm leading-6 text-slate-500">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
      <aside className="mb-9 flex items-center gap-5 rounded-2xl bg-[#fff6e0] p-6">
        <Icon name="bulb" className="h-9 w-9 shrink-0 text-amber-600" />
        <p className="text-sm leading-7 text-[#8a7950]">
          Choose a level, type the highlighted text, and keep your eyes on accuracy. In
          game mode, the next round appears automatically. Timed challenges start with
          your first keystroke.
        </p>
      </aside>
      <section className="mb-9">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Find your kind of challenge</h2>
          <Link to="/games" className="text-xs font-bold text-violet-600">
            Explore games →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((game) => (
            <Link
              key={game.id}
              to={`/games?game=${game.id}`}
              className="panel p-5 transition hover:border-violet-300"
            >
              <Icon name={game.icon} className="mb-4 h-6 w-6 text-violet-500" />
              <h3 className="mb-2 text-sm font-bold">{game.name}</h3>
              <p className="text-xs leading-6 text-slate-400">{game.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <GooglePlayComingSoon />
      <section className="my-9 grid gap-7 md:grid-cols-3">
        <div>
          <h2 className="mb-3 text-sm font-bold">How your stats work</h2>
          <p className="text-xs leading-6 text-slate-500">
            WPM means words per minute, using five correct keystrokes per word. Accuracy
            compares correct keystrokes with all attempts, including corrected mistakes.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold">Memory, clues & moving words</h2>
          <p className="text-xs leading-6 text-slate-500">
            Each incorrect guess counts as one mistake. Correct answers contribute their
            letter count. Recall and detective runs have five rounds; scramble runs until
            your chosen time expires. Word rush ends when time expires or three words
            cross the line; each missed word costs a life and counts as a mistake.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold">Your progress stays with you</h2>
          <p className="text-xs leading-6 text-slate-500">
            No account needed. Your last 100 results stay in this browser on this device.
            Clearing browser storage removes these results. Desktop results are stored
            locally and are not synced to an account.
          </p>
        </div>
      </section>
      <Link to="/" className="primary-button mx-auto w-fit px-10!">
        Back to practice
        <Icon name="arrow" />
      </Link>
    </div>
  )
}
