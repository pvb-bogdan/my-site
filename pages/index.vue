<template>
  <div class="min-h-screen text-gray-900 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
    <!-- Skip link: first focusable element, visible only on keyboard focus -->
    <a
      href="#main"
      class="fixed z-[200] px-4 py-3 font-semibold text-white -translate-y-24 bg-blue-600 rounded-lg shadow-lg left-4 top-4 focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
    >
      {{ t('a11y.skipToContent') }}
    </a>

    <!-- Header Navigation -->
    <HeaderNav :full-name="portfolioData.personal.fullName" :nav-links="localizedNavLinks"
      :is-scrolled="isScrolled" />

    <main id="main" tabindex="-1" class="focus:outline-none">
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
    </main>

    <!-- Footer -->
    <footer class="pt-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div class="container mx-auto mb-4 text-center">
        <!-- Kept on one line: a line break before "!" would render as a stray space -->
        <p class="text-lg text-gray-600 dark:text-gray-300">{{ t('footer.invite') }}<br />{{ t('footer.dayWish', { day: dayGreeting }) }}{{ isFriday ? ` ${t('footer.fridaySuffix')}` : '!' }}</p>
      </div>
      <div
        class="py-2 mx-auto text-sm text-center text-gray-600 bg-gray-100 rounded-lg dark:text-gray-400 dark:bg-gray-800">
        <p>&copy; {{ currentYear }} {{ portfolioData.personal.fullName }}. {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import portfolioData from '../data/portfolio.json'
import projectsData from '../data/projects.json'

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

// SEO: canonical and og:url come from @nuxtjs/seo (site.url + i18n) per locale
useSeoMeta({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDescription'),
  ogTitle: () => t('seo.homeTitle'),
  ogDescription: () => t('seo.homeDescription'),
  ogImage: {
    url: 'https://petrebogdan.com/og-image.png',
    width: 1200,
    height: 630,
    type: 'image/png'
  },
  twitterCard: 'summary_large_image'
})

useHead({
  // The SEO title already contains the name; skip the "| site name" suffix
  titleTemplate: '%s',
  htmlAttrs: {
    lang: computed(() => locale.value)
  }
})

// Lifecycle hooks
onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
