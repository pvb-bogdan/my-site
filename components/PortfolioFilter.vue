<template>
  <!-- Sticky inside #portfolio only, so it appears with the grid and leaves with the section -->
  <div class="portfolio-filter sticky z-30 flex justify-center mb-8 pointer-events-none">
    <div
      class="filter-material relative max-w-full p-1 rounded-full pointer-events-auto"
      :class="{ 'fade-start': canScrollStart, 'fade-end': canScrollEnd }"
    >
      <div
        ref="scrollerRef"
        class="relative flex gap-1 overflow-x-auto rounded-full scrollbar-hide snap-x snap-proximity"
        role="radiogroup"
        :aria-label="label"
        @scroll.passive="updateScrollFades"
      >
        <!-- One thumb slides under the active segment (measured from the segment's box) -->
        <span
          class="filter-thumb absolute top-0 left-0 bg-blue-600 rounded-full shadow-sm"
          :class="{ 'is-ready': isThumbReady }"
          :style="thumbStyle"
          aria-hidden="true"
        ></span>

        <button
          v-for="(option, index) in options"
          :key="option.value"
          :ref="(element) => setSegmentRef(index, element)"
          type="button"
          role="radio"
          :aria-checked="modelValue === option.value"
          :tabindex="modelValue === option.value ? 0 : -1"
          class="filter-segment pressable relative z-10 flex items-center flex-shrink-0 gap-2 px-4 text-sm font-semibold rounded-full min-h-11 snap-start whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-2"
          :class="modelValue === option.value
            ? 'is-active text-white'
            : 'text-gray-700 hover:text-gray-950 hover:bg-gray-900/5 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/10'"
          @click="selectOption(option.value)"
          @keydown="handleSegmentKeydown($event, index)"
        >
          <Icon :name="option.icon" class="w-4 h-4" aria-hidden="true" />
          <span>{{ option.label }}</span>
          <span
            class="text-xs tabular-nums"
            :class="modelValue === option.value ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'"
          >{{ option.count }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type ComponentPublicInstance } from 'vue'

export interface FilterOption {
  value: string
  label: string
  icon: string
  count: number
}

const props = defineProps<{
  modelValue: string
  options: FilterOption[]
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const scrollerRef = ref<HTMLElement | null>(null)
const segmentRefs: HTMLElement[] = []
const thumbOffset = ref(0)
const thumbWidth = ref(0)
const thumbHeight = ref(0)
// The thumb starts without a transition so it doesn't slide in from 0 on first paint
const isThumbReady = ref(false)
const canScrollStart = ref(false)
const canScrollEnd = ref(false)
let resizeObserver: ResizeObserver | null = null

const setSegmentRef = (index: number, element: Element | ComponentPublicInstance | null) => {
  if (element instanceof HTMLElement) {
    segmentRefs[index] = element
  }
}

const thumbStyle = computed(() => ({
  width: `${thumbWidth.value}px`,
  height: `${thumbHeight.value}px`,
  transform: `translateX(${thumbOffset.value}px)`
}))

const activeIndex = computed(() => props.options.findIndex((option) => option.value === props.modelValue))

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const updateScrollFades = () => {
  const scroller = scrollerRef.value
  if (!scroller) return
  // 1px tolerance: scroll positions can be fractional on high-DPI screens
  canScrollStart.value = scroller.scrollLeft > 1
  canScrollEnd.value = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1
}

const measureThumb = () => {
  const activeSegment = segmentRefs[activeIndex.value]
  if (!activeSegment) return
  // offsetLeft is relative to the scroller (its offsetParent), so the thumb scrolls with the segments
  thumbOffset.value = activeSegment.offsetLeft
  thumbWidth.value = activeSegment.offsetWidth
  thumbHeight.value = activeSegment.offsetHeight
}

// Keep the active segment visible when the pill scrolls horizontally on small screens
const revealActiveSegment = () => {
  const scroller = scrollerRef.value
  const activeSegment = segmentRefs[activeIndex.value]
  if (!scroller || !activeSegment) return
  const segmentStart = activeSegment.offsetLeft
  const segmentEnd = segmentStart + activeSegment.offsetWidth
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

  if (segmentStart < scroller.scrollLeft) {
    scroller.scrollTo({ left: segmentStart - 8, behavior })
  } else if (segmentEnd > scroller.scrollLeft + scroller.clientWidth) {
    scroller.scrollTo({ left: segmentEnd - scroller.clientWidth + 8, behavior })
  }
}

const selectOption = (value: string) => {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}

// Radio-group keyboard pattern: arrows move (and select), Home/End jump to the ends
const handleSegmentKeydown = (event: KeyboardEvent, index: number) => {
  const lastIndex = props.options.length - 1
  let nextIndex: number | null = null

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    nextIndex = index === lastIndex ? 0 : index + 1
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    nextIndex = index === 0 ? lastIndex : index - 1
  } else if (event.key === 'Home') {
    nextIndex = 0
  } else if (event.key === 'End') {
    nextIndex = lastIndex
  }

  if (nextIndex === null) return
  event.preventDefault()
  selectOption(props.options[nextIndex].value)
  nextTick(() => segmentRefs[nextIndex]?.focus())
}

watch(() => [props.modelValue, props.options.map((option) => option.label).join()], async () => {
  await nextTick()
  measureThumb()
  revealActiveSegment()
  updateScrollFades()
})

onMounted(() => {
  measureThumb()
  updateScrollFades()
  requestAnimationFrame(() => {
    isThumbReady.value = true
  })

  if (scrollerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      measureThumb()
      updateScrollFades()
    })
    resizeObserver.observe(scrollerRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.portfolio-filter {
  /* Sits 0.5rem below the fixed header; --header-height is published by HeaderNav */
  top: calc(var(--header-height, 80px) + 0.5rem);
}

/* Translucent pill: heavier than the page, lighter than the header */
.filter-material {
  background-color: rgb(255 255 255 / 0.7);
  border: 1px solid rgb(255 255 255 / 0.4);
  box-shadow: 0 8px 24px -12px rgb(15 23 42 / 0.25), 0 1px 2px rgb(15 23 42 / 0.06);
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
}

.dark .filter-material {
  background-color: rgb(17 24 39 / 0.7);
  border-color: rgb(255 255 255 / 0.08);
  box-shadow: 0 8px 24px -12px rgb(0 0 0 / 0.6);
}

/* Fade the edge that still hides segments (only when the pill overflows) */
.filter-material.fade-end > div {
  mask-image: linear-gradient(to right, black calc(100% - 2rem), transparent);
}

.filter-material.fade-start > div {
  mask-image: linear-gradient(to left, black calc(100% - 2rem), transparent);
}

.filter-material.fade-start.fade-end > div {
  mask-image: linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent);
}

.filter-thumb.is-ready {
  transition:
    transform var(--dur-base, 250ms) var(--ease-out, cubic-bezier(0.25, 1, 0.5, 1)),
    width var(--dur-base, 250ms) var(--ease-out, cubic-bezier(0.25, 1, 0.5, 1));
}

.filter-segment {
  transition: color var(--dur-fast, 150ms) ease-out, background-color var(--dur-fast, 150ms) ease-out;
}

/* Reduced motion: no sliding thumb; the active segment cross-fades its own background */
@media (prefers-reduced-motion: reduce) {
  .filter-thumb {
    display: none;
  }

  .filter-segment {
    transition: color 150ms ease-out, background-color 150ms ease-out !important;
  }

  .filter-segment.is-active {
    background-color: rgb(37 99 235);
  }
}

@media (prefers-reduced-transparency: reduce) {
  .filter-material {
    background-color: rgb(255 255 255);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .dark .filter-material {
    background-color: rgb(17 24 39);
  }
}

@media (prefers-contrast: more) {
  .filter-material {
    background-color: rgb(255 255 255);
    border-color: rgb(55 65 81);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .dark .filter-material {
    background-color: rgb(17 24 39);
    border-color: rgb(209 213 219);
  }
}
</style>
