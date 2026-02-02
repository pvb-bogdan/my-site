<template>
  <section id="testimonials" class="py-20 px-6">
    <div class="container mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Testimoniale</h2>
        <p class="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Ce spun clienții despre colaborarea cu mine
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="p-8 rounded-xl shadow-lg border transition-all duration-300 bg-white border-gray-200 hover:border-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-indigo-500/50"
        >
          <!-- Avatar -->
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold mr-4">
              {{ testimonial.initials }}
            </div>
            <div>
              <h4 class="font-semibold text-lg">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.role }}</p>
            </div>
          </div>

          <!-- Testimonial Text -->
          <p class="italic leading-relaxed text-gray-700 dark:text-gray-300">
            "{{ testimonial.text }}"
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Testimonial {
  name: string
  role: string
  initials: string
  text: string
}

defineProps<{
  testimonials: Testimonial[]
}>()
</script>
