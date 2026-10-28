import { Link } from 'react-router'
import { getHistory } from '../utils/storage'
import Icon from '../components/Icon'
import { challenges, modes } from '../data/modes'
export default function Progress() {
  const history = getHistory()
  const best = Math.max(0, ...history.map((item) => item.wpm))
  const average = history.length
    ? Math.round(history.reduce((sum, item) => sum + item.accuracy, 0) / history.length)
    : 0
  return (
    <>
      <p className="eyebrow mb-3">EVERY SESSION COUNTS</p>
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
        See how far you've come.
      </h1>
      <p className="mb-8 text-slate-400">
        Your practice, your milestones. Saved right here in this browser.
      </p>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          [history.length, 'Sessions completed', 'keyboard'],
          [`${best} WPM`, 'Personal best', 'trophy'],
          [`${average}%`, 'Average accuracy', 'chart'],
        ].map(([value, label, icon]) => (
          <div className="panel flex items-center gap-5 p-7" key={label}>
            <span className="icon-tile">
              <Icon name={icon} />
            </span>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>
      {!history.length ? (
        <div className="panel py-16 text-center">
          <Icon name="chart" className="mx-auto mb-5 h-12 w-12 text-violet-400" />
          <h2 className="mb-3 text-2xl font-bold">Your story starts with one session.</h2>
          <p className="mb-7 text-slate-400">
            A few minutes today. A little more confidence tomorrow.
          </p>
          <Link className="primary-button mx-auto w-fit" to="/">
            Start practicing
            <Icon name="arrow" />
          </Link>
        </div>
      ) : (
        <div className="panel overflow-hidden">
          <h2 className="border-b border-slate-100 p-6 text-lg font-bold">
            Recent sessions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-400">
                <tr>
                  {['SESSION', 'DATE', 'SPEED', 'ACCURACY', 'MISTAKES', 'TIME'].map(
                    (label) => (
                      <th key={label} className="px-6 py-4 font-semibold">
                        {label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {history.map((result) => (
                  <tr key={result.id} className="border-t border-slate-100">
                    <td className="px-6 py-5">
                      <b>
                        {[...modes, ...challenges].find((mode) => mode.id === result.mode)
                          ?.name || result.mode}
                      </b>
                      <span className="mt-1 block text-xs capitalize text-slate-400">
                        {result.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-400">
                      {new Date(result.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 font-bold text-violet-600">
                      {result.wpm} WPM
                    </td>
                    <td className="px-6 py-5">{result.accuracy}%</td>
                    <td className="px-6 py-5">{result.mistakes}</td>
                    <td className="px-6 py-5">{result.seconds}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
