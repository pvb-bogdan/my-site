<template>
  <div
    class="min-h-screen text-gray-900 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
  >
    <section class="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">
      <!-- Background Gradient Blobs (mirrors HeroSection) -->
      <div class="absolute inset-0 z-0" style="contain: layout style paint;">
        <div class="absolute -top-20 left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-violet-200 to-purple-400 rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen dark:opacity-30 animate-blob-move-1" style="will-change: transform;"></div>
        <div class="absolute top-[15%] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-cyan-300 to-teal-400 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-20 animate-blob-move-2" style="will-change: transform;"></div>
        <div class="absolute top-[40%] -left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200 to-blue-500 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-25 animate-blob-move-3" style="will-change: transform;"></div>
        <div class="absolute bottom-[10%] right-[25%] w-[450px] h-[450px] bg-gradient-to-tl from-pink-300 to-fuchsia-400 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen dark:opacity-20 animate-blob-move-4" style="will-change: transform;"></div>
        <div class="absolute -bottom-16 left-[30%] w-[400px] h-[400px] bg-gradient-to-r from-sky-300 to-cyan-400 rounded-full blur-3xl opacity-25 mix-blend-multiply dark:mix-blend-screen dark:opacity-15 animate-blob-move-5" style="will-change: transform;"></div>
      </div>

      <div class="container z-10 mx-auto">
        <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left">
            <p class="mb-4 font-semibold tracking-widest text-gray-300 uppercase animate-fade-in-up animation-delay-100">
              Eroare 404
            </p>
            <h1 class="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-200">
              Pagină
              <br />
              <span class="text-indigo-400">negăsită</span>
            </h1>
            <p class="max-w-md mx-auto mb-10 text-xl text-gray-600 lg:mx-0 dark:text-gray-300 animate-fade-in-up animation-delay-300">
              Se pare că această pagină nu există sau a fost mutată. Întoarce-te acasă și explorează portofoliul.
            </p>
            <div class="flex justify-center lg:justify-start animate-fade-in-up animation-delay-400">
              <NuxtLink
                to="/"
                class="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform bg-indigo-600 rounded-lg shadow-lg group hover:scale-105 hover:shadow-xl"
              >
                <span class="relative z-10">Înapoi acasă</span>
                <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-indigo-700 to-purple-600 group-hover:opacity-100"></div>
              </NuxtLink>
            </div>
          </div>

          <!-- Avatar Image -->
          <div class="relative flex-shrink-0 lg:flex-1 animate-fade-in-right animation-delay-300">
            <div class="absolute -z-1 left-1/2 top-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/30 blur-2xl"></div>

            <!-- Floating SVG Shapes -->
            <svg class="absolute top-0 left-0 w-16 h-16 text-indigo-300/40 opacity-70 animate-float-slow" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="currentColor"/></svg>
            <svg class="absolute w-10 h-10 text-pink-300 dark:text-green-100 right-4 top-10 opacity-60 animate-float-medium" viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor"/></svg>
            <svg class="absolute bottom-0 w-12 h-12 left-10 text-cyan-300/40 opacity-60 animate-float-fast" viewBox="0 0 40 40" fill="none"><polygon points="20,0 40,40 0,40" fill="currentColor"/></svg>

            <NuxtImg
              src="/images/avatar2.webp"
              alt="Bogdan Petre"
              width="640"
              height="900"
              loading="eager"
              fetchpriority="high"
              class="relative z-10 hidden w-full max-w-lg mx-auto transition-transform duration-300 transform md:block lg:max-w-xl xl:max-w-[40rem] hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { isDark } = useTheme()

useHead({
  title: '404 – Pagină negăsită | Bogdan Petre',
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})
</script>
