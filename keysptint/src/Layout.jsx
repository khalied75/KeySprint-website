import { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router'
export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return <div className="min-h-dvh flex flex-col"><Navbar /><main className="site-container min-w-0 flex-1 py-6 sm:py-9 md:py-12"><Outlet /></main><Footer /></div>
}
