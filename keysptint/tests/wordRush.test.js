import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeDuration, isTimedGame, isWordGame } from '../src/utils/games.js'
import {
  advanceWordRush,
  changeWordRush,
  createWordRush,
  finishWordRush,
  submitWordRush,
  wordTravelTime,
} from '../src/utils/wordRush.js'

const words = ['apple', 'book', 'river']
const settings = { difficulty: 'easy', duration: 60 }

test('Word rush is a timed single-word game with a ten-second minimum', () => {
  assert.equal(isTimedGame('rush'), true)
  assert.equal(isWordGame('rush'), true)
  assert.equal(normalizeDuration(5, 10), 10)
  assert.equal(createWordRush(words, { ...settings, duration: 100 }).timeLimit, 60)
  assert.equal(createWordRush(words, { ...settings, duration: 1 }).timeLimit, 10)
  assert.throws(() => createWordRush([], settings), /at least one word/)
})

test('the word and session clocks wait for the first typed character', () => {
  const ready = createWordRush(words, settings)
  assert.equal(advanceWordRush(ready, 100000), ready)
  assert.equal(changeWordRush(ready, '', 100000), ready)
  const running = changeWordRush(ready, 'a', 50000)
  assert.equal(running.startedAt, 50000)
  assert.equal(running.wordStartedAt, 50000)
  const midway = advanceWordRush(running, 54000)
  assert.equal(midway.position, 0.5)
  assert.equal(midway.lives, 3)
})

test('a full word is caught automatically and each catch increases speed', () => {
  let state = changeWordRush(createWordRush(words, settings), 'a', 0)
  state = changeWordRush(state, 'APPLE', 1000)
  assert.equal(state.text, 'book')
  assert.equal(state.input, '')
  assert.equal(state.counts.correct, 5)
  assert.equal(state.counts.rounds, 1)
  assert.equal(state.counts.combo, 1)
  assert.equal(state.lives, 3)
  assert.equal(state.position, 0)
  assert.equal(state.wordStartedAt, 1000)
  assert.ok(wordTravelTime(1, 'easy') < wordTravelTime(0, 'easy'))
  assert.ok(wordTravelTime(0, 'hard') < wordTravelTime(0, 'easy'))
  assert.ok(wordTravelTime(500, 'hard') >= 2200)
})

test('crossing the line loses exactly one life and three misses end the run', () => {
  const initial = changeWordRush(createWordRush(words, settings), 'a', 0)
  const missed = advanceWordRush(initial, 8000)
  assert.equal(missed.lives, 2)
  assert.equal(missed.text, 'book')
  assert.equal(missed.counts.missed, 1)
  assert.equal(missed.counts.mistakes, 1)
  assert.equal(missed.input, '')
  const done = advanceWordRush(missed, 24000)
  assert.equal(done.status, 'done')
  assert.equal(done.lives, 0)
  assert.equal(done.counts.missed, 3)
  assert.equal(done.endReason, 'lives')
  assert.equal(done.elapsedMs, 24000)
  assert.equal(advanceWordRush(done, 50000), done)
})

test('late answers cannot catch expired words or score after session time runs out', () => {
  const initial = changeWordRush(
    createWordRush(words, { ...settings, duration: 10 }),
    'a',
    0,
  )
  const atLine = changeWordRush(initial, 'apple', 8000)
  assert.equal(atLine.counts.correct, 0)
  assert.equal(atLine.lives, 2)
  const afterTime = changeWordRush(atLine, 'book', 10000)
  assert.equal(afterTime.status, 'done')
  assert.equal(afterTime.endReason, 'time')
  assert.equal(afterTime.elapsedMs, 10000)
  assert.equal(afterTime.counts.correct, 0)
})

test('resuming a suspended tab resolves life loss before the later time limit', () => {
  const running = changeWordRush(createWordRush(words, settings), 'a', 0)
  const resumed = advanceWordRush(running, 120000)
  assert.equal(resumed.endReason, 'lives')
  assert.equal(resumed.elapsedMs, 24000)
  assert.equal(resumed.counts.missed, 3)
})

test('more than five correct words can be caught and wrong guesses do not spend lives', () => {
  let state = createWordRush(words, settings)
  for (let i = 0; i < 7; i++) state = changeWordRush(state, state.text, i * 300)
  assert.equal(state.status, 'running')
  assert.equal(state.counts.rounds, 7)
  state = changeWordRush(state, 'wrong', 2200)
  state = submitWordRush(state, 2300)
  assert.equal(state.lives, 3)
  assert.equal(state.counts.mistakes, 1)
  assert.equal(state.counts.combo, 0)
  assert.equal(state.input, '')
  const finished = finishWordRush(state, 2500)
  assert.equal(finished.endReason, 'manual')
  assert.equal(finished.elapsedMs, 2500)
  const restart = createWordRush(words, settings)
  assert.equal(restart.lives, 3)
  assert.equal(restart.counts.rounds, 0)
  assert.equal(restart.status, 'ready')
})
