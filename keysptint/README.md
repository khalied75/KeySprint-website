# KeySprint Desktop

A desktop-first English learning and typing app using React, React Router, Vite, and Tailwind CSS 4. Smaller screens are supported too.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm test
npm run build
npm run preview
```

## Project structure

```text
src/
  App.jsx                 React Router routes
  Layout.jsx              Shared navigation, Outlet, footer
  main.jsx                React entry point
  index.css               Tailwind theme and reusable styles
  components/             Shared UI, Google Play notice, learning cards, vocabulary explorer
  pages/                  Home, Games, Practice, Learn, Progress, About
  hooks/useTraining.js    Typing, timers, rounds, and session state
  context/SettingsContext.jsx Theme and keyboard sound preferences
  server/api.js           Loads local JSON; no backend required
  data/modes.js           Practice modes, games, and categories
  utils/                  Typing comparison, game helpers, browser storage
public/public json/
  words.json              Words by difficulty and category (original data)
  sentences.json          3,276 sentence exercises
  paragraphs.json         1,104 paragraphs
  grammar.json            24 grammar lessons and mini quizzes
  content-stats.json      Library totals and counts per difficulty
public/favicon.svg        Lightweight brand icon
scripts/expand-content.mjs Repeatable content expansion; preserves existing entries
tests/training.test.js     Content, game, filter, typing, and storage checks
```

## Pages and behavior

- `/`: choose letters, words, sentences, or paragraphs, with three difficulty levels. Word mode supports category, length, and starting-letter filters.
- `/practice`: type an exercise and see live WPM, accuracy, mistakes, and elapsed time. Correct errors to complete the passage. Pasting is disabled during training.
- `/games`: timed sentence sprint, three-life sentence survival, flash recall (3-second preview, 5 words), word detective (first/last letter and category clues, 5 words), and letter scramble. Sprint and scramble offer a 5–60 second slider; their timers begin on the first keystroke. Scramble continues through words until time expires.
- `/learn`: 24 grammar explanations, examples, quizzes, and a searchable vocabulary library with pagination. Sentence typing uses the general sentence library rather than lesson-specific exercises.
- `/progress`: latest 100 completed or manually finished sessions, saved in localStorage on the current browser/device when available.
- `/about`: practice overview, links to all five games, scoring details, privacy notes, and a Google Play coming-soon notice. The notice also appears on the homepage and does not link to an unreleased listing. Unknown routes show a recovery page.
- `/settings`: dark mode and mechanical keyboard sound switches. Preferences are saved locally. The initial theme follows the operating system unless a theme was saved. Keyboard sound defaults to off and uses locally synthesized Web Audio in the practice/game input, including mobile text input; no audio asset or microphone permission is required.

Mobile layouts use a two-row navigation header, touch-sized controls, wrapping cards, readable input sizes, and responsive training screens. Dark mode applies to all routes, cards, fields, tables, and notices.

WPM uses five correct keystrokes per word. In standard typing modes, accuracy uses entered keystrokes, including corrected mistakes. In recall/detective modes, each wrong guess counts as one mistake and correct answers contribute their letter count. Results from these games therefore measure different skills from ordinary typing.

The vocabulary library contains 2,480 entries across levels and categories. All lesson files ship with the site; there is no external word API or account requirement. This does not install a service worker for offline reloads.

To rebuild the expanded content, run `node scripts/expand-content.mjs`. The script keeps existing entries, merges level-specific vocabulary and topical passages, removes duplicates, and updates library statistics. Paragraphs use linked sentences from the same topic, with variations in introductions and reflections.

## Deployment

`npm run build` outputs `dist/`. Configure your static host to rewrite unknown application paths to `/index.html` so React Router deep links work. For a subdirectory deployment, configure Vite's `base` and BrowserRouter's `basename` together. The default assumes deployment at the domain root.

## Verification

`npm test` checks all data levels/categories, word filters and empty matches, game word generation, duration boundaries, scramble integrity, content uniqueness, grammar answers, library statistics, typing edits/corrections, and storage limits/failures. `npm run build` checks the production bundle. Visual browser QA must be performed separately if desktop automation is unavailable.
