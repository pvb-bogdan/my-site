<template>
  <section id="testimonials" aria-labelledby="testimonials-title" class="relative px-6 py-20 overflow-hidden bg-white dark:bg-gray-800/50" style="content-visibility: auto; contain-intrinsic-size: auto 600px;">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <DecorDotGrid class="absolute opacity-20 top-10 right-10 dark:opacity-10" />
      <DecorCircleRings class="absolute opacity-15 bottom-20 left-16 dark:opacity-10" />
      <DecorTriangle class="absolute opacity-15 top-1/3 left-8 dark:opacity-10" />
      <DecorSquares class="absolute opacity-20 bottom-32 right-20 dark:opacity-10" />
    </div>

    <div class="container relative z-10 mx-auto">
      <div class="mb-12 text-center">
        <h2 id="testimonials-title" class="mb-4 text-4xl font-bold md:text-5xl">{{ t('testimonials.title') }}</h2>
        <p class="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          {{ t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Carousel Container -->
      <div
        class="relative mx-auto"
        role="region"
        aria-roledescription="carousel"
        :aria-label="t('testimonials.carouselLabel')"
      >
        <!-- Carousel Track with CSS scroll snap -->
        <div
          ref="carouselRef"
          class="flex overflow-x-auto motion-safe:scroll-smooth snap-x snap-mandatory hide-scrollbar"
          style="-webkit-overflow-scrolling: touch;"
          @scroll.passive="onScroll"
        >
          <div
            v-for="testimonial in localizedTestimonials"
            :key="testimonial.name"
            class="flex-shrink-0 w-[85%] px-3 md:w-1/2 snap-start"
          >
            <div class="relative flex flex-col h-full p-8 overflow-hidden bg-white border border-gray-200 shadow-lg md:p-10 rounded-2xl dark:bg-gray-900 dark:border-gray-800 min-h-[280px] focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2">
              <!-- Quote Icon -->
              <div class="absolute top-6 right-6 opacity-10 dark:opacity-5" aria-hidden="true">
                <Icon name="lucide:quote" class="w-16 h-16 text-blue-600 dark:text-sky-400" />
              </div>

              <!-- Testimonial Text -->
              <p class="relative z-10 flex-grow mb-8 text-lg italic leading-relaxed text-gray-800 md:text-xl dark:text-gray-200">
                "{{ testimonial.text }}"
              </p>

              <!-- Author Info -->
              <div class="relative z-10 flex items-center mt-auto">
                <div class="flex items-center justify-center text-xl font-bold text-white rounded-full shadow-md w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500">
                  {{ testimonial.initials }}
                </div>
                <div class="ml-4">
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300">{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- Prev / Next (desktop) around the dots -->
        <div class="flex items-center justify-center gap-1 mt-6">
          <button
            type="button"
            class="pressable items-center justify-center hidden mr-2 text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm md:flex w-11 h-11 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            :aria-label="t('aria.previousTestimonial')"
            :disabled="activeIndex === 0"
            @click="scrollToSlide(activeIndex - 1)"
          >
            <Icon name="lucide:chevron-left" class="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            v-for="(testimonial, index) in localizedTestimonials"
            :key="testimonial.name + '-dot'"
            @click="scrollToSlide(index)"
            type="button"
            class="flex items-center justify-center rounded-full min-w-11 min-h-11 group/dot focus-visible:outline-2 focus-visible:outline-blue-500"
            :aria-label="t('aria.goToTestimonial', { num: index + 1 })"
            :aria-current="isSlideActive(index) ? 'true' : undefined"
          >
            <!-- 16px visual dot inside a 44px hit area -->
            <span
              class="block h-4 transition-all duration-300 rounded-full"
              :class="isSlideActive(index)
                ? 'bg-blue-600 dark:bg-sky-400 w-10'
                : 'bg-gray-300 dark:bg-gray-600 group-hover/dot:bg-blue-300 dark:group-hover/dot:bg-sky-500/50 w-4'"
            ></span>
          </button>
          <button
            type="button"
            class="pressable items-center justify-center hidden ml-2 text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm md:flex w-11 h-11 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            :aria-label="t('aria.nextTestimonial')"
            :disabled="activeIndex === localizedTestimonials.length - 1"
            @click="scrollToSlide(activeIndex + 1)"
          >
            <Icon name="lucide:chevron-right" class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hide horizontal scrollbar for the carousel */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCarousel } from '~/composables/useCarousel'

const { t, tm, rt } = useI18n()

interface Testimonial {
  name: string
  role: string
  initials: string
  text: string
}

const localizedTestimonials = computed<Testimonial[]>(() => {
  const items = tm('testimonials.items') as Array<Record<string, unknown>>

  return items.map((item) => ({
    name: rt(item.name as never),
    role: rt(item.role as never),
    initials: rt(item.initials as never),
    text: rt(item.text as never)
  }))
})

const carouselRef = ref<HTMLElement | null>(null)
const { activeIndex, scrollToSlide, onScroll } = useCarousel(carouselRef)

// Helper to check if a slide is active (for dot styling)
const isSlideActive = (index: number) => activeIndex.value === index
</script>
