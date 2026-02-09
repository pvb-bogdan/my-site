<template>
  <section id="about" class="relative px-6 py-20 overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Decorative dots pattern -->
      <IconsDotGrid class="absolute opacity-20 top-20 right-10 dark:opacity-10" />
      <IconsSquares class="absolute opacity-20 bottom-20 left-10 dark:opacity-10" />
      <IconsCircleRings class="absolute opacity-15 bottom-40 right-20 dark:opacity-10" />
    </div>

    <div class="container relative z-10 mx-auto">
      <!-- Top Section: Avatar + Bio -->
      <div class="grid items-center gap-12 mb-16 lg:grid-cols-2">
        <!-- Avatar with decorative elements -->
        <div class="relative flex justify-center order-1 lg:order-none">
          <div class="relative">
            <!-- Decorative elements behind avatar -->
            <IconsTriangle class="absolute text-purple-400 scale-150 -top-8 -left-8 opacity-20 dark:opacity-15" />
            <IconsCircleRings class="absolute text-indigo-400 opacity-25 -bottom-6 -right-6 dark:opacity-15" />
            
            <!-- Avatar container - larger size -->
            <div class="relative overflow-hidden border-2 border-gray-300 rounded-full shadow-lg cursor-pointer w-72 h-72 md:w-96 md:h-96 dark:border-gray-700 group/avatar">
              <img 
                src="~/assets/images/avatar-color.svg" 
                alt="Avatar" 
                class="object-cover w-full h-full transition-all duration-500 bg-white grayscale dark:bg-gray-900 group-hover/avatar:grayscale-0"
              />
            </div>
          </div>
        </div>

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
            :href="linkedinLink"
            class="relative inline-flex items-center gap-2 px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform bg-indigo-600 rounded-lg shadow-lg cursor-pointer group hover:scale-105 hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconsLinkedin class="relative z-10 w-5 h-5" />
            <span class="relative z-10">LinkedIn</span>
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-indigo-700 to-purple-600 group-hover:opacity-100"></div>
          </a>
        </div>
      </div>

      <!-- Bottom Section: Technologies -->
      <div>
        <h3 class="mb-8 text-2xl font-semibold text-center md:text-3xl">Tehnologii și Instrumente</h3>
        
        <!-- Skill bars grid -->
        <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="tech in technologies"
            :key="tech.name"
            class="relative h-10 overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg cursor-pointer group dark:bg-gray-800 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500/40"
          >
            <!-- Progress Background (hidden initially, shown on hover) -->
            <div 
              class="absolute inset-0 w-0 transition-all duration-700 ease-out bg-indigo-600/50 dark:bg-indigo-500/30 group-hover:w-full"
            >
              <div 
                class="h-full bg-indigo-600/50 dark:bg-indigo-500/40"
                :style="{ width: `${tech.level}%` }"
              ></div>
            </div>
            
            <!-- Content -->
            <div class="relative flex items-center justify-between h-full px-4">
              <span class="text-sm font-medium text-gray-900 transition-colors dark:text-white group-hover:text-white">{{ tech.name }}</span>
              <span class="text-xs font-semibold text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">{{ tech.level }}%</span>
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
  linkedinLink: string
  technologies: Technology[]
}>()
</script>
