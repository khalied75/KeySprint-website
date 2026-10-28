// Compare the edited region rather than assuming all edits happen at the end.
export function evaluateEdit(previous, next, target) {
  let start = 0
  while (
    start < previous.length &&
    start < next.length &&
    previous[start] === next[start]
  )
    start++
  let oldEnd = previous.length
  let newEnd = next.length
  while (oldEnd > start && newEnd > start && previous[oldEnd - 1] === next[newEnd - 1]) {
    oldEnd--
    newEnd--
  }
  const added = next.slice(start, newEnd)
  const correct = [...added].filter(
    (character, index) => character === target[start + index],
  ).length
  return { correct, mistakes: added.length - correct }
}
