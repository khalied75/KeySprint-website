import Icon from '../Icon'

export default function HomeHero() {
  return (
    <section className="hero relative mb-8 overflow-hidden rounded-[26px] px-8 py-10 md:px-12 md:py-12">
      <div className="relative z-10 max-w-xl">
        <p className="mb-5 text-[11px] font-bold tracking-[.22em] text-violet-200">
          MAKE EVERY KEYSTROKE COUNT
        </p>
        <h2 className="mb-4 text-4xl font-extrabold tracking-[-1.6px] md:text-[50px]">
          Find your rhythm.
        </h2>
        <p className="max-w-md text-base leading-7 text-[#d0d1ed]">
          A little more confidence. A little more flow.
          <br />
          Build your English, one keystroke at a time.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-[11px] text-violet-200">
          <span className="flex items-center gap-1.5">
            <Icon name="check" className="h-3.5 w-3.5" />
            Learn by doing
          </span>
          <span>·</span>
          <span>Practice at your pace</span>
          <span>·</span>
          <span>Make it a habit</span>
        </div>
      </div>
      <div className="hero-art hidden md:block" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="floating-key key-one">A</div>
        <div className="floating-key key-two">
          a<span>→</span>
        </div>
        <div className="floating-key key-three">
          <Icon name="bolt" className="h-12 w-12" />
        </div>
        <div className="floating-key key-four">↵</div>
        <span className="spark spark-one">+</span>
        <span className="spark spark-two">✧</span>
      </div>
    </section>
  )
}
