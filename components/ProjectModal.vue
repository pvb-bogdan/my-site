<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="fixed inset-0 z-[100] bg-white dark:bg-gray-900 overflow-y-auto"
      >
        <!-- Close Button -->
        <button
          ref="closeButtonRef"
          type="button"
          @click="closeModal"
          class="fixed z-50 p-3 transition-colors bg-gray-200 rounded-full shadow-lg top-6 right-6 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
          :aria-label="t('aria.closeModal')"
        >
          <Icon name="lucide:x" class="w-6 h-6 text-gray-700 dark:text-gray-300" aria-hidden="true" />
        </button>

        <!-- Modal Content -->
        <div class="container px-6 py-20 mx-auto">
          <!-- Project Header -->
          <div v-if="project" class="max-w-4xl mb-12">
            <h2 :id="titleId" class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl dark:text-gray-100">
              {{ project.title }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-600/20 dark:text-blue-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Image Slider -->
          <div v-if="project" class="mb-16">
            <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl group">
              <div
                ref="carouselRef"
                class="flex w-full h-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
                style="-webkit-overflow-scrolling: touch;"
                @scroll="onScroll"
              >
                <template v-if="project.images && project.images.length > 0">
                  <div
                    v-for="(image, imageIndex) in project.images"
                    :key="image + imageIndex"
                    class="flex-shrink-0 w-full h-full snap-start"
                  >
                    <NuxtImg
                      :src="image"
                      :alt="t('modal.imageAlt', { title: project.title, num: imageIndex + 1, total: project.images.length })"
                      width="1280"
                      height="720"
                      loading="lazy"
                      class="object-cover w-full h-full transition-opacity duration-300"
                    />
                  </div>
                </template>
                <div v-else class="flex items-center justify-center w-full h-full text-2xl font-semibold text-white">
                  {{ project.title }}
                </div>
              </div>

              <!-- Prev / Next Buttons (desktop only) -->
              <template v-if="project.images && project.images.length > 1">
                <button
                  type="button"
                  @click="scrollToSlide(currentImageIndex - 1)"
                  :disabled="currentImageIndex === 0"
                  class="absolute items-center justify-center hidden w-10 h-10 text-white transition-all -translate-y-1/2 rounded-full left-4 top-1/2 md:flex bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  :aria-label="t('aria.previousImage')"
                >
                  <Icon name="lucide:chevron-left" class="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  @click="scrollToSlide(currentImageIndex + 1)"
                  :disabled="currentImageIndex === project.images.length - 1"
                  class="absolute items-center justify-center hidden w-10 h-10 text-white transition-all -translate-y-1/2 rounded-full right-4 top-1/2 md:flex bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  :aria-label="t('aria.nextImage')"
                >
                  <Icon name="lucide:chevron-right" class="w-5 h-5" aria-hidden="true" />
                </button>
              </template>

              <!-- Image Counter -->
              <div
                v-if="project.images && project.images.length > 1"
                class="absolute px-3 py-1 text-sm font-medium text-white rounded-full bottom-4 right-4 bg-black/50"
              >
                {{ currentImageIndex + 1 }} / {{ project.images.length }}
              </div>
            </div>

            <!-- Image Dots Navigation -->
            <div v-if="project.images && project.images.length > 1" class="flex justify-center mt-4">
              <!-- Each dot keeps its 8px visual but gets a 24px+ hit area through padding -->
              <button
                v-for="(image, index) in project.images"
                :key="'dot-' + index"
                type="button"
                class="p-2 rounded-full group/dot focus-visible:outline-2 focus-visible:outline-blue-500"
                :aria-label="t('aria.viewImage', { num: index + 1 })"
                :aria-current="currentImageIndex === index ? 'true' : undefined"
                @click="scrollToSlide(index)"
              >
                <span
                  :class="[
                    'block h-2 rounded-full transition-all',
                    currentImageIndex === index
                      ? 'bg-blue-600 dark:bg-sky-400 w-8'
                      : 'bg-gray-300 dark:bg-gray-700 group-hover/dot:bg-gray-400 dark:group-hover/dot:bg-gray-600 w-2'
                  ]"
                ></span>
              </button>
            </div>
            <!-- Swipe hint for mobile -->
            <p class="mt-4 text-sm text-center text-gray-600 md:hidden dark:text-gray-400">
              ← {{ t('modal.swipe') }} →
            </p>
          </div>

          <!-- Two Column Layout -->
          <div v-if="project" class="grid gap-12 md:grid-cols-3">
            <!-- Main Content -->
            <div class="space-y-12 md:col-span-2">
              <!-- Project Details -->
              <div>
                <h3 class="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {{ t('modal.aboutProject') }}
                </h3>
                <p class="mb-6 text-xl leading-relaxed text-gray-600 dark:text-gray-400">
                  {{ project.description }}
                </p>
                <p v-if="project.fullDescription" class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {{ project.fullDescription }}
                </p>
              </div>

              <!-- Client Testimonial -->
              <div v-if="project.testimonial" class="p-8 border-l-4 border-blue-600 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                <p class="mb-6 text-xl italic text-gray-700 dark:text-gray-300">
                  "{{ project.testimonial.quote }}"
                </p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center justify-center text-xl font-bold text-white bg-blue-600 rounded-full w-14 h-14">
                    {{ project.testimonial.author.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ project.testimonial.author }}
                    </p>
                    <p class="text-gray-600 dark:text-gray-400">
                      {{ project.testimonial.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-8">
              <!-- Action Buttons -->
              <div class="space-y-4">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-full gap-2 px-6 py-4 font-semibold text-white transition-colors duration-200 transform bg-blue-600 shadow-lg hover:bg-blue-700 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  <Icon name="lucide:external-link" class="w-5 h-5" aria-hidden="true" />
                  {{ t('modal.viewSite') }}
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-full gap-2 px-6 py-4 font-semibold text-white transition-colors duration-200 transform bg-gray-800 shadow-lg hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  <Icon name="simple-icons:github" class="w-5 h-5" aria-hidden="true" />
                  {{ t('modal.viewGithub') }}
                </a>
              </div>

              <!-- Technologies Used -->
              <div v-if="project.technologies && project.technologies.length > 0">
                <h3 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {{ t('modal.technologies') }}
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="p-3 font-medium text-center text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                  >
                    {{ tech }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount, useId } from 'vue'

const { t } = useI18n()
const titleId = useId()

interface Testimonial {
  quote: string
  author: string
  role: string
}

interface Project {
  title: string
  description: string
  fullDescription?: string
  tags: string[]
  category: string
  images?: string[]
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  testimonial?: Testimonial
}

const props = defineProps<{
  isOpen: boolean
  project: Project | null
}>()

const emit = defineEmits<{
  close: []
}>()

const currentImageIndex = ref(0)
const carouselRef = ref<HTMLElement | null>(null)
const dialogRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLElement | null>(null)
// The element that opened the dialog, so focus can return to it on close
let returnFocusTarget: HTMLElement | null = null

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const closeModal = () => {
  emit('close')
}

const scrollToSlide = (index: number) => {
  currentImageIndex.value = index
  nextTick(() => {
    const container = carouselRef.value
    if (!container) return
    const card = container.children[index] as HTMLElement
    if (card) {
      card.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })
    }
  })
}

