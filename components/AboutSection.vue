<template>
  <section id="about" class="py-20 px-6">
    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Bio -->
        <div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p
            v-for="(paragraph, index) in bio"
            :key="index"
            class="text-xl mb-6 leading-relaxed text-gray-600 dark:text-gray-400"
          >
            {{ paragraph }}
          </p>
          <a
            :href="cvLink"
            class="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Download CV
          </a>
        </div>

        <!-- Technologies -->
        <div>
          <h3 class="text-2xl font-semibold mb-6">Technologies & Tools</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="tech in technologies"
              :key="tech"
              class="px-6 py-4 rounded-lg text-center font-medium transition-all duration-200 border bg-white hover:bg-indigo-50 hover:border-indigo-400 border-gray-200 dark:bg-gray-800 dark:hover:bg-indigo-600/20 dark:hover:border-indigo-500 dark:border-gray-700"
            >
              {{ tech }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  bio: string[]
  cvLink: string
  technologies: string[]
}>()
</script>
