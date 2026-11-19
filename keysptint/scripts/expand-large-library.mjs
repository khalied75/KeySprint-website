import { readFile, writeFile } from 'node:fs/promises'
import { countableNouns, drills, pluralize } from './content/large-practice-bank.mjs'
import { calculateContentStats } from '../src/utils/contentStats.js'

const library = new URL('../public/public%20json/', import.meta.url)
const bank = new URL('./content/', import.meta.url)
const levels = ['easy', 'medium', 'hard']
const readJson = async (directory, name) =>
  JSON.parse(await readFile(new URL(`${name}.json`, directory), 'utf8'))
const [words, sentences, paragraphs, grammar, extraGrammar, ...stories] =
  await Promise.all([
    ...['words', 'sentences', 'paragraphs', 'grammar'].map((name) =>
      readJson(library, name),
    ),
    readJson(bank, 'large-grammar'),
    ...levels.map((level) => readJson(bank, `large-stories-${level}`)),
  ])

function appendUnique(existing, additions) {
  const result = [...existing]
  const known = new Set(existing)
  for (const value of additions) {
    if (typeof value !== 'string' || !value.trim() || value !== value.trim()) {
      throw new Error('Every entry must be a nonempty, trimmed string.')
    }
    if (!known.has(value)) {
      result.push(value)
      known.add(value)
    }
  }
  return result
}

const lowerSubject = (subject) =>
  subject === 'I' ? subject : subject[0].toLowerCase() + subject.slice(1)

function sentenceDrills(level) {
  const { subjects, contexts, actions } = drills[level]
  const result = []
  for (const subjectEntry of subjects) {
    const [subject, thirdPerson] = Array.isArray(subjectEntry)
      ? subjectEntry
      : [subjectEntry, false]
    for (const [base, inflected] of actions) {
      for (const context of contexts) {
        if (level === 'easy') {
          result.push(
            `${subject} ${thirdPerson ? inflected : base} ${context}.`,
            `${subject} ${thirdPerson ? 'does' : 'do'} not ${base} ${context}.`,
            `${thirdPerson ? 'Does' : 'Do'} ${lowerSubject(subject)} ${base} ${context}?`,
          )
        } else if (level === 'medium') {
          result.push(
            `${subject} ${inflected} ${context}.`,
            `${subject} did not ${base} ${context}.`,
            `Did ${lowerSubject(subject)} ${base} ${context}?`,
          )
        } else {
          // Hard-level actions are explicitly authored past-participle phrases.
          result.push(
            `${subject} will have ${base} ${context}.`,
            `${subject} will not have ${base} ${context}.`,
            `Will ${lowerSubject(subject)} have ${base} ${context}?`,
          )
        }
      }
    }
  }
  return result
}

function storyExercises(themes) {
  const passages = []
  const sentences = []
  for (const theme of themes) {
    const { openings, situations, actions, results, reflections } = theme
    const slots = [openings, situations, actions, results, reflections]
    if (slots.some((slot) => slot.length !== 3))
      throw new Error('Each story slot needs three compatible choices.')
    sentences.push(...slots.flat())
    // Select 36 varied combinations from each compatible five-part story.
    // The first three indices already yield 27 unique combinations; the final
    // nine change the result index as well, avoiding duplicate passages.
    for (let i = 0; i < 36; i++) {
      const a = i % 3
      const b = Math.floor(i / 3) % 3
      const c = Math.floor(i / 9) % 3
      const d = (a + b + Math.floor(i / 27)) % 3
      const e = (b + c) % 3
      passages.push(
        [openings[a], situations[b], actions[c], results[d], reflections[e]].join(' '),
      )
    }
  }
  return { passages, sentences }
}

for (const lesson of extraGrammar) {
  if (
    !lesson.id ||
    !levels.includes(lesson.level) ||
    !lesson.options.includes(lesson.answer) ||
    lesson.examples.length < 3
  ) {
    throw new Error(`Invalid lesson: ${lesson.id}`)
  }
}

const before = calculateContentStats({ words, sentences, paragraphs, grammar })
const changesByLevel = {}
for (const [index, level] of levels.entries()) {
  for (const [category, nounList] of Object.entries(countableNouns[level])) {
    const nouns = nounList.split(/\s+/)
    words[level][category] = appendUnique(
      words[level][category] || [],
      nouns.flatMap((noun) => [noun, pluralize(noun)]),
    )
  }
  const verbForms = drills[level].actions.flatMap((action) =>
    action.map((phrase) => phrase.split(' ')[0]),
  )
  words[level].common = appendUnique(words[level].common, verbForms)

  const additions = storyExercises(stories[index])
  const grammarExamples = extraGrammar
    .filter((lesson) => lesson.level === level)
    .flatMap((lesson) => lesson.examples)
  sentences[level] = appendUnique(sentences[level], [
    ...sentenceDrills(level),
    ...additions.sentences,
    ...grammarExamples,
  ])
  paragraphs[level] = appendUnique(paragraphs[level], additions.passages)
}

// Preserve the current version of every lesson that already has this ID.
const knownIds = new Set(grammar.map((lesson) => lesson.id))
for (const lesson of extraGrammar) {
  if (!knownIds.has(lesson.id)) {
    grammar.push(lesson)
    knownIds.add(lesson.id)
  }
}

const after = calculateContentStats({ words, sentences, paragraphs, grammar })
for (const level of levels) {
  changesByLevel[level] = Object.fromEntries(
    ['words', 'sentences', 'paragraphs'].map((type) => [
      type,
      after.levels[level][type] - before.levels[level][type],
    ]),
  )
}
for (const [name, content] of Object.entries({
  words,
  sentences,
  paragraphs,
  grammar,
  'content-stats': after,
})) {
  await writeFile(
    new URL(`${name}.json`, library),
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
      changesByLevel,
    },
    null,
    2,
  ),
)
