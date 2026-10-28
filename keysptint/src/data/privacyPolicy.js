export const privacyContactEmail = 'khkh7561@gmail.com'
export const privacyUpdatedOn = '2026-10-28'

// These disclosures describe the web implementation in this repository.
// Review the Android app's permissions and SDKs before extending this scope.
export const privacySections = [
  {
    id: 'scope',
    title: '1. About this policy',
    paragraphs: [
      'This Privacy Policy explains how the KeySprint website handles information when you practice English, play typing challenges, browse lessons, and change your settings.',
      'This policy describes the web version currently available. A separate Android release may have different permissions or services; its privacy disclosures will be reviewed before it is published on Google Play.',
    ],
  },
  {
    id: 'practice-data',
    title: '2. Your practice and settings',
    paragraphs: [
      'KeySprint does not require an account or ask you to enter your name, email address, phone number, or payment information to use its learning features.',
      'When you complete or finish a session, KeySprint stores its result in your browser: the practice mode, difficulty, words per minute, accuracy, mistake count, duration, score, rounds completed, session date, and a locally generated session identifier. Timed sessions also include their selected time limit; Word rush results include the number of missed words.',
      'The website also stores your light or dark theme, whether mechanical keyboard sounds are enabled, and whether the desktop keyboard visualization is shown. These settings and results are used to display your progress and remember your preferences.',
      'Text entered in a typing exercise or quiz is processed within the page to check your answer. The current website does not send that text to a server or save the text as part of your session history.',
    ],
  },
  {
    id: 'storage',
    title: '3. Browser storage and cookies',
    paragraphs: [
      'Practice results and preferences are kept in localStorage on the browser and device you are using. They are not synced to an account or uploaded to a KeySprint database by this website.',
      'KeySprint uses the storage entries keysprint-history for your most recent session results and keysprint-settings for your preferences. The current application code does not set advertising or analytics cookies.',
      'If browser storage is blocked or unavailable, you can still practice, but results and preferences may not persist after you leave.',
    ],
  },
  {
    id: 'network',
    title: '4. Network requests and hosting',
    paragraphs: [
      'Your browser requests the website, its assets, and its lesson files from the server hosting KeySprint. Like other websites, these connections expose technical request information, such as your IP address, browser information, and requested resource, to the hosting infrastructure.',
      'The website does not intentionally attach your locally saved practice history, preferences, or exercise answers to these requests. Any infrastructure logs are handled by the hosting provider; the application code does not specify their retention period.',
    ],
  },
  {
    id: 'third-parties',
    title: '5. Advertising, analytics, and sharing',
    paragraphs: [
      'The current KeySprint web application does not include advertising SDKs, analytics trackers, social login, or third-party word lookup services. Lesson content is served with the website.',
      'KeySprint does not sell your locally stored practice information or transmit it to advertisers through the current application. Ordinary hosting connections are described above.',
      'The Google Play coming-soon notice is an announcement. It does not sign you up for a service or send your practice data to Google Play.',
    ],
  },
  {
    id: 'permissions',
    title: '6. Keyboard sound and device permissions',
    paragraphs: [
      'The optional mechanical keyboard sound is generated locally using your browser audio features. It does not record sound or require microphone access.',
      'The current website does not request your camera, contacts, precise location, or access to files on your device. Keyboard input is used within the active practice field to run the exercise and, when enabled, play a key sound.',
    ],
  },
  {
    id: 'retention-deletion',
    title: '7. Retention and deleting your data',
    paragraphs: [
      'KeySprint retains up to 100 of your most recent session results in this browser. Older results are replaced as newer sessions are saved. Preferences remain until you change them or remove the saved site data.',
      'To delete your saved results and preferences, open your browser settings, locate the site data or storage for this website, and clear it. This resets your progress and settings on that browser. You can also use browser controls to block storage.',
      'Because the current website has no user accounts or server-side practice database, there is no KeySprint account to delete and no server-side copy of your local practice history to recover. Data stored in another browser or device must be cleared there separately.',
    ],
  },
  {
    id: 'security',
    title: '8. Keeping information safe',
    paragraphs: [
      'The application limits saved practice information to the results and preferences described above. Local browser storage is not a private account or an encrypted vault; other people using the same browser profile may be able to view your progress.',
      'Use browser and device security controls appropriate to a shared device. No website or storage system can guarantee absolute security.',
    ],
  },
  {
    id: 'children',
    title: '9. Younger learners',
    paragraphs: [
      'KeySprint provides English practice without requiring a personal profile. The current website does not ask children to submit personal contact details and does not provide public profiles, messaging, or a public leaderboard.',
      'A parent or guardian can manage or remove locally stored progress through the browser site-data controls described above.',
    ],
  },
  {
    id: 'changes',
    title: '10. Changes to this policy',
    paragraphs: [
      'If KeySprint changes how it handles information, this page will be updated and its last-updated date will change. New services, accounts, advertising, analytics, or Android-specific data handling will need their own accurate disclosures before they are introduced.',
    ],
  },
]
