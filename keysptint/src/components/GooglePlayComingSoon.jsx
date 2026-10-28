import Icon from './Icon'

export default function GooglePlayComingSoon() {
  return (
    <section
      className="relative overflow-hidden rounded-[22px] border border-violet-200/70 bg-[#efedfc] p-6 md:p-8"
      aria-label="KeySprint Android app coming soon"
    >
      <div className="relative flex flex-wrap items-center gap-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
          <Icon name="phone" className="h-9 w-9" />
        </span>
        <div className="min-w-0 flex-1 basis-56">
          <p className="mb-2 text-[10px] font-bold tracking-[.18em] text-violet-500">
            YOUR NEXT CHAPTER. ON THE GO.
          </p>
          <h2 className="text-xl font-bold md:text-2xl">Your rhythm, wherever you go.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            KeySprint for Android is coming soon to Google Play. Bring a little English
            practice into your everyday moments.
          </p>
        </div>
        <div
          className="flex items-center gap-3 rounded-xl bg-[#252b41] px-5 py-3 text-white"
          role="status"
        >
          <svg viewBox="0 0 28 32" className="h-8 w-7" aria-hidden="true">
            <path d="M2 2 17 16 2 30Z" fill="#65d5ee" />
            <path d="m2 2 19 11-4 3Z" fill="#65dd9b" />
            <path d="m17 16 4-3 5 3-5 3Z" fill="#ffd36c" />
            <path d="m2 30 15-14 4 3Z" fill="#fb818f" />
          </svg>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.14em] text-violet-200">
              Coming soon on
            </p>
            <p className="text-xl font-semibold leading-7">Google Play</p>
          </div>
        </div>
      </div>
    </section>
  )
}
