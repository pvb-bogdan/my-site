<template>
  <section id="services" class="relative px-6 py-20 overflow-hidden bg-gray-100 dark:bg-gray-800/50">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Dot grid pattern - top left -->
      <div class="absolute top-10 left-10 opacity-20 dark:opacity-10">
        <DotGrid />
      </div>
      
      <!-- Geometric triangle - top right -->
      <div class="absolute top-20 right-16 opacity-15 dark:opacity-10">
        <Triangle />
      </div>
      
      <!-- Circle ring - bottom left -->
      <div class="absolute bottom-20 left-20 opacity-15 dark:opacity-10">
        <CircleRings />
      </div>
      
      <!-- Cross/plus shape - bottom right -->
      <div class="absolute bottom-32 right-24 opacity-20 dark:opacity-10">
        <CrossPlus />
      </div>
      
      <!-- Small squares - middle right -->
      <div class="absolute top-1/2 right-8 opacity-15 dark:opacity-10">
        <Squares />
      </div>
      
      <!-- Diagonal lines - left side middle -->
      <div class="absolute top-1/3 left-4 opacity-10 dark:opacity-5">
        <DiagonalLines />
      </div>
    </div>
    
    <div class="container relative z-10 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold md:text-5xl">Servicii</h2>
        <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          Soluții complete pentru dezvoltare web și design modern
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="service in services"
          :key="service.title"
          class="relative p-8 overflow-hidden text-center transition-all duration-300 transform bg-white border border-gray-200 shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-400 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-indigo-500/50"
        >
          <!-- Top accent gradient -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
          
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 transition-transform duration-300 bg-indigo-100 rounded-lg group-hover:scale-110 dark:bg-indigo-600/20">
            <component :is="iconMap[service.icon]" class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <!-- Gradient divider -->
          <div class="w-16 h-0.5 mx-auto mb-4 bg-gradient-to-r from-transparent via-indigo-400 to-transparent dark:via-indigo-500"></div>
          
          <h3 class="mb-4 text-2xl font-semibold">{{ service.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import Uiux from '../components/icons/Uiux.vue'
import Print from '../components/icons/Print.vue'
import Identity from '../components/icons/Identity.vue'
import Performance from '../components/icons/Performance.vue'
import DotGrid from '../components/icons/DotGrid.vue'
import Triangle from '../components/icons/Triangle.vue'
import CircleRings from '../components/icons/CircleRings.vue'
import CrossPlus from '../components/icons/CrossPlus.vue'
import Squares from '../components/icons/Squares.vue'
import DiagonalLines from '../components/icons/DiagonalLines.vue'

interface Service {
  icon: string
  title: string
  description: string
}

defineProps<{
  services: Service[]
}>()

const iconMap: Record<string, Component> = {
  uiux: Uiux,
  print: Print,
  identity: Identity,
  performance: Performance,
}
</script>
