<template>
  <section id="portfolio" class="px-6 py-20 bg-gray-100 dark:bg-gray-800/50">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold md:text-5xl">Portfolio</h2>
        <p class="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-400">
          A selection of recent projects showcasing my work
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
      <div class="masonry-container">
        <div
          v-for="project in filteredProjects"
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
import { ref, computed } from 'vue'
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
  { label: 'All', value: 'all' },
  { label: 'Web Design', value: 'webdesign' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Graphics', value: 'graphics' }
]

const activeFilter = ref('all')
const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return props.projects
  }
  return props.projects.filter(project => project.category === activeFilter.value)
})

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
</style>