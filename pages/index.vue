<template>
  <div class="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header Navigation -->
    <HeaderNav
      :name="portfolioData.personal.name"
      :nav-links="portfolioData.navLinks"
      :is-scrolled="isScrolled"
      @toggle-theme="toggleTheme"
    />

    <!-- Hero Section -->
    <HeroSection
      :name="portfolioData.personal.name"
      :title="portfolioData.personal.title"
      :description="portfolioData.personal.description"
    />

    <!-- Services Section -->
    <ServicesSection
      :services="portfolioData.services"
    />

    <!-- About Section -->
    <AboutSection
      :bio="portfolioData.about.bio"
      :linkedin-link="portfolioData.about.linkedinLink"
      :technologies="portfolioData.technologies"
    />

    <!-- Portfolio Section -->
    <PortfolioSection
      :projects="portfolioData.projects"
    />

    <!-- Testimonials Section -->
    <TestimonialsSection
      :testimonials="portfolioData.testimonials"
    />

    <!-- Contact Section -->
    <ContactSection
      :social-links="portfolioData.socialLinks"
    />

    <!-- Footer -->
    <footer class="py-8 px-6 border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div class="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {{ currentYear }} {{ portfolioData.personal.name }}. Toate drepturile rezervate.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import portfolioData from '../data/portfolio.json'

// Navigation state
const isScrolled = ref(false)

// Theme toggle handler
const toggleTheme = () => {
  if (typeof window !== 'undefined') {
    const html = document.documentElement
    const isDark = html.classList.contains('dark')

    if (isDark) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
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
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const html = document.documentElement

    if (savedTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
