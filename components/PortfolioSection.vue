<template>
  <section id="portfolio" aria-labelledby="portfolio-title" class="px-6 py-20 bg-gray-100 dark:bg-gray-800/50">
    <div class="container mx-auto">
      <div class="mb-10 text-center">
        <h2 id="portfolio-title" class="mb-4 text-4xl font-bold md:text-5xl">{{ t('portfolio.title') }}</h2>
        <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          {{ t('portfolio.subtitle') }}
        </p>
      </div>

      <PortfolioFilter
        v-model="activeFilter"
        :options="filterOptions"
        :label="t('portfolio.filterLabel')"
      />

      <!-- Announces the new result count after a filter change -->
      <p class="sr-only" aria-live="polite">{{ resultAnnouncement }}</p>

      <TransitionGroup
        ref="gridRef"
        name="project"
        tag="div"
        class="project-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <button
          v-for="(project, index) in visibleProjects"
          :key="project.slug"
          type="button"
          class="project-card pressable relative flex flex-col w-full overflow-hidden text-left transition-shadow bg-white shadow-md cursor-pointer group rounded-xl hover:shadow-xl dark:bg-gray-900 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-4"
          :style="{ '--stagger-index': Math.min(index, 5) }"
          :aria-label="t('portfolio.openProject', { title: project.title })"
          @click="openProject(project)"
        >
          <!-- Project Image -->
          <span class="relative block w-full overflow-hidden aspect-video">
            <NuxtImg
              v-if="project.images && project.images.length > 0"
              :src="project.thumbImage || project.images[0]"
              alt=""
              width="640"
              height="360"
              loading="lazy"
              :data-project-thumb="project.slug"
              :style="heroSlug === project.slug && !isModalOpen ? { viewTransitionName: 'project-hero' } : undefined"
              class="project-thumb object-cover w-full h-full transition-transform duration-slow"
            />
            <span
              v-else
              class="block w-full h-full bg-gradient-to-br from-blue-600 to-sky-600"
            ></span>
            <!-- Richer overlay only on devices that can hover (and for keyboard focus) -->
            <span class="project-overlay absolute inset-0 flex flex-col justify-end p-6 opacity-0 bg-gradient-to-t from-black/85 via-black/60 to-black/20" aria-hidden="true">
              <span class="block mb-4 text-sm leading-relaxed text-gray-100 line-clamp-3">
                {{ project.description }}
              </span>
              <span class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-3 py-1 text-xs font-medium text-white border rounded-full border-white/30 bg-white/10"
                >
                  {{ tag }}
                </span>
              </span>
            </span>
          </span>

          <!-- Always-visible caption (touch screens never see the hover overlay) -->
          <span class="flex flex-col gap-1 px-5 py-4">
            <span class="text-lg font-semibold leading-snug text-gray-900 dark:text-white">{{ project.title }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ categoryLabel(project.category) }}</span>
          </span>
        </button>
      </TransitionGroup>

      <!-- Show More Button (same on every screen size) -->
      <div v-if="hasMoreProjects" class="flex justify-center mt-12">
        <button
          type="button"
          class="pressable inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-colors bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
          @click="showMoreProjects"
        >
          <Icon name="lucide:plus" class="w-5 h-5" aria-hidden="true" />
          <span>{{ t('portfolio.showMore') }}</span>
          <span class="px-2 py-1 text-sm rounded-lg bg-white/20 tabular-nums">
            +{{ Math.min(LOAD_MORE_COUNT, remainingProjects) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      :is-open="isModalOpen"
      :project="selectedProject"
      :hero-transition-name="heroSlug ? 'project-hero' : undefined"
      :skip-fade="heroSlug !== null"
      @close="closeProject"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, type ComponentPublicInstance } from 'vue'
import ProjectModal from './ProjectModal.vue'
import type { FilterOption } from './PortfolioFilter.vue'

const { t, tm, rt } = useI18n()
const route = useRoute()
const router = useRouter()

interface Testimonial {
  quote: string
  author: string
  role: string
}

interface Project {
  slug: string
  title: string
  description: string
  fullDescription?: string
  tags: string[]
  category: string
  thumbImage?: string
  images?: string[]
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  testimonial?: Testimonial
}

const props = defineProps<{
  projects: Project[]
}>()

// Translations live in locales/*.json under projects.items.<slug>
const localizedProjects = computed<Project[]>(() => {
  const copyBySlug = tm('projects.items') as Record<string, Record<string, unknown>>

  return props.projects.map((project) => {
    const projectCopy = copyBySlug[project.slug]
    if (!projectCopy) {
      return project
    }

    const testimonialCopy = projectCopy.testimonial as Record<string, unknown> | undefined

    return {
      ...project,
      title: projectCopy.title ? rt(projectCopy.title as never) : project.title,
      description: projectCopy.description ? rt(projectCopy.description as never) : project.description,
      fullDescription: projectCopy.fullDescription ? rt(projectCopy.fullDescription as never) : project.fullDescription,
      tags: (projectCopy.tags as unknown[] | undefined)?.map((tag) => rt(tag as never)) ?? project.tags,
      testimonial: testimonialCopy
        ? {
            quote: rt(testimonialCopy.quote as never),
            author: rt(testimonialCopy.author as never),
            role: rt(testimonialCopy.role as never)
          }
        : project.testimonial
    }
  })
})

const filterDefinitions = [
  { value: 'all', icon: 'lucide:layout-grid' },
  { value: 'webdesign', icon: 'lucide:monitor' },
  { value: 'magazines', icon: 'lucide:book-open' },
  { value: 'graphics', icon: 'lucide:palette' }
]

const categoryLabel = (category: string) => t(`portfolio.filters.${category}`)

// Only show categories that have projects, each with its count
const filterOptions = computed<FilterOption[]>(() => {
  return filterDefinitions
    .map((definition) => ({
      ...definition,
      label: categoryLabel(definition.value),
      count: definition.value === 'all'
        ? localizedProjects.value.length
        : localizedProjects.value.filter((project) => project.category === definition.value).length
    }))
    .filter((option) => option.count > 0)
})

const INITIAL_PROJECTS = 9
const LOAD_MORE_COUNT = 3

const activeFilter = ref('all')
const visibleCount = ref(INITIAL_PROJECTS)
const gridRef = ref<ComponentPublicInstance | null>(null)

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return localizedProjects.value
  }
  return localizedProjects.value.filter((project) => project.category === activeFilter.value)
})

