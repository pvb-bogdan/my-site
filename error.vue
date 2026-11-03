<template>
  <div
    class="min-h-screen text-gray-900 transition-colors duration-base bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
  >
    <section class="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">
      <HeroBackground />

      <div class="container relative z-10 mx-auto">
        <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left">
            <p class="mb-4 font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400 animate-fade-in-up animation-delay-100">
              {{ t('error.code') }}
            </p>
            <h1 class="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-200">
              {{ t('error.title') }}
              <br />
              <span class="text-blue-600 dark:text-sky-400">404</span>
            </h1>
            <p class="max-w-md mx-auto mb-10 text-xl text-gray-600 lg:mx-0 dark:text-gray-300 animate-fade-in-up animation-delay-300">
              {{ t('error.description') }}
            </p>
            <div class="flex justify-center lg:justify-start animate-fade-in-up animation-delay-400">
              <NuxtLink
                to="/"
                class="pressable px-8 py-4 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
              >
                {{ t('error.backHome') }}
              </NuxtLink>
            </div>
          </div>

          <!-- Avatar Image -->
          <div class="relative flex-shrink-0 lg:flex-1 animate-fade-in-right animation-delay-300">
            <div class="absolute left-1/2 top-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30 blur-2xl" aria-hidden="true"></div>

            <!-- One floating shape only (motion restraint) -->
            <svg aria-hidden="true" class="absolute top-0 left-0 w-16 h-16 text-sky-300/40 opacity-70 animate-float-slow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="currentColor"/></svg>

            <NuxtImg
              src="/images/avatar2.webp"
              :alt="t('hero.imageAlt')"
              width="640"
              height="900"
              loading="eager"
              fetchpriority="high"
              class="relative z-10 hidden w-full max-w-lg mx-auto md:block lg:max-w-xl xl:max-w-[40rem]"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

useTheme()
const { t } = useI18n()

useHead({
  title: computed(() => t('seo.errorTitle')),
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})
</script>
