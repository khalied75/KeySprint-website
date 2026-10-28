import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { getExercise, shuffle, loadLibraryStats } from '../src/server/api.js'
import { calculateContentStats } from '../src/utils/contentStats.js'
import { evaluateEdit } from '../src/utils/typing.js'
import { getHistory, saveResult } from '../src/utils/storage.js'
import {
  normalizeDuration,
  scrambleWord,
  isTimedGame,
  isWordGame,
} from '../src/utils/games.js'

globalThis.fetch = async (url) => {
  const name = url.split('/').at(-1)
  const data = JSON.parse(
    await readFile(new URL(`../public/public json/${name}`, import.meta.url), 'utf8'),
  )
  return { ok: true, json: async () => data }
}

test('all levels and categories produce exercises from the supplied library', async () => {
  for (const difficulty of ['easy', 'medium', 'hard']) {
    for (const category of [
      'common',
      'animals',
      'food',
      'technology',
      'nature',
      'school',
      'business',
    ]) {
      assert.ok((await getExercise({ mode: 'words', difficulty, category })).length > 0)
    }
    for (const mode of ['sentences', 'paragraphs', 'letters']) {
      assert.ok((await getExercise({ mode, difficulty })).length > 0)
    }
  }
})

test('word filters work and impossible filters return an actionable error', async () => {
  const result = await getExercise({
    mode: 'words',
    difficulty: 'easy',
    category: 'common',
    length: '5',
    starts: 'a',
  })
  assert.ok(result.split(' ').every((word) => word.length === 5 && word.startsWith('a')))
  await assert.rejects(
    getExercise({ mode: 'words', length: '30', starts: 'z' }),
    /No words match/,
  )
})

test('memory, detective, and scramble challenges return a single word', async () => {
  for (const game of ['recall', 'detective', 'scramble']) {
    const result = await getExercise({ mode: 'words', game })
    assert.ok(result.length > 0)
    assert.equal(result.includes(' '), false)
  }
})

test('timed games clamp durations and preserve valid second values', () => {
  for (const value of [null, undefined, '', 'invalid', Infinity])
    assert.equal(normalizeDuration(value), 60)
  assert.equal(normalizeDuration(1), 5)
  assert.equal(normalizeDuration(99), 60)
  assert.equal(normalizeDuration('17'), 17)
  assert.equal(normalizeDuration(25.6), 26)
  assert.equal(isTimedGame('scramble'), true)
  assert.equal(isTimedGame('sprint'), true)
  assert.equal(isTimedGame('recall'), false)
  assert.equal(isWordGame('scramble'), true)
  assert.equal(isWordGame('survival'), false)
})

test('scrambles preserve repeated letters and never reveal a sortable original word', () => {
  for (const word of ['letter', 'banana', 'technology', 'noon', 'aaab', 'an']) {
    for (const random of [() => 0, () => 0.9999, Math.random]) {
      const result = scrambleWord(word, random)
      assert.equal([...result].sort().join(''), [...word].sort().join(''))
      assert.notEqual(result, word)
    }
  }
  assert.equal(scrambleWord('a'), 'a')
  assert.equal(scrambleWord('aaa'), 'aaa')
})

test('sprint and survival use sentences and scramble excludes unplayable single-letter words', async () => {
  for (const game of ['sprint', 'survival']) {
    assert.match(await getExercise({ game, mode: 'words' }), /[.!?]/)
  }
  await assert.rejects(getExercise({ game: 'scramble', length: 1 }), /No words match/)
})

