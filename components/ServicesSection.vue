<template>
  <section id="services" class="py-20 px-6 bg-gray-100 dark:bg-gray-800/50">
    <div class="container mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Servicii</h2>
        <p class="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Soluții complete pentru dezvoltare web și design modern
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border bg-white border-gray-200 hover:border-indigo-400 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-indigo-500/50"
        >
          <div class="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-indigo-100 dark:bg-indigo-600/20">
            <span class="text-3xl">{{ service.icon }}</span>
          </div>
          <h3 class="text-2xl font-semibold mb-4">{{ service.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Service {
  icon: string
  title: string
  description: string
}

defineProps<{
  services: Service[]
}>()
</script>
