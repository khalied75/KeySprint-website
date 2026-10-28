import { useCallback, useEffect, useRef, useState } from 'react'
import { getExercise } from '../server/api'
import { saveResult } from '../utils/storage'
import { evaluateEdit } from '../utils/typing'
import { isTimedGame, isWordGame, normalizeDuration, scrambleWord } from '../utils/games'

export default function useTraining(settings) {
  const [text, setText] = useState('')
  const [scrambled, setScrambled] = useState('')
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [counts, setCounts] = useState({ correct: 0, mistakes: 0, rounds: 0, combo: 0 })
  const [revealed, setRevealed] = useState(true)
  const [feedback, setFeedback] = useState('')
  const [attempt, setAttempt] = useState(0)
  const started = useRef(null)
  const finished = useRef(false)
  const request = useRef(0)
  const memory = settings.game === 'recall'
  const guessing = isWordGame(settings.game)
  const timed = isTimedGame(settings.game)
  const timeLimit = normalizeDuration(settings.duration)
  const accuracy = counts.correct + counts.mistakes ? Math.round(counts.correct / (counts.correct + counts.mistakes) * 100) : 100
  const wpm = elapsed > 0 ? Math.round(counts.correct / 5 / (elapsed / 60)) : 0

  useEffect(() => {
    const token = ++request.current
    getExercise(settings).then(value => {
      if (token !== request.current) return
      setText(value); setScrambled(scrambleWord(value)); setStatus('ready')
    }).catch(e => {
      if (token === request.current) { setError(e.message); setStatus('error') }
    })
    return () => { request.current++ }
  }, [settings, attempt])

  // Keep the session clock running while the next exercise loads.
  useEffect(() => {
    if (started.current === null || ['done', 'error'].includes(status)) return
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - started.current) / 1000)
      setElapsed(timed ? Math.min(timeLimit, seconds) : seconds)
    }, 100)
    return () => clearInterval(timer)
  }, [status, timed, timeLimit])

  useEffect(() => {
    if (!memory || status !== 'ready' || !revealed) return
    // The word disappears after 3 seconds; timing starts on the first answer key.
    const timer = setTimeout(() => setRevealed(false), 3000)
    return () => clearTimeout(timer)
  }, [memory, status, text, revealed])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    request.current++
    const duration = started.current !== null ? Math.max(1, Math.ceil((Date.now() - started.current) / 1000)) : 0
    const seconds = timed ? Math.min(timeLimit, duration) : duration
    const finalWpm = seconds ? Math.round(counts.correct / 5 / (seconds / 60)) : 0
    setElapsed(seconds); setStatus('done')
    saveResult({ mode: settings.game || settings.mode, difficulty: settings.difficulty, wpm: finalWpm, accuracy, mistakes: counts.mistakes, seconds, score: counts.correct * 10, rounds: counts.rounds, timeLimit: timed ? timeLimit : null })
  }, [settings, timed, timeLimit, accuracy, counts])

  useEffect(() => {
    if (finished.current) return
    if (timed && elapsed >= timeLimit) finish()
    if (settings.game === 'survival' && counts.mistakes >= 3) finish()
    if (!settings.game && text && input === text) finish()
    if (guessing && !timed && counts.rounds >= 5) finish()
  }, [elapsed, counts, input, text, settings.game, guessing, timed, timeLimit, finish])

  async function nextRound() {
    const token = ++request.current
    setStatus('loading'); setInput(''); setRevealed(true)
    try {
      const value = await getExercise(settings)
      if (token !== request.current || finished.current) return
      setText(value); setScrambled(scrambleWord(value)); setStatus(memory ? 'ready' : 'running')
    } catch (e) {
      if (token === request.current) { setError(e.message); setStatus('error') }
    }
  }

  function expired() {
    if (timed && started.current !== null && Date.now() - started.current >= timeLimit * 1000) { finish(); return true }
    return false
  }

  function change(value) {
    if (finished.current || !['ready', 'running'].includes(status) || (memory && revealed) || expired()) return
    if (status === 'ready') { started.current ??= Date.now(); setStatus('running') }
    setFeedback('')
    if (guessing) { setInput(value.slice(0, 40)); return }
    if (value.length > text.length) return
    const { correct, mistakes } = evaluateEdit(input, value, text)
    setCounts(previous => ({ ...previous, correct: previous.correct + correct, mistakes: previous.mistakes + mistakes, combo: mistakes ? 0 : previous.combo + correct, rounds: previous.rounds + (value === text ? 1 : 0) }))
    setInput(value)
    if (value === text && settings.game && !(settings.game === 'survival' && counts.mistakes + mistakes >= 3)) nextRound()
  }

  function submitGuess(event) {
    event.preventDefault()
    if (!input.trim() || status !== 'running' || finished.current || expired()) return
    if (input.trim().toLowerCase() !== text.toLowerCase()) {
      setCounts(previous => ({ ...previous, mistakes: previous.mistakes + 1, combo: 0 }))
      setFeedback(settings.game === 'scramble' ? 'Not quite. Use every letter once and try another order.' : 'Not quite. Think about the word and try again.')
      setInput('')
      return
    }
    setCounts(previous => ({ ...previous, correct: previous.correct + text.length, combo: previous.combo + 1, rounds: previous.rounds + 1 }))
    if (timed || counts.rounds + 1 < 5) nextRound()
  }

  function restart() {
    request.current++; started.current = null; finished.current = false
    setStatus('loading'); setInput(''); setElapsed(0); setError(''); setRevealed(true); setFeedback('')
    setCounts({ correct: 0, mistakes: 0, rounds: 0, combo: 0 }); setAttempt(previous => previous + 1)
  }

  return { text, scrambled, input, status, error, elapsed, counts, revealed, feedback, accuracy, wpm, guessing, timed, timeLimit, change, submitGuess, restart, finish }
}