const visibleProjects = computed(() => filteredProjects.value.slice(0, visibleCount.value))
const hasMoreProjects = computed(() => visibleCount.value < filteredProjects.value.length)
const remainingProjects = computed(() => filteredProjects.value.length - visibleCount.value)

const resultAnnouncement = computed(() => t('portfolio.resultCount', filteredProjects.value.length))

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

watch(activeFilter, async () => {
  visibleCount.value = INITIAL_PROJECTS

  // If the grid's top has scrolled above the viewport, bring it back just under the sticky filter
  await nextTick()
  const gridElement = gridRef.value?.$el as HTMLElement | undefined
  if (gridElement && gridElement.getBoundingClientRect().top < 0) {
    gridElement.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }
})

const showMoreProjects = () => {
  visibleCount.value = Math.min(visibleCount.value + LOAD_MORE_COUNT, filteredProjects.value.length)
}

// --- Modal + deep links (?project=slug) ---
const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)
// True when this page pushed the ?project entry, so closing can simply go Back
const openedWithPush = ref(false)
// Slug whose card/modal image carries the shared view-transition-name during a morph
const heroSlug = ref<string | null>(null)

const applyModalState = (project: Project | null) => {
  if (project) {
    selectedProject.value = project
    isModalOpen.value = true
  } else {
    isModalOpen.value = false
  }
}

