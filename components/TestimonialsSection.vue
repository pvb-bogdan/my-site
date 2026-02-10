<template>
  <section id="testimonials" class="relative px-6 py-20 overflow-hidden bg-white dark:bg-gray-800/50">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <IconsDotGrid class="absolute opacity-20 top-10 right-10 dark:opacity-10" />
      <IconsCircleRings class="absolute opacity-15 bottom-20 left-16 dark:opacity-10" />
      <IconsTriangle class="absolute opacity-15 top-1/3 left-8 dark:opacity-10" />
      <IconsSquares class="absolute opacity-20 bottom-32 right-20 dark:opacity-10" />
    </div>

    <div class="container relative z-10 mx-auto">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-4xl font-bold md:text-5xl">Testimoniale</h2>
        <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          Ce spun clienții despre colaborarea cu mine
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="relative mx-auto">
        <!-- Carousel Track -->
        <div
          ref="carouselRef"
          class="overflow-hidden"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            class="flex items-stretch transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(-${currentIndex * 50}%)` }"
          >
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="flex-shrink-0 w-full px-3 md:w-1/2"
            >
              <div class="relative flex flex-col h-full p-8 overflow-hidden bg-white border border-gray-200 shadow-lg md:p-10 rounded-2xl dark:bg-gray-900 dark:border-gray-800 min-h-[280px]">
                <!-- Quote Icon -->
                <div class="absolute top-6 right-6 opacity-10 dark:opacity-5">
                  <svg class="w-16 h-16 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <!-- Testimonial Text -->
                <p class="relative z-10 flex-grow mb-8 text-lg italic leading-relaxed text-gray-700 md:text-xl dark:text-gray-300">
                  "{{ testimonial.text }}"
                </p>

                <!-- Author Info -->
                <div class="relative z-10 flex items-center mt-auto">
                  <div class="flex items-center justify-center text-xl font-bold text-white rounded-full shadow-md w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600">
                    {{ testimonial.initials }}
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Navigation -->
        <div class="flex justify-center gap-3 mt-8">
          <button
            v-for="index in totalSlides"
            :key="index"
            @click="goToSlide(index - 1)"
            class="transition-all duration-300 rounded-full"
            :class="[
              currentIndex === index - 1 
                ? 'bg-indigo-600 dark:bg-indigo-400 w-10 h-4' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-300 dark:hover:bg-indigo-500/50 w-4 h-4'
            ]"
            :aria-label="`Go to testimonial ${index}`"
          />
        </div>

        <!-- Swipe hint for mobile -->
        <p class="mt-4 text-sm text-center text-gray-400 md:hidden dark:text-gray-500">
          ← Swipe pentru a naviga →
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Testimonial {
  name: string
  role: string
  initials: string
  text: string
}

const props = defineProps<{
  testimonials: Testimonial[]
}>()

const currentIndex = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

// Calculate total slides (showing 2 at a time on desktop)
const totalSlides = computed(() => Math.max(1, props.testimonials.length - 1))

// Touch handling for swipe
let touchStartX = 0
let touchEndX = 0
const minSwipeDistance = 50

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
}

const onTouchMove = (e: TouchEvent) => {
  touchEndX = e.touches[0].clientX
}

const onTouchEnd = () => {
  const swipeDistance = touchStartX - touchEndX
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  touchStartX = 0
  touchEndX = 0
}

const nextSlide = () => {
  if (currentIndex.value < totalSlides.value - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = totalSlides.value - 1
  }
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

// Auto-play (optional - can be removed if not wanted)
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 6000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(() => {
  startAutoPlay()
  
  // Pause on hover/touch
  if (carouselRef.value) {
    carouselRef.value.addEventListener('mouseenter', stopAutoPlay)
    carouselRef.value.addEventListener('mouseleave', startAutoPlay)
  }
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>
