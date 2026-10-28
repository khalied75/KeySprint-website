import { useEffect, useRef, useState } from 'react'
import { loadWordPool, shuffle } from '../server/api'
import { saveResult } from '../utils/storage'
import { normalizeDuration } from '../utils/games'
import {
  advanceWordRush,
  changeWordRush,
  createWordRush,
  finishWordRush,
  submitWordRush,
} from '../utils/wordRush'

export default function useWordRush(settings) {
  const [state, setState] = useState({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const saved = useRef(false)

  useEffect(() => {
    let active = true
    loadWordPool(settings)
      .then((words) => {
        if (active) setState(createWordRush(shuffle(words), settings))
      })
      .catch((error) => {
        if (active) setState({ status: 'error', error: error.message })
      })
    return () => {
      active = false
    }
  }, [settings, attempt])

  useEffect(() => {
    if (state.status !== 'running') return
    let frame
    let lastUpdate = 0
    function tick(now) {
      if (now - lastUpdate >= 32) {
        setState((previous) => advanceWordRush(previous, now))
        lastUpdate = now
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [state.status])

  const counts = state.counts || {
    correct: 0,
    mistakes: 0,
    rounds: 0,
    combo: 0,
    missed: 0,
  }
  const seconds = (state.elapsedMs || 0) / 1000
  const elapsed = state.status === 'done' ? Math.ceil(seconds) : Math.floor(seconds)
  const accuracy =
    counts.correct + counts.mistakes
      ? Math.round((counts.correct / (counts.correct + counts.mistakes)) * 100)
      : 100
  const wpm = elapsed ? Math.round(counts.correct / 5 / (elapsed / 60)) : 0

  useEffect(() => {
    if (state.status !== 'done' || saved.current) return
    saved.current = true
    saveResult({
      mode: 'rush',
      difficulty: settings.difficulty,
      wpm,
      accuracy,
      mistakes: counts.mistakes,
      seconds: elapsed,
      score: counts.correct * 10,
      rounds: counts.rounds,
      missed: counts.missed,
      timeLimit: state.timeLimit,
    })
  }, [state, counts, settings.difficulty, elapsed, accuracy, wpm])

  function change(value) {
    const now = performance.now()
    setState((previous) => changeWordRush(previous, value, now))
  }

  function submitGuess(event) {
    event.preventDefault()
    const now = performance.now()
    setState((previous) => submitWordRush(previous, now))
  }

  function finish() {
    const now = performance.now()
    setState((previous) => finishWordRush(previous, now))
  }

  function restart() {
    saved.current = false
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
  }

  return {
    ...state,
    counts,
    elapsed,
    accuracy,
    wpm,
    text: state.text || '',
    input: state.input || '',
    timeLimit: state.timeLimit || normalizeDuration(settings.duration, 10),
    lives: state.lives ?? 3,
    position: state.position || 0,
    guessing: true,
    timed: true,
    revealed: true,
    change,
    submitGuess,
    finish,
    restart,
  }
}
