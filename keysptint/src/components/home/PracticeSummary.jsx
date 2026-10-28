import Icon from '../Icon'

export default function PracticeSummary({ history }) {
  return (
    <section className="mt-9 grid gap-5 rounded-2xl border border-[#e6e7ef] bg-white/60 p-6 sm:grid-cols-3">
      <div className="flex items-center gap-4">
        <span className="rounded-xl bg-violet-50 p-3 text-violet-500">
          <Icon name="chart" />
        </span>
        <div>
          <p className="text-lg font-bold">{history.length}</p>
          <p className="text-xs text-slate-400">Sessions completed</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:border-l sm:border-[#ececf3] sm:pl-7">
        <span className="rounded-xl bg-emerald-50 p-3 text-emerald-500">
          <Icon name="timer" />
        </span>
        <div>
          <p className="text-lg font-bold">
            {Math.max(0, ...history.map((item) => item.wpm))}
            <span className="ml-1 text-xs font-normal text-slate-400">WPM</span>
          </p>
          <p className="text-xs text-slate-400">Your personal best</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:border-l sm:border-[#ececf3] sm:pl-7">
        <span className="rounded-xl bg-amber-50 p-3 text-amber-500">
          <Icon name="trophy" />
        </span>
        <div>
          <p className="text-sm font-semibold">Progress over perfection</p>
          <p className="mt-1 text-xs text-slate-400">Every session is a step forward.</p>
        </div>
      </div>
    </section>
  )
}
