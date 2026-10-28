function countEntries(groups) {
  return Object.values(groups).reduce((total, entries) => total + entries.length, 0)
}

export function calculateContentStats({ words, sentences, paragraphs, grammar }) {
  const levelNames = new Set([
    ...Object.keys(words),
    ...Object.keys(sentences),
    ...Object.keys(paragraphs),
  ])

  const levels = Object.fromEntries(
    [...levelNames].map((level) => [
      level,
      {
        words: countEntries(words[level] || {}),
        sentences: sentences[level]?.length || 0,
        paragraphs: paragraphs[level]?.length || 0,
      },
    ]),
  )

  return {
    grammar: grammar.length,
    words: Object.values(levels).reduce((total, level) => total + level.words, 0),
    sentences: countEntries(sentences),
    paragraphs: countEntries(paragraphs),
    levels,
  }
}
