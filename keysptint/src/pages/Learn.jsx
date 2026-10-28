import { useEffect, useState } from 'react'
import { loadContent } from '../server/api'
import { categories } from '../data/modes'
import ContentLibraryStats from '../components/ContentLibraryStats'
import GrammarLesson from '../components/GrammarLesson'
import VocabularyExplorer from '../components/VocabularyExplorer'

export default function Learn() {
  const [tab, setTab] = useState('grammar')
  const [difficulty, setDifficulty] = useState('easy')
  const [category, setCategory] = useState('common')
  const [lessons, setLessons] = useState([])
  const [words, setWords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true); setError('')
    Promise.all([loadContent('grammar'), loadContent('words')]).then(([grammar, vocabulary]) => {
      if (!active) return
      setLessons(grammar)
      setWords([...vocabulary[difficulty][category]].sort((a, b) => a.localeCompare(b)))
      setLoading(false)
    }).catch(e => { if (active) { setError(e.message); setLoading(false) } })
    return () => { active = false }
  }, [difficulty, category])

  return <>
    <p className="eyebrow mb-3">BUILD YOUR ENGLISH TOOLKIT</p>
    <h1 className="mb-3 text-4xl font-extrabold tracking-tight">A little learning goes a long way.</h1>
    <p className="mb-8 text-slate-400">Understand the rules. Explore new words. Put them into practice.</p>
    <ContentLibraryStats />
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex gap-2">{['grammar', 'vocabulary'].map(value => <button key={value} onClick={() => setTab(value)} aria-pressed={tab === value} className={`secondary-button capitalize ${tab === value ? 'bg-violet-100! border-violet-200! text-violet-600!' : ''}`}>{value}</button>)}</div>
      <div className="flex gap-3">
        {tab === 'vocabulary' && <select aria-label="Vocabulary category" className="field capitalize" value={category} onChange={event => setCategory(event.target.value)}>{categories.map(value => <option key={value}>{value}</option>)}</select>}
        <select aria-label="Learning level" className="field capitalize" value={difficulty} onChange={event => setDifficulty(event.target.value)}>{['easy', 'medium', 'hard'].map(value => <option key={value}>{value}</option>)}</select>
      </div>
    </div>
    {error ? <p role="alert" className="panel p-6 text-red-600">{error}</p> : loading ? <p role="status" className="panel p-10 text-slate-400">Loading your learning library…</p> : tab === 'grammar' ? <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">{lessons.filter(lesson => lesson.level === difficulty).map(lesson => <GrammarLesson key={lesson.id} lesson={lesson} />)}</div> : <VocabularyExplorer key={`${difficulty}-${category}`} words={words} difficulty={difficulty} category={category} />}
  </>
}
