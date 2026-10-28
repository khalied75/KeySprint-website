import { useEffect } from 'react'
import { Link } from 'react-router'
import Icon from '../components/Icon'
import {
  privacyContactEmail,
  privacySections,
  privacyUpdatedOn,
} from '../data/privacyPolicy'

export default function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Privacy Policy — KeySprint'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-600"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" />
        Back to practice
      </Link>

      <header className="mb-8">
        <p className="eyebrow mb-3">KEYSPRINT · YOUR INFORMATION</p>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm leading-7 text-slate-400">
          Last updated: <time dateTime={privacyUpdatedOn}>October 28, 2026</time>
        </p>
      </header>

      <article className="panel p-5 sm:p-8 md:p-10">
        <p className="mb-8 rounded-xl bg-violet-50 p-5 text-sm leading-7 text-violet-700">
          Your practice history stays in this browser. No account is required, and
          keyboard sounds are generated on your device without recording audio.
        </p>

        <div className="space-y-8">
          {privacySections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="mb-3 text-lg font-bold">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-7 text-slate-500">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className="mb-3 text-lg font-bold">
              11. Contact
            </h2>
            {privacyContactEmail ? (
              <p className="text-sm leading-7 text-slate-500">
                For privacy questions about KeySprint, contact{' '}
                <a
                  href={`mailto:${privacyContactEmail}`}
                  className="break-all font-semibold text-violet-600 underline underline-offset-4"
                >
                  {privacyContactEmail}
                </a>
                .
              </p>
            ) : (
              <p className="text-sm leading-7 text-slate-500">
                Developer privacy contact details for the Android release will be
                published before KeySprint becomes available on Google Play.
              </p>
            )}
          </section>
        </div>
      </article>
    </div>
  )
}
