export function getExerciseLabel(game, revealed) {
  switch (game) {
    case 'scramble':
      return 'PUT THE LETTERS IN ORDER'
    case 'recall':
      return revealed ? 'MEMORIZE THIS WORD' : 'TYPE FROM MEMORY'
    case 'detective':
      return 'FOLLOW THE CLUES'
    case 'survival':
      return 'KEEP THE STREAK'
    default:
      return 'TYPE THIS PART'
  }
}

export function getWordPrompt(settings, session) {
  const { text, scrambled, revealed } = session

  if (settings.game === 'scramble') {
    return {
      text: scrambled.split('').join(' '),
      hint: `Category: ${settings.category} · ${text.length} letters. Use every letter once to make a word.`,
    }
  }

  if (settings.game === 'detective') {
    const hiddenWord = [...text]
      .map((letter, index) => {
        const isEdge = index === 0 || index === text.length - 1
        return isEdge ? letter : '_'
      })
      .join(' ')

    return {
      text: hiddenWord,
      hint: `Category: ${settings.category} · ${text.length} letters · starts with “${text[0]}” and ends with “${text.at(-1)}”`,
    }
  }

  return {
    text: revealed ? text : '•'.repeat(text.length),
    hint: revealed
      ? 'You have 3 seconds. Take a good look.'
      : `${text.length} letters. You've got this.`,
  }
}

export function getCharacterClass(character, index, input) {
  if (index < input.length) {
    return input[index] === character ? 'text-emerald-300' : 'bg-red-500/25 text-red-300'
  }

  return index === input.length ? 'typing-caret' : 'text-[#dce1f6]'
}

export function getSessionHint(settings, session) {
  const { status, revealed, counts } = session

  if (status === 'ready') {
    if (settings.game === 'recall' && revealed) {
      return 'Memorize first. The word disappears in 3 seconds.'
    }
    return 'The timer starts with your first keystroke.'
  }

  if (settings.game) return `Combo ×${counts.combo} · ${counts.rounds} rounds`
  return 'Tip: keep your fingers on the home row.'
}