// Update currentImageIndex on scroll (for snap sync)
const onScroll = () => {
  const container = carouselRef.value
  if (!container) return
  const children = Array.from(container.children) as HTMLElement[]
  const scrollLeft = container.scrollLeft
  let minDiff = Infinity
  let closest = 0
  children.forEach((child, idx) => {
    const diff = Math.abs(child.offsetLeft - scrollLeft)
    if (diff < minDiff) {
      minDiff = diff
      closest = idx
    }
  })
  currentImageIndex.value = closest
}

// Reset image index when project changes
watch(() => props.project, () => {
  currentImageIndex.value = 0
})

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Keep Tab / Shift+Tab inside the dialog
const trapFocus = (event: KeyboardEvent) => {
  const dialog = dialogRef.value
  if (!dialog) return
  const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => element.offsetParent !== null || element === closeButtonRef.value)
  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const focusIsOutside = !dialog.contains(document.activeElement)

  if (event.shiftKey && (document.activeElement === firstElement || focusIsOutside)) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && (document.activeElement === lastElement || focusIsOutside)) {
    event.preventDefault()
    firstElement.focus()
  }
}

// The listener lives at module scope so the exact same function can be removed
// again (a watcher's return value is ignored by Vue).
const handleKeydown = (event: KeyboardEvent) => {
  const imageCount = props.project?.images?.length ?? 0

  if (event.key === 'Escape') {
    closeModal()
  } else if (event.key === 'Tab') {
    trapFocus(event)
  } else if (event.key === 'ArrowLeft' && currentImageIndex.value > 0) {
    event.preventDefault()
    scrollToSlide(currentImageIndex.value - 1)
  } else if (event.key === 'ArrowRight' && currentImageIndex.value < imageCount - 1) {
    event.preventDefault()
    scrollToSlide(currentImageIndex.value + 1)
  }
}

const detachModalListeners = () => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
}

watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    returnFocusTarget = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
    await nextTick()
    closeButtonRef.value?.focus()
  } else {
    detachModalListeners()
    returnFocusTarget?.focus()
    returnFocusTarget = null
  }
})

onBeforeUnmount(detachModalListeners)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Hide only the carousel's horizontal scrollbar; the dialog keeps its vertical one */
.hide-scrollbar {
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
