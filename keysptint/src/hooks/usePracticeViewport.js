import { useLayoutEffect, useState } from 'react'

// Mobile keyboards often resize the visual viewport without changing CSS vh.
// Keep the practice workspace inside the part of the page the learner can see.
export default function usePracticeViewport(enabled) {
  const [viewport, setViewport] = useState(null)

  useLayoutEffect(() => {
    if (!enabled) return
    const visual = window.visualViewport
    let frame

    function measure() {
      // Preserve normal browser zoom and panning for accessibility.
      if (visual && Math.abs(visual.scale - 1) > 0.05) return
      const height = Math.round(visual?.height || window.innerHeight)
      const top = Math.round(visual?.offsetTop || 0)
      setViewport((previous) =>
        previous?.height === height && previous?.top === top ? previous : { height, top },
      )
    }

    function scheduleMeasure() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('resize', scheduleMeasure)
    visual?.addEventListener('resize', scheduleMeasure)
    visual?.addEventListener('scroll', scheduleMeasure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', scheduleMeasure)
      visual?.removeEventListener('resize', scheduleMeasure)
      visual?.removeEventListener('scroll', scheduleMeasure)
    }
  }, [enabled])

  return {
    style:
      enabled && viewport
        ? {
            '--practice-height': `${viewport.height}px`,
            '--practice-top': `${viewport.top}px`,
          }
        : undefined,
    compact: enabled && viewport?.height < 520,
    tight: enabled && viewport?.height < 300,
  }
}
