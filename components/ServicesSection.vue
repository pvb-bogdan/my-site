<template>
  <section id="services" class="px-6 py-20 bg-gray-100 dark:bg-gray-800/50">
    <div class="container mx-auto">
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
          class="p-8 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-400 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-indigo-500/50"
        >
          <div class="flex items-center justify-center w-16 h-16 mb-6 bg-indigo-100 rounded-lg dark:bg-indigo-600/20">
            <component :is="iconMap[service.icon]" class="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
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
