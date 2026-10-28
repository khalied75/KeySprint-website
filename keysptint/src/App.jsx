import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout'
import Home from './pages/Home'
import Games from './pages/Games'
import Practice from './pages/Practice'
import Learn from './pages/Learn'
import Progress from './pages/Progress'
import About from './pages/About'
import Settings from './pages/Settings'
import { SettingsProvider } from './context/SettingsContext'

export default function App() {
  return <SettingsProvider><BrowserRouter><Routes><Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="games" element={<Games />} />
    <Route path="practice" element={<Practice />} />
    <Route path="learn" element={<Learn />} />
    <Route path="progress" element={<Progress />} />
    <Route path="about" element={<About />} />
    <Route path="settings" element={<Settings />} />
    <Route path="*" element={<About notFound />} />
  </Route></Routes></BrowserRouter></SettingsProvider>
}
