<template>
  <section id="portfolio" class="px-6 py-20 bg-gray-100 dark:bg-gray-800/50">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold md:text-5xl">Portofoliu</h2>
        <p class="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-400">
          O selecție de proiecte recente care prezintă munca mea
        </p>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-3 mt-8">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105',
              activeFilter === filter.value
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Masonry Layout -->
      <TransitionGroup 
        name="project" 
        tag="div" 
        class="masonry-container"
      >
        <div
          v-for="project in visibleProjects"
          :key="project.title"
          @click="openModal(project)"
          class="relative overflow-hidden transition-all duration-300 shadow-lg cursor-pointer masonry-item group rounded-xl hover:shadow-2xl"
        >
          <!-- Project Image -->
          <div class="relative overflow-hidden" :style="{ height: getRandomHeight() }">
            <img
              v-if="project.images && project.images.length > 0"
              :src="project.images[0]"
              :alt="project.title"
              class="object-cover w-full h-full"
            />
            <div 
              v-else 
              class="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600"
            ></div>
            
            <!-- Hover Overlay with Project Info -->
            <div class="absolute inset-0 flex flex-col justify-center p-6 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 group-hover:opacity-100">
              <h3 class="mb-3 text-2xl font-bold text-white">
                {{ project.title }}
              </h3>
              <p class="mb-4 text-sm leading-relaxed text-gray-200 line-clamp-3">
                {{ project.description }}
              </p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-3 py-1 text-xs font-medium text-white border rounded-full border-white/30 bg-white/10 backdrop-blur-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Show More Button -->
      <div v-if="hasMoreProjects" class="flex justify-center mt-12">
        <button
          @click="showMoreProjects"
          class="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform bg-indigo-600 shadow-lg group rounded-xl hover:shadow-xl hover:scale-105"
        >
          <span class="relative z-10 flex items-center gap-3">
            <span>Arată mai multe</span>
            <span class="px-2 py-1 text-sm rounded-lg bg-white/20">
              +{{ Math.min(LOAD_MORE_COUNT, remainingProjects) }}
            </span>
          </span>
          <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-indigo-700 to-purple-600 group-hover:opacity-100"></div>
        </button>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      :is-open="isModalOpen"
      :project="selectedProject"
      @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ProjectModal from './ProjectModal.vue'

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
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

const props = defineProps<{
  projects: Project[]
}>()

const filters = [
  { label: 'Toate', value: 'all' },
  { label: 'Web Design', value: 'webdesign' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Grafică', value: 'graphics' }
]

const INITIAL_PROJECTS = 12
const LOAD_MORE_COUNT = 8

const activeFilter = ref('all')
const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const visibleCount = ref(INITIAL_PROJECTS)

// Reset visible count when filter changes
watch(activeFilter, () => {
  visibleCount.value = INITIAL_PROJECTS
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return props.projects
  }
  return props.projects.filter(project => project.category === activeFilter.value)
})

const visibleProjects = computed(() => {
  return filteredProjects.value.slice(0, visibleCount.value)
})

const hasMoreProjects = computed(() => {
  return visibleCount.value < filteredProjects.value.length
})

const remainingProjects = computed(() => {
  return filteredProjects.value.length - visibleCount.value
})

const showMoreProjects = () => {
  visibleCount.value = Math.min(
    visibleCount.value + LOAD_MORE_COUNT,
    filteredProjects.value.length
  )
}

const openModal = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Random heights for masonry effect
const heights = ['250px', '300px', '350px', '280px', '320px', '380px']
let heightIndex = 0

const getRandomHeight = () => {
  const height = heights[heightIndex % heights.length]
  heightIndex++
  return height
}
</script>
<style scoped>
.masonry-container {
  column-count: 1;
  column-gap: 2rem;
}

@media (min-width: 640px) {
  .masonry-container {
    column-count: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-container {
    column-count: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-container {
    column-count: 4;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 2rem;
  display: inline-block;
  width: 100%;
}

.masonry-item:hover {
  transform: translateY(-4px);
}

/* TransitionGroup animations */
.project-enter-active {
  animation: projectFadeIn 0.6s ease-out forwards;
}

.project-leave-active {
  animation: projectFadeOut 0.4s ease-in forwards;
}

.project-move {
  transition: transform 0.5s ease;
}

@keyframes projectFadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes projectFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}

/* Staggered animation for initial load and show more */
.project-enter-active:nth-child(1) { animation-delay: 0ms; }
.project-enter-active:nth-child(2) { animation-delay: 50ms; }
.project-enter-active:nth-child(3) { animation-delay: 100ms; }
.project-enter-active:nth-child(4) { animation-delay: 150ms; }
.project-enter-active:nth-child(5) { animation-delay: 200ms; }
.project-enter-active:nth-child(6) { animation-delay: 250ms; }
.project-enter-active:nth-child(7) { animation-delay: 300ms; }
.project-enter-active:nth-child(8) { animation-delay: 350ms; }
</style>