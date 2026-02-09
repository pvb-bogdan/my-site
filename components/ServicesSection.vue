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
          class="relative p-8 overflow-hidden text-center transition-all duration-300 transform bg-white border border-gray-200 shadow-md group rounded-2xl hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-indigo-500/40"
        >
          <div class="flex items-center justify-center mx-auto mb-5 transition-transform duration-300 w-14 h-14 bg-indigo-50 rounded-2xl group-hover:scale-105 group-hover:bg-indigo-100 dark:bg-indigo-600/15 dark:group-hover:bg-indigo-600/25">
            <component :is="iconMap[service.icon]" class="text-indigo-600 w-7 h-7 dark:text-indigo-400" />
          </div>
          
          <h3 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{{ service.title }}</h3>
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
