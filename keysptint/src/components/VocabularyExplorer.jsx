import { useState } from 'react'
import { Link } from 'react-router'
import Icon from './Icon'

const PAGE_SIZE = 24

export default function VocabularyExplorer({ words, category, difficulty }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const filtered = words.filter(word => word.toLowerCase().includes(search.trim().toLowerCase()))
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  return <section className="panel p-5 md:p-7">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div><h2 className="text-xl font-bold capitalize">{category === 'common' ? 'Everyday English' : category}</h2><p className="mt-1 text-sm text-slate-400">Explore {words.length} words, then put them into practice.</p></div>
      <Link className="primary-button" to={`/practice?mode=words&difficulty=${difficulty}&category=${category}`}>Practice words<Icon name="arrow" /></Link>
    </div>
    <label htmlFor="word-search" className="field-label">Find a word in this collection</label>
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-violet-400"><Icon name="search" className="h-4 w-4 shrink-0 text-slate-400" /><input id="word-search" type="search" value={search} onChange={event => { setSearch(event.target.value); setPage(0) }} placeholder="Search vocabulary…" className="w-full bg-transparent py-3 text-sm outline-none" /></div>
    {visible.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{visible.map(word => <div key={word} className="break-words rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-5 text-base font-medium md:text-lg">{word}</div>)}</div> : <p role="status" className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-400">No matching words in this collection. Try another search or category.</p>}
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="text-xs text-slate-400" aria-live="polite">{filtered.length ? `${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, filtered.length)} of ${filtered.length} words` : '0 words'} · Page {page + 1} of {pages}</p><div className="flex gap-2"><button className="secondary-button" disabled={page === 0} onClick={() => setPage(previous => previous - 1)}><Icon name="arrow" className="h-4 w-4 rotate-180" />Previous</button><button className="secondary-button" disabled={page + 1 >= pages} onClick={() => setPage(previous => previous + 1)}>Next<Icon name="arrow" className="h-4 w-4" /></button></div></div>
  </section>
}
