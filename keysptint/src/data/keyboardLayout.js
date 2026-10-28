const key = (code, label, shiftedLabel = label, width = 1) => ({
  code,
  label,
  shiftedLabel,
  width,
})

const letters = (row) =>
  [...row].map((letter) =>
    key(`Key${letter.toUpperCase()}`, letter, letter.toUpperCase()),
  )

export const keyboardRows = [
  [
    key('Backquote', '`', '~'),
    ...[...'1234567890'].map((digit, index) =>
      key(`Digit${digit}`, digit, '!@#$%^&*()'[index]),
    ),
    key('Minus', '-', '_'),
    key('Equal', '=', '+'),
    key('Backspace', 'Backspace', 'Backspace', 2),
  ],
  [
    key('Tab', 'Tab', 'Tab', 1.5),
    ...letters('qwertyuiop'),
    key('BracketLeft', '[', '{'),
    key('BracketRight', ']', '}'),
    key('Backslash', '\\', '|', 1.5),
  ],
  [
    key('CapsLock', 'Caps', 'Caps', 1.75),
    ...letters('asdfghjkl'),
    key('Semicolon', ';', ':'),
    key('Quote', "'", '"'),
    key('Enter', 'Enter', 'Enter', 2.25),
  ],
  [
    key('ShiftLeft', 'Shift', 'Shift', 2.25),
    ...letters('zxcvbnm'),
    key('Comma', ',', '<'),
    key('Period', '.', '>'),
    key('Slash', '/', '?'),
    key('ShiftRight', 'Shift', 'Shift', 2.75),
  ],
  [
    key('ControlLeft', 'Ctrl', 'Ctrl', 1.25),
    key('MetaLeft', '◇', '◇', 1.25),
    key('AltLeft', 'Alt', 'Alt', 1.25),
    key('Space', 'Space', 'Space', 6.25),
    key('AltRight', 'Alt', 'Alt', 1.25),
    key('MetaRight', '◇', '◇', 1.25),
    key('ContextMenu', 'Menu', 'Menu', 1.25),
    key('ControlRight', 'Ctrl', 'Ctrl', 1.25),
  ],
]

export const keyboardCodes = new Set(keyboardRows.flat().map(({ code }) => code))
