import { Link, NavLink } from 'react-router'
import Icon from './Icon'
export default function Navbar() {
  return (
    <header className="site-header border-b border-[#e6e7ef] bg-white/80">
      <div className="site-container grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-4 py-4 lg:flex lg:min-h-23 lg:justify-between lg:gap-5 lg:py-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-[-1.2px] sm:text-[27px]"
          aria-label="KeySprint home"
        >
          <Icon name="bolt" className="h-7 w-7 text-violet-600 sm:h-8 sm:w-8" />
          KeySprint
          <span className="ml-2 hidden rounded-md bg-violet-50 px-2 py-1 text-[10px] font-bold tracking-widest text-violet-600 sm:inline">
            DESKTOP
          </span>
        </Link>
        <nav
          className="main-nav col-span-2 row-start-2 grid grid-cols-4 gap-1 lg:order-none lg:flex lg:gap-1 xl:gap-3"
          aria-label="Main navigation"
        >
          {[
            ['/', 'Practice', 'keyboard'],
            ['/games', 'Games', 'game'],
            ['/learn', 'Learn', 'book'],
            ['/progress', 'Progress', 'chart'],
          ].map(([to, label, icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon name={icon} className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="col-start-2 row-start-1 flex items-center gap-1">
          <NavLink
            to="/settings"
            aria-label="Settings"
            className={({ isActive }) => `header-action ${isActive ? 'active' : ''}`}
          >
            <Icon name="settings" />
          </NavLink>
          <NavLink
            to="/about"
            aria-label="About KeySprint"
            className={({ isActive }) => `header-action ${isActive ? 'active' : ''}`}
          >
            <Icon name="info" />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
