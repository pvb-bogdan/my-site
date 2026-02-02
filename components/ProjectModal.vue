<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] bg-white dark:bg-gray-900 overflow-y-auto"
      >
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="fixed z-50 p-3 transition-colors bg-gray-200 rounded-full shadow-lg top-6 right-6 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Modal Content -->
        <div class="container px-6 py-20 mx-auto">
          <!-- Project Header -->
          <div class="max-w-4xl mb-12">
            <h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl dark:text-gray-100">
              {{ project.title }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-600/20 dark:text-indigo-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Image Slider -->
          <div class="mb-16">
            <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl group">
              <img
                v-if="project.images && project.images.length > 0"
                :src="project.images[currentImageIndex]"
                :alt="project.title"
                class="object-cover w-full h-full transition-opacity duration-300"
              />
              <div v-else class="flex items-center justify-center w-full h-full text-2xl font-semibold text-white">
                {{ project.title }}
              </div>

              <!-- Previous Button -->
              <button
                v-if="project.images && project.images.length > 1"
                @click="previousImage"
                class="absolute p-3 text-white transition-all -translate-y-1/2 rounded-full opacity-0 left-4 top-1/2 bg-black/50 hover:bg-black/70 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Next Button -->
              <button
                v-if="project.images && project.images.length > 1"
                @click="nextImage"
                class="absolute p-3 text-white transition-all -translate-y-1/2 rounded-full opacity-0 right-4 top-1/2 bg-black/50 hover:bg-black/70 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image Counter -->
              <div
                v-if="project.images && project.images.length > 1"
                class="absolute px-3 py-1 text-sm font-medium text-white rounded-full bottom-4 right-4 bg-black/50"
              >
                {{ currentImageIndex + 1 }} / {{ project.images.length }}
              </div>
            </div>

            <!-- Image Dots Navigation -->
            <div v-if="project.images && project.images.length > 1" class="flex justify-center gap-2 mt-6">
              <button
                v-for="(image, index) in project.images"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'h-2 rounded-full transition-all',
                  currentImageIndex === index
                    ? 'bg-indigo-600 dark:bg-indigo-400 w-8'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 w-2'
                ]"
                :aria-label="`View image ${index + 1}`"
              />
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="grid gap-12 md:grid-cols-3">
            <!-- Main Content -->
            <div class="space-y-12 md:col-span-2">
              <!-- Project Details -->
              <div>
                <h3 class="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  About the Project
                </h3>
                <p class="mb-6 text-xl leading-relaxed text-gray-600 dark:text-gray-400">
                  {{ project.description }}
                </p>
                <p v-if="project.fullDescription" class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {{ project.fullDescription }}
                </p>
              </div>

              <!-- Client Testimonial -->
              <div v-if="project.testimonial" class="p-8 border-l-4 border-indigo-600 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20">
                <p class="mb-6 text-xl italic text-gray-700 dark:text-gray-300">
                  "{{ project.testimonial.quote }}"
                </p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center justify-center text-xl font-bold text-white bg-indigo-600 rounded-full w-14 h-14">
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
                  class="flex items-center justify-center w-full gap-2 px-6 py-4 font-semibold text-white transition-colors duration-200 transform bg-indigo-600 shadow-lg hover:bg-indigo-700 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {{ t('portfolio.livePreview') }}
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-full gap-2 px-6 py-4 font-semibold text-white transition-colors duration-200 transform bg-gray-800 shadow-lg hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  {{ t('portfolio.sourceCode') }}
                </a>
              </div>

              <!-- Technologies Used -->
              <div v-if="project.technologies && project.technologies.length > 0">
                <h3 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {{ t('portfolio.technologies') }}
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="p-3 font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300"
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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const closeModal = () => {
  emit('close')
}

const nextImage = () => {
  if (props.project?.images && props.project.images.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.project.images.length
  }
}

const previousImage = () => {
  if (props.project?.images && props.project.images.length > 0) {
    currentImageIndex.value = currentImageIndex.value === 0
      ? props.project.images.length - 1
      : currentImageIndex.value - 1
  }
}

// Reset image index when project changes
watch(() => props.project, () => {
  currentImageIndex.value = 0
})

// Handle ESC key to close modal and arrow keys for navigation
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') previousImage()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    }
  } else {
    document.body.style.overflow = ''
  }
})
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

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
