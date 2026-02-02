<template>
  <section id="hero" class="flex items-center justify-center min-h-screen px-6 pt-20">
    <div class="container mx-auto">
      <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            Salut, sunt <br/> <span class="text-indigo-400">{{ name }}</span>
          </h1>
          <h2 class="mb-6 text-3xl font-semibold text-gray-700 md:text-4xl dark:text-gray-300">
            {{ title }}
          </h2>
          <p class="max-w-2xl mx-auto mb-8 text-xl text-gray-600 lg:mx-0 dark:text-gray-400">
            {{ description }}
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#portfolio"
              class="px-8 py-4 font-semibold text-white transition-all duration-200 transform bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-xl"
            >
              Vezi Portofoliul
            </a>
            <a
              href="#contact"
              class="px-8 py-4 font-semibold text-gray-900 transition-all duration-200 transform bg-white border border-gray-300 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700"
            >
              Contactează-mă
            </a>
          </div>
        </div>

          <!-- Hero Image -->
        <div class="flex-shrink-0 lg:flex-1">
          <img 
            src="~/assets/images/hero-img.png" 
            alt="Device Mockup" 
            class="w-full max-w-lg mx-auto transition-transform duration-300 transform lg:max-w-xl xl:max-w-2xl hover:scale-105"
          />
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
