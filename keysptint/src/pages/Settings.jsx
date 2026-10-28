import { Link } from 'react-router'
import { useSettings } from '../context/SettingsContext'
import { keyboardAudioSupported, playMechanicalKey } from '../utils/keyboardAudio'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'
import { KEYBOARD_SCREEN_QUERY } from '../data/keyboardLayout'

function Toggle({ checked, onChange, label, describedBy }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={`settings-switch ${checked ? 'is-on' : ''}`}
    >
      <span />
    </button>
  )
}

function SettingRow({ icon, title, descriptionId, checked, onChange, children }) {
  return (
    <div className="settings-row">
      <span className="icon-tile settings-row-icon">
        <Icon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <h2 className="settings-row-title text-base font-bold sm:text-lg">{title}</h2>
      <div className="settings-row-toggle">
        <Toggle
          label={title}
          describedBy={descriptionId}
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className="settings-row-body">{children}</div>
    </div>
  )
}

export default function Settings() {
  const { settings, updateSettings } = useSettings()
  const audioSupported = keyboardAudioSupported()
  const supportsKeyboard = useMediaQuery(KEYBOARD_SCREEN_QUERY)
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-600"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" />
        Back to practice
      </Link>
      <p className="eyebrow mb-3">MAKE YOURSELF AT HOME</p>
      <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
        Your space. Your rhythm.
      </h1>
      <p className="mb-8 text-sm leading-7 text-slate-400">
        A couple of little details to make practice feel just right.
      </p>
      <section
        className="panel divide-y divide-slate-100 px-5 sm:px-8"
        aria-label="Practice settings"
      >
        <SettingRow
          icon="moon"
          title="Dark mode"
          descriptionId="theme-description"
          checked={settings.theme === 'dark'}
          onChange={(enabled) => updateSettings({ theme: enabled ? 'dark' : 'light' })}
        >
          <p id="theme-description" className="text-sm leading-6 text-slate-400">
            A softer, darker space for your evening practice.
          </p>
          <p className="mt-3 text-xs font-semibold text-violet-500" aria-live="polite">
            {settings.theme === 'dark' ? 'Dark theme is on' : 'Light theme is on'}
          </p>
        </SettingRow>
        <SettingRow
          icon="volume"
          title="Mechanical keyboard sound"
          descriptionId="sound-description"
          checked={settings.keyboardSound}
          onChange={(enabled) => {
            updateSettings({ keyboardSound: enabled })
            if (enabled) playMechanicalKey()
          }}
        >
          <p id="sound-description" className="text-sm leading-6 text-slate-400">
            That old-school click and thock with every key you type in a practice or game
            session.
          </p>
          <p className="mt-3 text-xs font-semibold text-violet-500" aria-live="polite">
            {settings.keyboardSound ? 'Keyboard sound is on' : 'Keyboard sound is off'}
          </p>
          {settings.keyboardSound && audioSupported && (
            <button
              type="button"
              className="secondary-button mt-4"
              onClick={() => playMechanicalKey('enter')}
            >
              <Icon name="volume" className="h-4 w-4" />
              Preview sound
            </button>
          )}
          {!audioSupported && (
            <p role="status" className="mt-3 text-xs text-amber-600">
              This browser does not support keyboard audio.
            </p>
          )}
        </SettingRow>
        {supportsKeyboard && (
          <SettingRow
            icon="keyboard"
            title="Show visual keyboard"
            descriptionId="keyboard-description"
            checked={settings.showKeyboard}
            onChange={(enabled) => updateSettings({ showKeyboard: enabled })}
          >
            <p id="keyboard-description" className="text-sm leading-6 text-slate-400">
              Show the visual keyboard below the typing field on desktop and tablet. Keys
              light up as you press them. This option is hidden on phone screens.
            </p>
            <p className="mt-3 text-xs font-semibold text-violet-500" aria-live="polite">
              {settings.showKeyboard
                ? 'Visual keyboard is enabled'
                : 'Visual keyboard is hidden'}
            </p>
          </SettingRow>
        )}
      </section>
      <p className="mt-5 text-center text-xs leading-6 text-slate-400">
        Your preferences are saved in this browser when storage is available.
      </p>
    </div>
  )
}
