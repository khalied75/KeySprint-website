import { normalizeDuration } from './games.js'

export function wordTravelTime(rounds, difficulty) {
  const base = { easy: 8000, medium: 6500, hard: 5200 }[difficulty] || 8000
  return Math.max(2200, base * 0.92 ** rounds)
}

export function createWordRush(words, settings) {
  if (!words.length) throw new Error('Word rush needs at least one word.')
  return {
    status: 'ready',
    words,
    wordIndex: 0,
    text: words[0],
    input: '',
    difficulty: settings.difficulty,
    timeLimit: normalizeDuration(settings.duration, 10),
    startedAt: null,
    wordStartedAt: null,
    elapsedMs: 0,
    position: 0,
    lives: 3,
    feedback: '',
    endReason: '',
    counts: { correct: 0, mistakes: 0, rounds: 0, combo: 0, missed: 0 },
  }
}

function nextWord(state, now) {
  const wordIndex = (state.wordIndex + 1) % state.words.length
  return {
    ...state,
    wordIndex,
    text: state.words[wordIndex],
    input: '',
    position: 0,
    wordStartedAt: now,
  }
}

function endRun(state, now, endReason) {
  const elapsedMs = state.startedAt === null ? 0 : Math.max(0, now - state.startedAt)
  return {
    ...state,
    status: 'done',
    elapsedMs: Math.min(state.timeLimit * 1000, elapsedMs),
    endReason,
  }
}

export function advanceWordRush(state, now) {
  if (state.status !== 'running') return state
  let next = state
  const sessionDeadline = state.startedAt + state.timeLimit * 1000

  // Resolve deadlines in chronological order, even after a suspended browser tab.
  while (next.status === 'running') {
    const travelTime = wordTravelTime(next.counts.rounds, next.difficulty)
    const wordDeadline = next.wordStartedAt + travelTime
    if (now < Math.min(sessionDeadline, wordDeadline)) {
      return {
        ...next,
        elapsedMs: now - next.startedAt,
        position: Math.max(0, (now - next.wordStartedAt) / travelTime),
      }
    }
    if (sessionDeadline <= wordDeadline) return endRun(next, sessionDeadline, 'time')

    next = {
      ...next,
      lives: next.lives - 1,
      feedback: 'That word crossed the line. Catch the next one!',
      counts: {
        ...next.counts,
        mistakes: next.counts.mistakes + 1,
        missed: next.counts.missed + 1,
        combo: 0,
      },
    }
    if (next.lives === 0) return endRun({ ...next, position: 1 }, wordDeadline, 'lives')
    next = nextWord(next, wordDeadline)
  }
  return next
}

export function changeWordRush(state, value, now) {
  const current = advanceWordRush(state, now)
  if (!['ready', 'running'].includes(current.status)) return current
  if (
    current.wordIndex !== state.wordIndex ||
    current.counts.missed !== state.counts.missed
  )
    return current
  if (current.status === 'ready' && !value) return current

  const next = {
    ...current,
    status: 'running',
    startedAt: current.startedAt ?? now,
    wordStartedAt: current.wordStartedAt ?? now,
    input: value.slice(0, 100),
    feedback: '',
  }
  if (next.input.trim().toLowerCase() !== next.text.toLowerCase()) return next
  return nextWord(
    {
      ...next,
      counts: {
        ...next.counts,
        correct: next.counts.correct + next.text.length,
        rounds: next.counts.rounds + 1,
        combo: next.counts.combo + 1,
      },
    },
    now,
  )
}

export function submitWordRush(state, now) {
  const current = advanceWordRush(state, now)
  if (current.status !== 'running' || !current.input.trim()) return current
  return {
    ...current,
    input: '',
    feedback: 'Not quite. Type the moving word exactly; the clock is still running.',
    counts: { ...current.counts, mistakes: current.counts.mistakes + 1, combo: 0 },
  }
}

export function finishWordRush(state, now) {
  const current = advanceWordRush(state, now)
  if (current.status === 'done' || !['ready', 'running'].includes(current.status))
    return current
  return endRun(current, now, 'manual')
}