test('expanded content has unique exercises, valid quizzes, and matching published counts', async () => {
  const read = async (name) =>
    JSON.parse(
      await readFile(
        new URL(`../public/public json/${name}.json`, import.meta.url),
        'utf8',
      ),
    )
  const [words, sentences, paragraphs, grammar, stats] = await Promise.all(
    ['words', 'sentences', 'paragraphs', 'grammar', 'content-stats'].map(read),
  )
  let totalWords = 0
  for (const level of ['easy', 'medium', 'hard']) {
    assert.ok(sentences[level].length > 0)
    assert.ok(paragraphs[level].length > 0)
    for (const list of [
      sentences[level],
      paragraphs[level],
      ...Object.values(words[level]),
    ]) {
      assert.equal(new Set(list).size, list.length)
      assert.ok(list.every((item) => typeof item === 'string' && item.trim().length > 0))
    }
    totalWords += Object.values(words[level]).reduce((sum, list) => sum + list.length, 0)
    assert.equal(stats.levels[level].sentences, sentences[level].length)
    assert.equal(stats.levels[level].paragraphs, paragraphs[level].length)
    assert.ok(grammar.some((lesson) => lesson.level === level))
  }
  assert.equal(stats.words, totalWords)
  assert.equal(stats.sentences, Object.values(sentences).flat().length)
  assert.equal(stats.paragraphs, Object.values(paragraphs).flat().length)
  assert.equal(stats.grammar, grammar.length)
  assert.deepEqual(await loadLibraryStats(), stats)
  assert.equal(new Set(grammar.map((lesson) => lesson.id)).size, grammar.length)
  for (const lesson of grammar) {
    assert.ok(lesson.options.includes(lesson.answer))
    assert.ok(lesson.examples.length >= 3)
    assert.ok(lesson.explanation.length > 50)
  }
})

test('library totals follow content additions and removals across categories and levels', () => {
  const content = {
    words: {
      easy: { common: ['hello'], food: ['apple'] },
      hard: { nature: ['ecosystem'] },
    },
    sentences: { easy: ['Hello there.'], medium: ['We went home.'] },
    paragraphs: { easy: ['A short paragraph.'] },
    grammar: [{ id: 'present-simple' }],
  }
  const before = calculateContentStats(content)
  assert.equal(before.words, 3)
  assert.equal(before.sentences, 2)
  assert.equal(before.paragraphs, 1)
  assert.equal(before.grammar, 1)
  assert.equal(before.levels.medium.words, 0)

  content.words.easy.common.push('goodbye', 'welcome')
  content.sentences.medium.push('Another sentence.')
  content.paragraphs.easy.pop()
  content.grammar.push({ id: 'past-simple' })
  const after = calculateContentStats(content)
  assert.equal(after.words, 5)
  assert.equal(after.levels.easy.words, 4)
  assert.equal(after.sentences, 3)
  assert.equal(after.paragraphs, 0)
  assert.equal(after.grammar, 2)
})

test('typing counts incorrect keys, corrections, replacements, and deletions', () => {
  assert.deepEqual(evaluateEdit('ca', 'cat', 'cat'), { correct: 1, mistakes: 0 })
  assert.deepEqual(evaluateEdit('ca', 'car', 'cat'), { correct: 0, mistakes: 1 })
  assert.deepEqual(evaluateEdit('car', 'cat', 'cat'), { correct: 1, mistakes: 0 })
  assert.deepEqual(evaluateEdit('cat', 'car', 'cat'), { correct: 0, mistakes: 1 })
  assert.deepEqual(evaluateEdit('cat', 'ca', 'cat'), { correct: 0, mistakes: 0 })
  assert.deepEqual(evaluateEdit('ct', 'cat', 'cat'), { correct: 1, mistakes: 0 })
})

test('shuffle preserves the source and all items', () => {
  const source = ['one', 'two', 'three']
  assert.deepEqual(shuffle(source).sort(), [...source].sort())
  assert.deepEqual(source, ['one', 'two', 'three'])
})

test('history handles invalid storage and keeps at most 100 results', () => {
  let value = 'not json'
  globalThis.localStorage = {
    getItem: () => value,
    setItem: (_key, next) => {
      value = next
    },
  }
  assert.deepEqual(getHistory(), [])
  value = '[null, {}]'
  assert.deepEqual(getHistory(), [])
  for (let i = 0; i < 105; i++) saveResult({ wpm: i, accuracy: 100 })
  assert.equal(getHistory().length, 100)
  assert.equal(getHistory()[0].wpm, 104)
  globalThis.localStorage = {
    getItem: () => {
      throw new Error('disabled')
    },
    setItem: () => {
      throw new Error('disabled')
    },
  }
  assert.deepEqual(getHistory(), [])
  assert.doesNotThrow(() => saveResult({ wpm: 20, accuracy: 90 }))
})
