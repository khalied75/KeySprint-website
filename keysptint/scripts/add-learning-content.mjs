import { readFile, writeFile } from 'node:fs/promises'

const library = new URL('../public/public%20json/', import.meta.url)
const additions = new URL('./content/', import.meta.url)
const readJson = async (directory, name) =>
  JSON.parse(await readFile(new URL(name, directory), 'utf8'))

const [grammar, sentences, newLessons, newSentences] = await Promise.all([
  readJson(library, 'grammar.json'),
  readJson(library, 'sentences.json'),
  readJson(additions, 'grammar-lessons.json'),
  readJson(additions, 'sentence-exercises.json'),
])

// Existing lessons take precedence if an author has edited a lesson with this ID.
const lessonIds = new Set(grammar.map((lesson) => lesson.id))
let addedLessons = 0
for (const lesson of newLessons) {
  if (lessonIds.has(lesson.id)) continue
  grammar.push(lesson)
  lessonIds.add(lesson.id)
  addedLessons++
}

const addedByLevel = {}
for (const level of ['easy', 'medium', 'hard']) {
  const existing = sentences[level] || []
  const examples = newLessons
    .filter((lesson) => lesson.level === level)
    .flatMap((lesson) => lesson.examples)
  const merged = [...new Set([...existing, ...newSentences[level], ...examples])]
  addedByLevel[level] = merged.length - existing.length
  sentences[level] = merged
}

await writeFile(new URL('grammar.json', library), `${JSON.stringify(grammar, null, 2)}\n`)
await writeFile(
  new URL('sentences.json', library),
  `${JSON.stringify(sentences, null, 2)}\n`,
)
console.log(
  `Added ${addedLessons} grammar lessons and ${Object.values(addedByLevel).reduce((sum, count) => sum + count, 0)} sentence exercises.`,
  addedByLevel,
)

// Refresh the snapshot without altering words or paragraphs.
await import('./update-content-stats.mjs')
