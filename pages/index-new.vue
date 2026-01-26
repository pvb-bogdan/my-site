<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
  ]">
    <!-- Header Navigation -->
    <HeaderNav
      :name="portfolioData.personal.name"
      :nav-links="portfolioData.navLinks"
      :is-scrolled="isScrolled"
      :is-dark-mode="isDarkMode"
      @toggle-theme="toggleTheme"
    />

    <!-- Hero Section -->
    <HeroSection
      :name="portfolioData.personal.name"
      :title="portfolioData.personal.title"
      :description="portfolioData.personal.description"
      :is-dark-mode="isDarkMode"
    />

    <!-- Services Section -->
    <ServicesSection
      :services="portfolioData.services"
      :is-dark-mode="isDarkMode"
    />

    <!-- About Section -->
    <AboutSection
      :bio="portfolioData.about.bio"
      :cv-link="portfolioData.about.cvLink"
      :technologies="portfolioData.technologies"
      :is-dark-mode="isDarkMode"
    />

    <!-- Portfolio Section -->
    <PortfolioSection
      :projects="portfolioData.projects"
      :is-dark-mode="isDarkMode"
    />

    <!-- Testimonials Section -->
    <TestimonialsSection
      :testimonials="portfolioData.testimonials"
      :is-dark-mode="isDarkMode"
    />

    <!-- Contact Section -->
    <ContactSection
      :social-links="portfolioData.socialLinks"
      :is-dark-mode="isDarkMode"
    />

    <!-- Footer -->
    <footer :class="[
      'py-8 px-6 border-t',
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    ]">
      <div :class="[
        'container mx-auto text-center',
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      ]">
        <p>&copy; {{ currentYear }} {{ portfolioData.personal.name }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import portfolioData from '../data/portfolio.json'

// Navigation state
const isScrolled = ref(false)
const isDarkMode = ref(true)

// Theme toggle handler
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }
}

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Scroll handler for header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Load theme preference from localStorage
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
