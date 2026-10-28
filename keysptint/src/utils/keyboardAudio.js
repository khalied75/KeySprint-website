let context
let noise

export function keyboardAudioSupported() {
  return typeof window !== 'undefined' && Boolean(window.AudioContext || window.webkitAudioContext)
}

// A short switch click followed by a lower case resonance. Generated locally;
// no audio downloads or microphone permission are needed.
export function playMechanicalKey(key = 'letter') {
  if (!keyboardAudioSupported()) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    context ??= new AudioContext()
    if (context.state === 'suspended') {
      void context.resume().then(() => { if (context.state === 'running') synthesize(key) }).catch(() => {})
    } else if (context.state === 'running') synthesize(key)
  } catch { /* Unsupported or blocked audio must not interrupt typing. */ }
}

function synthesize(key) {
  const now = context.currentTime
  const heavy = key === 'space' || key === 'enter'
  if (!noise) {
    noise = context.createBuffer(1, Math.ceil(context.sampleRate * 0.045), context.sampleRate)
    const samples = noise.getChannelData(0)
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1
  }
  const source = context.createBufferSource()
  source.buffer = noise
  const filter = context.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = (heavy ? 1450 : 2600) + Math.random() * 500
  filter.Q.value = 0.7
  const click = context.createGain()
  click.gain.setValueAtTime(0.0001, now)
  click.gain.exponentialRampToValueAtTime(0.19, now + 0.001)
  click.gain.exponentialRampToValueAtTime(0.0001, now + 0.034)
  source.connect(filter).connect(click).connect(context.destination)
  source.start(now); source.stop(now + 0.045)

  const body = context.createOscillator()
  const resonance = context.createGain()
  body.type = 'triangle'
  body.frequency.setValueAtTime(heavy ? 230 : 360 + Math.random() * 60, now)
  body.frequency.exponentialRampToValueAtTime(heavy ? 85 : 130, now + 0.055)
  resonance.gain.setValueAtTime(0.0001, now)
  resonance.gain.exponentialRampToValueAtTime(heavy ? 0.12 : 0.075, now + 0.002)
  resonance.gain.exponentialRampToValueAtTime(0.0001, now + 0.065)
  body.connect(resonance).connect(context.destination)
  body.start(now); body.stop(now + 0.07)
  body.onended = () => { body.disconnect(); resonance.disconnect() }
  source.onended = () => { source.disconnect(); filter.disconnect(); click.disconnect() }
}
