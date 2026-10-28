import { readFile, writeFile } from 'node:fs/promises'
import { calculateContentStats } from '../src/utils/contentStats.js'

const directory = new URL('../public/public%20json/', import.meta.url)
const types = ['words', 'sentences', 'paragraphs', 'grammar']
const content = Object.fromEntries(
  await Promise.all(
    types.map(async (type) => {
      const text = await readFile(new URL(`${type}.json`, directory), 'utf8')
      return [type, JSON.parse(text)]
    }),
  ),
)

const stats = calculateContentStats(content)
await writeFile(
  new URL('content-stats.json', directory),
  `${JSON.stringify(stats, null, 2)}\n`,
)
console.log(
  `Library: ${stats.words} vocabulary entries, ${stats.sentences} sentence exercises, ${stats.paragraphs} paragraphs, ${stats.grammar} grammar lessons.`,
)
