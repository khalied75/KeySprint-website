import { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router'
import usePracticeViewport from './hooks/usePracticeViewport'
export default function Layout() {
  const { pathname } = useLocation()
  const isPractice = pathname === '/practice' || pathname === '/practice/'
  const viewport = usePracticeViewport(isPractice)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div
      className={`min-h-dvh flex flex-col ${isPractice ? 'practice-layout' : ''}`}
      style={viewport.style}
      data-compact={viewport.compact}
      data-tight={viewport.tight}
    >
      <Navbar />
      <main className="site-container practice-main min-w-0 flex-1 py-6 sm:py-9 md:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