// Wait (briefly) for the modal's large image so the morph doesn't land on an empty box
const waitForModalHeroImage = async () => {
  const heroImage = document.querySelector<HTMLImageElement>('[role="dialog"] img[data-project-hero]')
  if (!heroImage) return
  const shortTimeout = new Promise((resolve) => setTimeout(resolve, 300))
  await Promise.race([heroImage.decode().catch(() => undefined), shortTimeout])
}

const syncModalWithRoute = async () => {
  const slug = typeof route.query.project === 'string' ? route.query.project : ''
  const project = localizedProjects.value.find((candidate) => candidate.slug === slug) ?? null
  const isOpening = project !== null
  const transitionSlug = isOpening ? project.slug : selectedProject.value?.slug
  const cardThumbIsRendered = transitionSlug
    ? document.querySelector(`[data-project-thumb="${transitionSlug}"]`) !== null
    : false

  // Grow from / shrink into the card with the View Transitions API; plain fade otherwise
  const canMorph = typeof document.startViewTransition === 'function'
    && !prefersReducedMotion()
    && cardThumbIsRendered
    && isOpening !== isModalOpen.value

  if (!canMorph || !transitionSlug) {
    applyModalState(project)
    return
  }

  // The old snapshot needs the name on the element that is visible now
  heroSlug.value = transitionSlug
  await nextTick()

  let hasUpdated = false
  const viewTransition = document.startViewTransition(async () => {
    hasUpdated = true
    applyModalState(project)
    await nextTick()
    if (isOpening) await waitForModalHeroImage()
  })

  // Safety net: if the browser never renders a frame (e.g. a background pane), skip the
  // animation so the modal still opens/closes; skipping runs the pending update callback
  const fallbackTimer = setTimeout(() => {
    if (!hasUpdated) viewTransition.skipTransition()
  }, 1000)

  try {
    await viewTransition.finished
  } catch {
    // An interrupted transition still leaves the DOM in its final state
  } finally {
    clearTimeout(fallbackTimer)
    heroSlug.value = null
  }
}

const openProject = (project: Project) => {
  openedWithPush.value = true
  router.push({ query: { ...route.query, project: project.slug }, hash: route.hash })
}

const closeProject = () => {
  if (openedWithPush.value) {
    openedWithPush.value = false
    router.back()
    return
  }

  // Arrived directly on a ?project= link: drop the param without leaving the site
  const remainingQuery = { ...route.query }
  delete remainingQuery.project
  router.replace({ query: remainingQuery, hash: route.hash })
}

watch(() => route.query.project, (slug, previousSlug) => {
  // Browser Back from an open project also needs to clear the push flag
  if (!slug && previousSlug) {
    openedWithPush.value = false
  }
  syncModalWithRoute()
})

// Keep the open project's copy in sync when the language changes
watch(localizedProjects, () => {
  if (isModalOpen.value) syncModalWithRoute()
})

onMounted(syncModalWithRoute)
</script>

<style scoped>
/* Scrolling to the grid leaves room for the fixed header and the sticky filter */
.project-grid {
  scroll-margin-top: calc(var(--header-height, 80px) + 5rem);
}

@media (hover: hover) {
  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-card:hover .project-thumb {
    transform: scale(1.04);
  }
}

.project-card:focus-visible .project-overlay {
  opacity: 1;
}

.project-overlay {
  transition: opacity var(--dur-base, 250ms) var(--ease-out, ease-out);
}

/* Entrances: 30ms stagger capped at 6 cards; exits are faster than entrances */
.project-enter-active {
  transition:
    opacity var(--dur-base, 250ms) var(--ease-out, ease-out),
    transform var(--dur-base, 250ms) var(--ease-out, ease-out);
  transition-delay: calc(var(--stagger-index, 0) * 30ms);
}

.project-leave-active {
  transition:
    opacity 150ms ease-in,
    transform 150ms ease-in;
}

.project-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.project-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.project-move {
  transition: transform var(--dur-slow, 400ms) var(--ease-out, ease-out);
}
</style>
