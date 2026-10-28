import { useEffect, useState } from 'react'
import { loadContent } from '../server/api'

export default function ContentLibraryStats() {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    let active = true
    loadContent('content-stats').then(data => { if (active) setStats(data) }).catch(() => {})
    return () => { active = false }
  }, [])
  if (!stats) return null
  return <section aria-label="Learning library" className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-violet-100 bg-violet-50/50 p-5 text-center sm:grid-cols-4">
    {[[stats.words, 'Vocabulary entries'], [stats.sentences, 'Sentence exercises'], [stats.paragraphs, 'Paragraphs'], [stats.grammar, 'Grammar lessons']].map(([value, label]) => <div key={label}><p className="text-xl font-extrabold text-violet-600 md:text-2xl">{value.toLocaleString('en-US')}</p><p className="mt-1 text-[10px] text-slate-500 md:text-xs">{label}</p></div>)}
  </section>
}
