<template>
  <section id="about" class="px-6 py-20">
    <div class="container mx-auto">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Bio -->
        <div>
          <h2 class="mb-6 text-4xl font-bold md:text-5xl">Despre Mine</h2>
          <p
            v-for="(paragraph, index) in bio"
            :key="index"
            class="mb-6 text-xl leading-relaxed text-gray-600 dark:text-gray-400"
          >
            {{ paragraph }}
          </p>
          <a
            :href="cvLink"
            class="relative inline-block px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform bg-indigo-600 rounded-lg shadow-lg group hover:scale-105 hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="relative z-10">Descarcă CV</span>
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-indigo-700 to-purple-600 group-hover:opacity-100"></div>
          </a>
        </div>

        <!-- Technologies -->
        <div>
          <h3 class="mb-6 text-2xl font-semibold">Tehnologii și Instrumente</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="tech in technologies"
              :key="tech.name"
              class="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg cursor-pointer group dark:bg-gray-800 dark:border-gray-700"
            >
              <!-- Progress Background (hidden initially, shown on hover) -->
              <div 
                class="absolute inset-0 w-0 transition-all duration-700 ease-out bg-indigo-600/50 dark:bg-indigo-500/30 group-hover:w-full"
                :style="{ transitionDelay: '0s' }"
              >
                <div 
                  class="h-full transition-all duration-700 ease-out bg-indigo-600/50 dark:bg-indigo-500/30"
                  :style="{ width: `${tech.level}%` }"
                ></div>
              </div>
              
              <!-- Content -->
              <div class="relative flex items-center justify-between px-6 py-4">
                <span class="font-medium text-gray-900 transition-colors dark:text-white group-hover:text-white">{{ tech.name }}</span>
                <span class="text-sm font-semibold text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">{{ tech.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Technology {
  name: string
  level: number
}

defineProps<{
  bio: string[]
  cvLink: string
  technologies: Technology[]
}>()
</script>
