<template>
  <section id="portfolio" class="py-20 px-6 bg-gray-100 dark:bg-gray-800/50">
    <div class="container mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
        <p class="text-xl max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-400">
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

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.title"
          @click="openModal(project)"
          class="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border cursor-pointer bg-white border-gray-200 hover:border-indigo-400 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-indigo-500/50 flex flex-col"
        >
          <!-- Project Image Placeholder -->
          <div class="aspect-video bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
            <img
              v-if="project.images && project.images.length > 0"
              :src="project.images[0]"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white text-lg font-semibold">View Project</span>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-2xl font-semibold mb-2 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {{ project.title }}
            </h3>
            <p class="mb-4 text-gray-600 dark:text-gray-400 flex-grow">{{ project.description }}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-300"
              >
                {{ tag }}
              </span>
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
</script>
