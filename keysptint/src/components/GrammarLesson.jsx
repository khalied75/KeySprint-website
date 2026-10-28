import { useState } from 'react'
import { Link } from 'react-router'
import Icon from './Icon'

export default function GrammarLesson({ lesson }) {
  const [answer, setAnswer] = useState('')
  return <article className="panel p-6">
    <span className="icon-tile mb-5"><Icon name="book" /></span>
    <p className="eyebrow mb-2">{lesson.level} · GRAMMAR</p>
    <h2 className="mb-2 text-xl font-bold">{lesson.title}</h2>
    <p className="mb-5 text-sm leading-6 text-slate-400">{lesson.description}</p>
    <p className="mb-5 text-sm leading-6 text-slate-600">{lesson.explanation}</p>
    <ul className="mb-6 space-y-2 rounded-xl bg-violet-50 p-4 text-sm text-violet-700">{lesson.examples.map(example => <li key={example}>{example}</li>)}</ul>
    <p className="mb-3 text-sm font-semibold">{lesson.question}</p>
    <div className="flex flex-wrap gap-2">{lesson.options.map(option => <button key={option} onClick={() => setAnswer(option)} aria-pressed={answer === option} className={`rounded-lg border px-3 py-2 text-sm ${answer === option ? 'border-violet-400 bg-violet-50 text-violet-700' : 'border-slate-200 hover:bg-slate-50'}`}>{option}</button>)}</div>
    {answer && <p role="status" className={`mt-3 text-sm ${answer === lesson.answer ? 'text-emerald-600' : 'text-amber-600'}`}>{answer === lesson.answer ? 'Exactly right. Well done!' : 'Almost! Read the rule and try again.'}</p>}
    <Link to={`/practice?mode=sentences&difficulty=${lesson.level}`} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-violet-600">Practice sentence typing<Icon name="arrow" className="h-4 w-4" /></Link>
  </article>
}
