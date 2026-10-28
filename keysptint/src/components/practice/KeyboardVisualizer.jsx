import { keyboardRows } from '../../data/keyboardLayout'

export default function KeyboardVisualizer({ pressedKeys }) {
  const shifted = pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight')

  return (
    <figure
      className="keyboard-visualizer"
      aria-label="English QWERTY keyboard. Keys light up while pressed in the typing field."
      onPointerDown={(event) => event.preventDefault()}
    >
      <figcaption className="keyboard-caption">
        <span>Your keyboard</span>
        <span>Keys light up as you type</span>
      </figcaption>

      <div className="keyboard-rows" aria-hidden="true">
        {keyboardRows.map((row, index) => (
          <div className="keyboard-row" key={index}>
            {row.map((key) => (
              <span
                key={key.code}
                className={`keyboard-key ${pressedKeys.has(key.code) ? 'is-pressed' : ''}`}
                data-code={key.code}
                style={{ flexGrow: key.width }}
              >
                {shifted ? key.shiftedLabel : key.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </figure>
  )
}
