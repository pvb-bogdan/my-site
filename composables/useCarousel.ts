import { ref, nextTick, onBeforeUnmount, type Ref } from 'vue'

// Shared logic for scroll-snap carousels (project images, testimonials):
// scrolls to a slide and keeps the active index in sync with manual swipes.
export function useCarousel(trackRef: Ref<HTMLElement | null>) {
  const activeIndex = ref(0)
  let pendingFrame = 0

  const scrollToSlide = (index: number) => {
    const track = trackRef.value
    if (!track) return
    const clampedIndex = Math.max(0, Math.min(index, track.children.length - 1))
    activeIndex.value = clampedIndex

    nextTick(() => {
      const slide = track.children[clampedIndex] as HTMLElement | undefined
      if (!slide) return
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // Scroll only the track: scrollIntoView would also move the page vertically
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    })
  }

  const syncActiveIndex = () => {
    pendingFrame = 0
    const track = trackRef.value
    if (!track) return
    const slides = Array.from(track.children) as HTMLElement[]
    let closestIndex = 0
    let closestDistance = Infinity

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    activeIndex.value = closestIndex
  }

  // Scroll fires many times per frame; measure at most once per animation frame
  const onScroll = () => {
    if (!pendingFrame) {
      pendingFrame = requestAnimationFrame(syncActiveIndex)
    }
  }

  const reset = () => {
    activeIndex.value = 0
    if (trackRef.value) trackRef.value.scrollLeft = 0
  }

  onBeforeUnmount(() => {
    if (pendingFrame) cancelAnimationFrame(pendingFrame)
  })

  return { activeIndex, scrollToSlide, onScroll, reset }
}
