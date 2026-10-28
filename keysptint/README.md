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
  index.css               Tailwind and stylesheet imports
  styles/                 Theme, base rules, components, dark mode, hero, responsive rules
  components/             Shared UI, Google Play notice, learning cards, vocabulary explorer
    challenge/            Difficulty, time limit, word filters
    games/                Game challenge picker
    home/                 Hero, practice mode picker, progress summary
    practice/             Session header, score, metrics, exercise, input, result
  pages/                  Home, Games, Practice, Learn, Progress, About
  hooks/useTraining.js    Typing, timers, rounds, and session state
  context/SettingsContext.jsx Theme and keyboard sound preferences
  server/api.js           Loads local JSON; no backend required
  data/modes.js           Practice modes, games, and categories
  utils/                  Typing comparison, game helpers, browser storage
public/public json/
  words.json              Words by difficulty and category (original data)
  sentences.json          Sentence exercises by difficulty
  paragraphs.json         Paragraphs by difficulty
  grammar.json            Grammar lessons and mini quizzes
  content-stats.json      Library totals and counts per difficulty
public/favicon.svg        Lightweight brand icon
scripts/expand-content.mjs Repeatable content expansion; preserves existing entries
tests/training.test.js     Content, game, filter, typing, and storage checks
```

## Pages and behavior

- `/`: choose letters, words, sentences, or paragraphs, with three difficulty levels. Word mode supports category, length, and starting-letter filters.
- `/practice`: type an exercise and see live WPM, accuracy, mistakes, and elapsed time. Correct errors to complete the passage. Pasting is disabled during training.
- `/games`: timed sentence sprint, three-life sentence survival, Word rush, flash recall (3-second preview, 5 words), word detective (first/last letter and category clues, 5 words), and letter scramble. Sprint and scramble offer a 5–60 second slider; Word rush offers 10–60 seconds. Timers begin on the first keystroke.
- `/learn`: grammar explanations, examples, quizzes, and a searchable vocabulary library with pagination. Sentence typing uses the general sentence library rather than lesson-specific exercises.
- `/progress`: latest 100 completed or manually finished sessions, saved in localStorage on the current browser/device when available.
- `/about`: practice overview, links to all six games, scoring details, privacy notes, and a Google Play coming-soon notice. The notice also appears on the homepage and does not link to an unreleased listing. Unknown routes show a recovery page.
- `/settings`: dark mode and mechanical keyboard sound switches. Preferences are saved locally. The initial theme follows the operating system unless a theme was saved. Keyboard sound defaults to off and uses locally synthesized Web Audio in the practice/game input, including mobile text input; no audio asset or microphone permission is required.

### Word rush

Catch the displayed word before its right edge reaches the deadline. A complete, case-insensitive match is caught automatically without pressing Enter. Each successful catch increases speed by reducing travel time by 8%, down to a 2.2-second minimum. Difficulty controls the initial travel time (easy: 8 seconds, medium: 6.5 seconds, hard: 5.2 seconds).

Missing a word costs one of three lives and resets the combo; submitting a wrong guess counts as a mistake but does not spend a life. The run ends at zero lives, the selected time limit, or a manual finish. Results appear in My progress. Keyboard sounds and word filters work as in other word games. Reduced-motion users get a stationary word with a deadline progress indicator.

The feature is split into `components/word-rush/`, `hooks/useWordRush.js`, `utils/wordRush.js`, and `styles/word-rush.css`. Pure engine tests cover catches, speed, missed deadlines, delayed browser frames, time limits, and restarts.

Mobile browsing pages use a two-row navigation header, touch-sized controls, wrapping cards, and readable input sizes. During practice, the site navigation and footer are hidden on small screens to leave room for the exercise and keyboard; the session header still provides back and restart controls. The workspace follows the visual viewport when the software keyboard opens, keeps the typing input below the exercise, and reduces stats in short viewports. Long exercise text scrolls independently and follows the current character. Word rush uses the same compact workspace. Dark mode applies to all routes, cards, fields, tables, and notices.

WPM uses five correct keystrokes per word. In standard typing modes, accuracy uses entered keystrokes, including corrected mistakes. In recall/detective modes, each wrong guess counts as one mistake and correct answers contribute their letter count. Results from these games therefore measure different skills from ordinary typing.

Library totals are calculated directly from the current words, sentences, paragraphs, and grammar files. Vocabulary totals count entries across all levels and categories. Refresh the page after editing lesson JSON to load the latest data. All lesson files ship with the site; there is no external word API or account requirement. This does not install a service worker for offline reloads.

`npm run content:stats` refreshes the `content-stats.json` snapshot without changing any lessons. It also runs automatically before development, production builds, and tests. The UI calculates totals from lesson data instead of relying on this snapshot.

To rebuild the expanded content, run `node scripts/expand-content.mjs`. The script keeps existing entries, merges level-specific vocabulary and topical passages, removes duplicates, and updates library statistics. Paragraphs use linked sentences from the same topic, with variations in introductions and reflections.

## Deployment

Firebase Hosting security headers are configured for every path in `firebase.json`, while preserving the React Router fallback to `/index.html`. The CSP allows scripts, stylesheets, fonts, and lesson requests from this site's origin, blocks inline JavaScript, objects, workers, and frames, and prevents the page from being embedded. Inline style attributes remain allowed for React's progress bars, moving words, keyboard keys, and viewport sizing; inline stylesheet blocks are not enabled. Keyboard audio uses Web Audio and does not need microphone access.

The configuration also sets HSTS (one year, without subdomain/preload opt-ins), MIME sniffing protection, a referrer policy, permissions restrictions for unused device features, and same-origin opener/resource policies. Firebase controls the HSTS value on its default `web.app`/`firebaseapp.com` domains; the configured value applies to custom domains. See [Firebase Hosting header configuration](https://firebase.google.com/docs/hosting/full-config#headers) and [CSP style attributes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr).

Build with `npm run build`, then deploy from this folder with `firebase deploy --only hosting` to activate these headers on the hosted site. Vite development/preview servers do not use Firebase's header configuration. After deployment, inspect the document response headers on the live site; production header delivery has not been verified locally. If external SDKs, analytics, fonts, or embeds are added later, review their required origins before changing the CSP.

The footer links to `/privacy-policy`. Policy content and the privacy contact email live in `src/data/privacyPolicy.js`. The current policy describes this web implementation. Before using its deployed public URL in Google Play Console, review the Android build's permissions, SDKs, advertising, analytics, data handling, and developer details; update the policy to match the released app. The host must serve this route publicly without authentication.

`npm run build` outputs `dist/`. Configure your static host to rewrite unknown application paths to `/index.html` so React Router deep links work. For a subdirectory deployment, configure Vite's `base` and BrowserRouter's `basename` together. The default assumes deployment at the domain root.

## Code formatting and navigation

Additional grammar lessons and sentence exercises are authored in `scripts/content/grammar-lessons.json` and `scripts/content/sentence-exercises.json`. Run `npm run content:add-lessons` to merge these into the public library and refresh statistics. Existing lesson IDs keep their current content, and repeated runs do not duplicate lessons or sentences. The script leaves words and paragraphs unchanged. Each added grammar lesson includes four examples and a multiple-choice question; its examples are also added to sentence typing at the matching difficulty.

The typing field includes a visual QWERTY keyboard on desktop and tablet screens (at least 768px; no mouse or hover capability required). Its settings toggle is only shown at those widths, and the preference remains saved when resizing to a phone screen. It highlights physical keys while held, including Shift combinations, and clears highlights on release or focus loss. It is a visual guide, not an extra input method. The keyboard stays hidden on phones and temporarily hides in compact touch practice viewports to leave space for the native keyboard. Layout data, pressed-key tracking, and styling live in `data/keyboardLayout.js`, `hooks/usePressedKeys.js`, and `styles/keyboard.css`.

Page files coordinate state and navigation. Their UI sections live in the matching `components/home`, `components/games`, and `components/practice` folders. `hooks/useTraining.js` owns session behavior; `utils/trainingDisplay.js` owns prompt labels and character highlighting. Keep new UI in the relevant folder rather than extending a page with unrelated sections.

Run `npm run format` to format source files, tests, and scripts with Prettier. Run `npm run format:check` to check formatting without changing files. The formatter skips lesson JSON, build output, dependencies, and the lockfile.

## Verification

`npm test` checks all data levels/categories, word filters and empty matches, game word generation, duration boundaries, scramble integrity, content uniqueness, grammar answers, library statistics, typing edits/corrections, and storage limits/failures. `npm run build` checks the production bundle. Visual browser QA must be performed separately if desktop automation is unavailable.
