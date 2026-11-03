<template>
  <section id="about" aria-labelledby="about-title" class="relative px-6 py-20 overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <DecorDotGrid class="absolute opacity-20 top-20 right-10 dark:opacity-10" />
      <DecorSquares class="absolute opacity-20 bottom-20 left-10 dark:opacity-10" />
      <DecorCircleRings class="absolute opacity-15 bottom-40 right-20 dark:opacity-10" />
    </div>

    <div class="container relative z-10 mx-auto">
      <!-- 1. Bio row: photo + text -->
      <div class="grid items-center gap-12 mb-20 lg:grid-cols-2">
        <div class="relative flex justify-center">
          <div class="relative">
            <DecorTriangle class="absolute scale-150 text-sky-400 -top-8 -left-8 opacity-20 dark:opacity-15" />
            <DecorCircleRings class="absolute text-blue-400 opacity-25 -bottom-6 -right-6 dark:opacity-15" />

            <!-- Full colour on every device (the old hover-only colour never showed on touch) -->
            <div class="relative overflow-hidden border-2 border-gray-300 rounded-full shadow-lg w-72 h-72 md:w-96 md:h-96 dark:border-gray-700">
              <NuxtImg
                src="/images/avatar1.webp"
                :alt="t('about.imageAlt')"
                width="384"
                height="384"
                loading="lazy"
                class="object-cover w-full h-full bg-white dark:bg-gray-900"
              />
            </div>
          </div>
        </div>

        <div class="max-w-prose">
          <p class="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span class="relative flex w-2.5 h-2.5" aria-hidden="true">
              <span class="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-60 availability-ping"></span>
              <span class="relative inline-flex w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            </span>
            {{ t('about.availability') }}
          </p>

          <h2 id="about-title" class="mb-6 text-4xl font-bold md:text-5xl">{{ t('about.title') }}</h2>

          <p
            v-for="(paragraph, index) in localizedBio"
            :key="index"
            class="mb-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            {{ paragraph }}
          </p>

          <!-- The only number in the section: an honest experience fact, not a counter tile -->
          <!-- items-center (not baseline): the label wraps to two lines on phones and must sit beside the number's middle -->
          <p class="flex items-center gap-3 mt-8 mb-8">
            <span class="text-5xl font-bold leading-none text-blue-600 tabular-nums dark:text-sky-400">{{ t('about.experienceValue') }}</span>
            <span class="text-lg leading-snug text-gray-700 dark:text-gray-300">{{ t('about.experienceLabel') }}</span>
          </p>

          <a
            :href="linkedinLink"
            class="pressable flex w-full justify-center sm:inline-flex sm:w-auto items-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="simple-icons:linkedin" class="w-5 h-5" aria-hidden="true" />
            <span>{{ t('about.linkedin') }}</span>
          </a>
        </div>
      </div>

      <!-- 2. How I work -->
      <!-- No bottom margin on phones: the tools strip below is hidden there -->
      <div class="md:mb-20">
        <h3 class="mb-10 text-2xl font-semibold text-center md:text-3xl">{{ t('about.processTitle') }}</h3>

        <ol ref="processListRef" class="process-list relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(step, index) in localizedProcess"
            :key="index"
            class="process-step relative flex gap-5 p-6 bg-white border border-gray-200 shadow-sm md:flex-col md:gap-4 rounded-2xl dark:bg-gray-900 dark:border-gray-800"
            :class="{ 'is-visible': isProcessVisible }"
            :style="{ '--step-index': index }"
          >
            <div class="flex flex-col items-center flex-shrink-0 gap-3 md:flex-row md:justify-between">
              <span class="text-sm font-semibold text-gray-500 tabular-nums dark:text-gray-400">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="flex items-center justify-center w-12 h-12 bg-sky-50 rounded-xl dark:bg-blue-600/15">
                <Icon :name="processIcons[index]" class="w-6 h-6 text-blue-600 dark:text-sky-400" aria-hidden="true" />
              </span>
            </div>
            <div>
              <h4 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{{ step.title }}</h4>
              <p class="text-gray-700 dark:text-gray-300">{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>

      <!-- 3. Tools strip: real brand marks, names always visible; tablet and up only (secondary info on phones) -->
      <div class="hidden md:block">
        <h3 class="mb-10 text-2xl font-semibold text-center md:text-3xl">{{ t('about.toolsTitle') }}</h3>

        <div class="flex flex-wrap justify-center gap-x-12 gap-y-10">
          <div v-for="group in toolGroups" :key="group.id" class="flex flex-col items-center gap-4">
            <p class="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">{{ group.label }}</p>
            <ul class="flex flex-wrap justify-center gap-x-6 gap-y-5">
              <li
                v-for="tool in group.tools"
                :key="tool.name"
                class="tool-item flex flex-col items-center w-20 gap-2 text-gray-500 dark:text-gray-400"
                :style="{ '--brand-color': brandColors[tool.icon] }"
              >
                <Icon :name="tool.icon" class="w-8 h-8" aria-hidden="true" />
                <span class="text-xs font-medium text-center text-gray-700 dark:text-gray-300">{{ tool.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { t, tm, rt } = useI18n()

interface Technology {
  name: string
  icon: string
  group: string
}

const props = defineProps<{
  linkedinLink: string
  technologies: Technology[]
}>()

// tm() returns the raw message nodes; rt() renders each one
const localizedBio = computed(() => {
  const entries = tm('about.bio') as unknown
  return (Array.isArray(entries) ? entries : []).map((entry) => rt(entry as never))
})

const localizedProcess = computed(() => {
  const steps = tm('about.process') as unknown
  return (Array.isArray(steps) ? steps : []).map((step: Record<string, unknown>) => ({
    title: rt(step.title as never),
    text: rt(step.text as never)
  }))
})

const processIcons = ['lucide:messages-square', 'lucide:pen-tool', 'lucide:code-xml', 'lucide:rocket']

const toolGroups = computed(() => (['design', 'frontend', 'tooling'] as const)
  .map((groupId) => ({
    id: groupId,
    label: t(`about.toolGroups.${groupId}`),
    tools: props.technologies.filter((tool) => tool.group === groupId)
  }))
  .filter((group) => group.tools.length > 0))

// Brand colour is shown only on hover-capable devices (see styles)
const brandColors: Record<string, string> = {
  'simple-icons:figma': '#F24E1E',
  'simple-icons:adobephotoshop': '#31A8FF',
  'simple-icons:adobeillustrator': '#FF9A00',
  'simple-icons:adobeindesign': '#FF3366',
  'simple-icons:html5': '#E34F26',
  'simple-icons:css': '#663399',
  'simple-icons:javascript': '#F7DF1E',
  'simple-icons:tailwindcss': '#06B6D4',
  'simple-icons:bootstrap': '#7952B3',
  'simple-icons:vuedotjs': '#4FC08D',
  'simple-icons:nuxt': '#00DC82',
  'simple-icons:git': '#F05032',
  'simple-icons:github': 'currentColor'
}

// Fade the process steps up once, when the list first scrolls into view
const processListRef = ref<HTMLElement | null>(null)
const isProcessVisible = ref(false)
let processObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!processListRef.value || !('IntersectionObserver' in window)) {
    isProcessVisible.value = true
    return
  }

  processObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      isProcessVisible.value = true
      processObserver?.disconnect()
    }
  }, { threshold: 0.2 })
  processObserver.observe(processListRef.value)
})

onBeforeUnmount(() => {
  processObserver?.disconnect()
})
</script>

<style scoped>
/* Mobile: a thin line connects the step numbers in the vertical list */
@media (max-width: 767px) {
  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: calc(1.5rem + 1.5rem);
    bottom: -1.5rem;
    width: 1px;
    height: 1.5rem;
    background: rgb(209 213 219);
  }

  .dark .process-step:not(:last-child)::after {
    background: rgb(55 65 81);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .process-step {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity var(--dur-slow, 400ms) var(--ease-out, ease-out),
      transform var(--dur-slow, 400ms) var(--ease-out, ease-out);
    transition-delay: calc(var(--step-index, 0) * 30ms);
  }

  .process-step.is-visible {
    opacity: 1;
    transform: none;
  }

  .availability-ping {
    animation: availability-ping 2s cubic-bezier(0, 0, 0.2, 1) 3;
  }
}

@keyframes availability-ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@media (hover: hover) {
  .tool-item :deep(svg) {
    transition: color var(--dur-fast, 150ms) ease-out;
  }

  .tool-item:hover :deep(svg) {
    color: var(--brand-color);
  }
}
</style>
