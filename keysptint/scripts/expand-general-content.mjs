import { readFile, writeFile } from 'node:fs/promises'
import vocabulary from './content/general-vocabulary.mjs'
import { calculateContentStats } from '../src/utils/contentStats.js'

const library = new URL('../public/public%20json/', import.meta.url)
const additions = new URL('./content/', import.meta.url)
const levels = ['easy', 'medium', 'hard']
const readJson = async (directory, name) =>
  JSON.parse(await readFile(new URL(`${name}.json`, directory), 'utf8'))

const [
  words,
  sentences,
  paragraphs,
  grammar,
  newLessons,
  newSentences,
  ...newParagraphs
] = await Promise.all([
  ...['words', 'sentences', 'paragraphs', 'grammar'].map((type) =>
    readJson(library, type),
  ),
  readJson(additions, 'general-grammar'),
  readJson(additions, 'general-sentences'),
  ...levels.map((level) => readJson(additions, `general-paragraphs-${level}`)),
])

function mergeEntries(existing, incoming) {
  const known = new Set(existing)
  const result = [...existing]
  for (const entry of incoming) {
    if (typeof entry !== 'string' || !entry.trim() || entry !== entry.trim()) {
      throw new Error('Content entries must be nonempty, trimmed strings.')
    }
    if (known.has(entry)) continue
    result.push(entry)
    known.add(entry)
  }
  return result
}

// Validate authored additions before changing any public files.
for (const lesson of newLessons) {
  if (
    !levels.includes(lesson.level) ||
    !lesson.options.includes(lesson.answer) ||
    lesson.examples.length < 3
  ) {
    throw new Error(`Invalid grammar lesson: ${lesson.id}`)
  }
}

const before = calculateContentStats({ words, sentences, paragraphs, grammar })
const wordsAdded = {}
for (const [index, level] of levels.entries()) {
  wordsAdded[level] = {}
  for (const [category, entries] of Object.entries(vocabulary[level])) {
    const existing = words[level][category] || []
    const merged = mergeEntries(existing, entries)
    wordsAdded[level][category] = merged.length - existing.length
    words[level][category] = merged
  }

  paragraphs[level] = mergeEntries(paragraphs[level], newParagraphs[index])

  // Each passage is authored as a coherent story. Its complete sentences also
  // become individual typing exercises without inventing template variations.
  const passageSentences = newParagraphs[index].flatMap((paragraph) => {
    const parts = (paragraph.match(/[^.!?]+[.!?]+/g) || []).map((part) => part.trim())
    if (parts.join(' ') !== paragraph)
      throw new Error(`Check sentence boundaries in ${level}.`)
    return parts
  })
  const grammarExamples = newLessons
    .filter((lesson) => lesson.level === level)
    .flatMap((lesson) => lesson.examples)
  sentences[level] = mergeEntries(sentences[level], [
    ...newSentences[level],
    ...passageSentences,
    ...grammarExamples,
  ])
}

// Existing lesson IDs keep their current content, including the user's edits.
const lessonIds = new Set(grammar.map((lesson) => lesson.id))
for (const lesson of newLessons) {
  if (lessonIds.has(lesson.id)) continue
  grammar.push(lesson)
  lessonIds.add(lesson.id)
}

const after = calculateContentStats({ words, sentences, paragraphs, grammar })
for (const [type, content] of Object.entries({
  words,
  sentences,
  paragraphs,
  grammar,
  'content-stats': after,
})) {
  await writeFile(
    new URL(`${type}.json`, library),
    `${JSON.stringify(content, null, 2)}\n`,
  )
}

console.log(
  JSON.stringify(
    {
      added: Object.fromEntries(
        ['words', 'sentences', 'paragraphs', 'grammar'].map((type) => [
          type,
          after[type] - before[type],
        ]),
      ),
      totals: after,
      wordsAdded,
    },
    null,
    2,
  ),
)
