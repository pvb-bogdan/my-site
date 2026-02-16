<template>
  <div class="min-h-screen text-gray-900 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header Navigation -->
    <HeaderNav :full-name="portfolioData.personal.fullName" :nav-links="portfolioData.navLinks"
      :is-scrolled="isScrolled" @toggle-theme="toggleTheme" />

    <!-- Hero Section -->
    <HeroSection :name="portfolioData.personal.name" :title="portfolioData.personal.title"
      :description="portfolioData.personal.description" />

    <!-- Services Section -->
    <ServicesSection :services="portfolioData.services" />

    <!-- About Section -->
    <AboutSection :bio="portfolioData.about.bio" :linkedin-link="portfolioData.about.linkedinLink"
      :technologies="portfolioData.technologies" />

    <!-- Portfolio Section -->
    <PortfolioSection :projects="portfolioData.projects" />

    <!-- Testimonials Section -->
    <TestimonialsSection :testimonials="portfolioData.testimonials" />

    <!-- Contact Section -->
    <ContactSection :social-links="portfolioData.socialLinks" />

    <!-- Footer -->
    <footer class="pt-8 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div class="container mx-auto mb-4 text-center">
        <h4 class="text-lg text-gray-600 dark:text-gray-300">Te mai astept!<br />Iti doresc o zi de {{ dayGreeting }}
          fericita!</h4>
      </div>
      <div
        class="py-2 mx-auto text-sm text-center text-gray-400 bg-gray-100 rounded-lg dark:text-gray-400 dark:bg-gray-800">
        <p>&copy; {{ currentYear }} {{ portfolioData.personal.name }}. Toate drepturile rezervate.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import portfolioData from '../data/portfolio.json'
import { useTheme } from '../composables/useTheme'

// Theme definition
const { isDark, toggleTheme } = useTheme()

// Navigation state
const isScrolled = ref(false)

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Day greeting for footer
const dayNames = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri si un weekend placut', 'Sambata']
const dayGreeting = computed(() => dayNames[new Date().getDay()])

// Scroll handler for header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// SEO
const title = `${portfolioData.personal.name} - ${portfolioData.personal.title}`
useHead({
  title: title,
  meta: [
    { name: 'description', content: portfolioData.personal.description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: portfolioData.personal.description },
    // Add more og tags if needed, e.g., og:image
  ],
  htmlAttrs: {
    lang: 'ro'
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
