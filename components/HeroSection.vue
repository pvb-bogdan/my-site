<template>
  <section
    id="hero"
    ref="heroRef"
    aria-labelledby="hero-title"
    :data-motion-paused="isOffscreen ? '' : undefined"
    class="relative flex items-center justify-center px-6 pt-20 overflow-hidden">
    <HeroBackground />

    <div class="container relative z-10 mx-auto">
      <div class="flex flex-col items-center justify-between gap-8 md:gap-12 lg:flex-row">
        <!-- Text Content: heading and intro paint immediately (no opacity delay) for a fast LCP -->
        <div class="flex-1 text-center lg:text-left">
          <h1 id="hero-title" class="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            {{ t('hero.greeting') }} <br/> <span class="text-blue-600 dark:text-sky-400">{{ name }}</span>
          </h1>
          <p class="mb-6 text-3xl font-semibold text-gray-700 md:text-4xl dark:text-gray-300">
            {{ t('hero.title') }}
          </p>
          <p class="max-w-2xl mx-auto mb-8 text-xl text-gray-700 lg:mx-0 dark:text-gray-200">
            {{ t('hero.description') }}
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start animate-fade-in-up animation-delay-200">
            <a
              href="#portfolio"
              class="pressable px-8 py-4 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-300 focus-visible:outline-offset-2"
            >
              {{ t('hero.ctaPortfolio') }}
            </a>
            <a
              href="#contact"
              class="pressable px-8 py-4 font-semibold text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
            >
              {{ t('hero.ctaContact') }}
            </a>
          </div>
        </div>

        <!-- Hero Image: one image for every size (160px on phones, above the heading) -->
        <div class="relative flex-shrink-0 order-first lg:order-none lg:flex-1">
          <!-- Soft Glow/Shadow -->
          <div class="absolute left-1/2 top-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30 blur-2xl" aria-hidden="true"></div>

          <!-- One floating shape only (motion restraint) -->
          <svg aria-hidden="true" class="absolute top-0 left-0 hidden w-16 h-16 md:block text-sky-300/40 opacity-70 animate-float-slow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="currentColor"/></svg>

          <NuxtImg
            src="/images/avatar2.webp"
            :alt="t('hero.imageAlt')"
            width="640"
            height="900"
            sizes="160px md:384px lg:576px xl:640px"
            loading="eager"
            fetchpriority="high"
            class="relative z-10 w-40 mx-auto md:w-full md:max-w-sm lg:max-w-xl xl:max-w-[40rem]"
          />
        </div>
      </div>
    </div>
    <!-- Scroll Indicator -->
    <div aria-hidden="true" class="absolute flex-col items-center hidden -translate-x-1/2 left-1/2 bottom-6 opacity-80 md:flex">
      <div class="relative flex items-start justify-center h-12 border-2 rounded-full border-sky-400 w-7 dark:border-gray-600">
        <div class="w-2 h-2 mt-2 rounded-full bg-sky-400 dark:bg-gray-600 animate-scroll-indicator"></div>
      </div>
      <span class="mt-2 text-xs tracking-wide text-sky-400 dark:text-gray-300">{{ t('hero.scroll') }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { t } = useI18n()

defineProps<{
  name: string
}>()

// Pause the decorative loops while the hero is scrolled out of view
const heroRef = ref<HTMLElement | null>(null)
const isOffscreen = ref(false)
let visibilityObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!heroRef.value || !('IntersectionObserver' in window)) return
  visibilityObserver = new IntersectionObserver(([entry]) => {
    isOffscreen.value = !entry.isIntersecting
  })
  visibilityObserver.observe(heroRef.value)
})

onBeforeUnmount(() => {
  visibilityObserver?.disconnect()
})
</script>
