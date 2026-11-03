<template>
  <section id="services" aria-labelledby="services-title" class="relative px-6 py-20 overflow-hidden bg-gray-100 dark:bg-gray-800/50" style="content-visibility: auto; contain-intrinsic-size: auto 800px;">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <!-- Dot grid pattern - top left -->
      <div class="absolute top-10 left-10 opacity-20 dark:opacity-10">
        <DecorDotGrid />
      </div>
      
      <!-- Geometric triangle - top right -->
      <div class="absolute top-20 right-16 opacity-15 dark:opacity-10">
        <DecorTriangle />
      </div>
      
      <!-- Circle ring - bottom left -->
      <div class="absolute bottom-20 left-20 opacity-15 dark:opacity-10">
        <DecorCircleRings />
      </div>
      
      <!-- Cross/plus shape - bottom right -->
      <div class="absolute bottom-32 right-24 opacity-20 dark:opacity-10">
        <DecorCrossPlus />
      </div>
      
      <!-- Small squares - middle right -->
      <div class="absolute top-1/2 right-8 opacity-15 dark:opacity-10">
        <DecorSquares />
      </div>
      
      <!-- Diagonal lines - left side middle -->
      <div class="absolute top-1/3 left-4 opacity-10 dark:opacity-5">
        <DecorDiagonalLines />
      </div>
    </div>
    
    <div class="container relative z-10 mx-auto">
      <div class="mb-16 text-center">
        <h2 id="services-title" class="mb-4 text-4xl font-bold md:text-5xl">{{ t('services.title') }}</h2>
        <p class="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="service in services"
          :key="service.id"
          class="relative p-8 overflow-hidden text-center transition-all duration-base bg-white border border-gray-200 shadow-md group rounded-2xl hover:shadow-lg hover:border-blue-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-blue-500/40 focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2"
        >
          <div class="flex items-center justify-center mx-auto mb-5 transition-transform duration-base w-14 h-14 bg-sky-50 rounded-2xl group-hover:bg-sky-100 dark:bg-blue-600/15 dark:group-hover:bg-blue-600/25">
            <Icon :name="service.icon" class="w-6 h-6 text-blue-600 dark:text-sky-400" aria-hidden="true" />
          </div>

          <h3 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{{ t(`services.items.${service.id}.title`) }}</h3>
          <p class="text-gray-700 dark:text-gray-300">{{ t(`services.items.${service.id}.description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Service {
  id: string
  icon: string
}

defineProps<{
  services: Service[]
}>()
</script>
