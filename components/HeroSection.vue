<template>
  <section id="hero" class="min-h-screen flex items-center justify-center pt-20 px-6">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm <span class="text-indigo-400">{{ name }}</span>
          </h1>
          <h2 class="text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
            {{ title }}
          </h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-400">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#portfolio"
              class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              class="px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border bg-white hover:bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700"
            >
              Contact Me
            </a>
          </div>
        </div>

        <!-- Avatar Placeholder -->
        <div class="flex-shrink-0">
          <div class="w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl transform hover:scale-105 transition-transform duration-300"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  title: string
  description: string
}>()
</script>
