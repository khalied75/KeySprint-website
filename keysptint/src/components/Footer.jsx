import { Link } from 'react-router'
import Icon from './Icon'
export default function Footer() {
  return <footer className="site-container flex flex-wrap items-center justify-between gap-3 border-t border-[#e3e5ef] py-6 text-xs text-slate-400"><span className="flex flex-wrap items-center gap-2"><Icon name="bolt" className="h-4 w-4 text-violet-500" /><b className="text-slate-500">KeySprint</b><span className="mx-2">·</span>A little practice. A lot of progress.</span><div className="flex flex-wrap gap-4"><span>Made for your keyboard</span><Link to="/about" className="hover:text-violet-600">About KeySprint ↗</Link></div></footer>
}
