<template>
  <div class="min-h-screen text-gray-900 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header Navigation -->
    <HeaderNav :full-name="portfolioData.personal.fullName" :nav-links="localizedNavLinks"
      :is-scrolled="isScrolled" @toggle-theme="toggleTheme" />

    <!-- Hero Section -->
    <HeroSection :name="portfolioData.personal.name" />

    <!-- Services Section -->
    <ServicesSection :services="portfolioData.services" />

    <!-- About Section -->
    <AboutSection :linkedin-link="portfolioData.about.linkedinLink"
      :technologies="portfolioData.technologies" />

    <!-- Portfolio Section -->
    <PortfolioSection :projects="projectsData" />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <footer class="pt-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div class="container mx-auto mb-4 text-center">
        <h4 class="text-lg text-gray-600 dark:text-gray-300">{{ t('footer.invite') }}<br />{{ t('footer.dayWish', { day: dayGreeting }) }}
          <span v-if="isFriday"> {{ t('footer.fridaySuffix') }}</span>
          <span v-else>!</span>
         </h4>
      </div>
      <div
        class="py-2 mx-auto text-sm text-center text-gray-400 bg-gray-100 rounded-lg dark:text-gray-400 dark:bg-gray-800">
        <p>&copy; {{ currentYear }} {{ portfolioData.personal.fullName }}. {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import portfolioData from '../data/portfolio.json'
import projectsData from '../data/projects.json'
import { useTheme } from '../composables/useTheme'

// Theme definition
const { toggleTheme } = useTheme()
const { t, locale } = useI18n()

// Navigation state
const isScrolled = ref(false)

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Day greeting for footer
const dayIndex = computed(() => new Date().getDay())
const dayGreeting = computed(() => t(`footer.days.${dayIndex.value}`))
const isFriday = computed(() => dayIndex.value === 5)

const localizedNavLinks = computed(() => [
  { label: t('nav.home'), href: '#hero' },
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.portfolio'), href: '#portfolio' },
  { label: t('nav.testimonials'), href: '#testimonials' },
  { label: t('nav.contact'), href: '#contact' }
])

// Scroll handler for header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// SEO
useHead({
  title: computed(() => t('seo.homeTitle')),
  meta: [
    { name: 'description', content: computed(() => t('seo.homeDescription')) },
    { property: 'og:title', content: computed(() => t('seo.homeTitle')) },
    { property: 'og:description', content: computed(() => t('seo.homeDescription')) },
    // Add more og tags if needed, e.g., og:image
  ],
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
