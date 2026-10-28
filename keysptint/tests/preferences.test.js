import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizePreferences,
  readPreferences,
  writePreferences,
  PREFERENCES_KEY,
} from '../src/utils/preferences.js'
import { keyboardAudioSupported, playMechanicalKey } from '../src/utils/keyboardAudio.js'

test('preferences use the system theme initially and validate stored options', () => {
  assert.deepEqual(normalizePreferences(null), { theme: 'light', keyboardSound: false })
  assert.deepEqual(normalizePreferences(null, true), {
    theme: 'dark',
    keyboardSound: false,
  })
  assert.deepEqual(normalizePreferences({ theme: 'light', keyboardSound: true }, true), {
    theme: 'light',
    keyboardSound: true,
  })
  assert.deepEqual(normalizePreferences({ theme: 'unknown', keyboardSound: 'true' }), {
    theme: 'light',
    keyboardSound: false,
  })
})

test('preferences persist and recover safely from corrupt or unavailable storage', () => {
  let stored = null
  globalThis.localStorage = {
    getItem: (key) => {
      assert.equal(key, PREFERENCES_KEY)
      return stored
    },
    setItem: (key, value) => {
      assert.equal(key, PREFERENCES_KEY)
      stored = value
    },
  }
  writePreferences({ theme: 'dark', keyboardSound: true })
  assert.deepEqual(readPreferences(), { theme: 'dark', keyboardSound: true })
  stored = 'broken json'
  assert.deepEqual(readPreferences(true), { theme: 'dark', keyboardSound: false })
  globalThis.localStorage = {
    getItem: () => {
      throw new Error('disabled')
    },
    setItem: () => {
      throw new Error('disabled')
    },
  }
  assert.deepEqual(readPreferences(), { theme: 'light', keyboardSound: false })
  assert.doesNotThrow(() => writePreferences({ theme: 'dark', keyboardSound: true }))
})

test('keyboard audio gracefully handles unsupported browsers', () => {
  assert.equal(keyboardAudioSupported(), false)
  assert.doesNotThrow(() => playMechanicalKey())
})

test('mechanical sound uses short bounded voices and reuses its audio context', () => {
  const voices = []
  let contexts = 0
  const parameter = () => ({
    value: 0,
    setValueAtTime() {},
    exponentialRampToValueAtTime() {},
  })
  const node = () => ({
    connect(next) {
      return next
    },
    disconnect() {},
  })
  class AudioContext {
    constructor() {
      contexts++
      this.state = 'running'
      this.currentTime = 1
      this.sampleRate = 44100
      this.destination = {}
    }
    createBuffer(_channels, length) {
      return { getChannelData: () => new Float32Array(length) }
    }
    createBiquadFilter() {
      return { ...node(), frequency: parameter(), Q: parameter() }
    }
    createGain() {
      return { ...node(), gain: parameter() }
    }
    createBufferSource() {
      const voice = {
        ...node(),
        start(time) {
          this.startTime = time
        },
        stop(time) {
          this.endTime = time
        },
      }
      voices.push(voice)
      return voice
    }
    createOscillator() {
      const voice = {
        ...node(),
        frequency: parameter(),
        start(time) {
          this.startTime = time
        },
        stop(time) {
          this.endTime = time
        },
      }
      voices.push(voice)
      return voice
    }
  }
  globalThis.window = { AudioContext }
  assert.equal(keyboardAudioSupported(), true)
  playMechanicalKey('letter')
  playMechanicalKey('space')
  playMechanicalKey('enter')
  assert.equal(contexts, 1)
  assert.equal(voices.length, 6)
  assert.ok(
    voices.every(
      (voice) => voice.endTime > voice.startTime && voice.endTime - voice.startTime < 0.1,
    ),
  )
  delete globalThis.window
})
