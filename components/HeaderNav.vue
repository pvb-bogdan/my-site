<template>
  <header
    class="site-header"
    :data-scrolled="isScrolled ? '' : undefined"
    :data-menu-open="mobileMenuOpen ? '' : undefined">
    <div class="container px-6 py-4 mx-auto">
      <div class="flex items-center justify-between">
        <!-- Logo (Left) -->
        <a
          href="#hero"
          :aria-label="t('aria.goHome', { name: fullName })"
          :title="fullName"
          class="z-10 flex items-center justify-center text-2xl text-blue-600 transition-colors rounded-lg min-w-11 min-h-11 dark:text-sky-400 hover:text-blue-500 dark:hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
          @click.prevent="handleLinkClick('#hero')"
        >
          <strong>pb</strong>
        </a>

        <!-- Desktop Navigation (Center) -->
        <div class="absolute hidden -translate-x-1/2 xl:flex left-1/2">
          <nav class="nav">
            <div class="bubble hover" ref="hoverBubble"></div>
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :aria-current="activeLink === link.href ? 'location' : undefined"
              :class="{ 'active': activeLink === link.href }"
              @click.prevent="handleLinkClick(link.href)"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>

        <!-- Language + Theme (Right) -->
        <div class="items-center hidden gap-3 xl:flex">
          <LocaleSwitch />
          <ThemeToggle />
        </div>

        <!-- Mobile Menu & Theme Toggle -->
        <div class="flex items-center gap-2 xl:hidden">
          <LocaleSwitch />
          <ThemeToggle />

          <button
            type="button"
            class="flex items-center justify-center text-gray-700 transition-colors min-w-11 min-h-11 hover:text-blue-600 dark:text-gray-300 dark:hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            :aria-controls="mobileNavigationId"
            :aria-expanded="mobileMenuOpen"
            :aria-label="mobileMenuOpen ? t('aria.closeMenu') : t('aria.openMenu')"
            @click="mobileMenuOpen = !mobileMenuOpen"
            @keydown.esc="mobileMenuOpen = false"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav
        :id="mobileNavigationId"
        v-if="mobileMenuOpen"
        :aria-label="t('aria.mobileNavigation')"
        class="pt-4 pb-4 mt-4 space-y-4 border-t border-gray-200 xl:hidden dark:border-gray-800 mobile-menu-enter"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :aria-current="activeLink === link.href ? 'location' : undefined"
          :class="{
            'block transition-all duration-200 px-4 py-3 rounded-lg font-medium': true,
            // Solid blue-600 keeps white text above 4.5:1 (the cyan end of the old gradient did not)
            'text-white bg-blue-600 shadow-md': activeLink === link.href,
            'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2': activeLink !== link.href
          }"
          @click.prevent="handleLinkClick(link.href); handleMobileClick()"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface NavLink {
  label: string
  href: string
}

const props = defineProps<{
  fullName: string
  navLinks: NavLink[]
  isScrolled: boolean
}>()

const { t } = useI18n()

const mobileMenuOpen = ref(false)
const mobileNavigationId = 'mobile-navigation'
const hoverBubble = ref<HTMLElement | null>(null)
const activeLink = ref<string>('')
let intersectionObserver: IntersectionObserver | null = null

// Utility function to calculate bubble position for hover effect
const setBubblePosition = (bubble: HTMLElement, target: HTMLElement, nav: Element) => {
  const rect = target.getBoundingClientRect()
  const navRect = nav.getBoundingClientRect()
  bubble.style.left = `${rect.left - navRect.left}px`
  bubble.style.top = `${rect.top - navRect.top}px`
  bubble.style.width = `${rect.width}px`
  bubble.style.height = `${rect.height}px`
}

const updateActiveLink = (href: string) => {
  activeLink.value = href

  if (window.location.hash !== href) {
    window.history.replaceState(null, '', href)
  }
}

const handleLinkClick = (href: string) => {
  const target = document.querySelector<HTMLElement>(href)
  if (target) {
    updateActiveLink(href)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }
}

const handleMouseEnter = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement | null

  if (hoverBubble.value && target) {
    const nav = target.closest('.nav')
    if (nav) {
      setBubblePosition(hoverBubble.value, target, nav)
      hoverBubble.value.style.opacity = '1'
    }
  }
}

const handleMouseLeave = () => {
  if (hoverBubble.value) {
    hoverBubble.value.style.opacity = '0'
  }
}

const handleMobileClick = () => {
  mobileMenuOpen.value = false
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    mobileMenuOpen.value = false
  }
}

const handleResize = () => {
  if (window.innerWidth >= 1280) {
    mobileMenuOpen.value = false
  }
}

const initializeActiveLink = () => {
  const fallbackLink = props.navLinks[0]?.href ?? ''
  const currentHash = window.location.hash

  activeLink.value = props.navLinks.some((link) => link.href === currentHash)
    ? currentHash
    : fallbackLink
}

// Initialize Intersection Observer to track active section
const initializeIntersectionObserver = () => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  }

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')
        activeLink.value = id ? `#${id}` : ''
      }
    })
  }, options)

  // Observe all section elements
  props.navLinks.forEach((link) => {
    const sectionId = link.href.substring(1) // Remove the '#' from href
    const element = document.getElementById(sectionId)
    if (element && intersectionObserver) {
      intersectionObserver.observe(element)
    }
  })
}

onMounted(() => {
  initializeActiveLink()
  initializeIntersectionObserver()
  window.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  window.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.nav {
  position: relative;
  display: flex;
  gap: 8px;
}

.nav a {
  z-index: 10;
  position: relative;
  display: inline-block;
  padding: 12px 24px;
  color: rgb(75 85 99);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
}

.nav a:focus-visible {
  outline: 2px solid rgb(59 130 246);
  outline-offset: 2px;
}

.dark .nav a {
  color: rgb(209 213 219);
}

/* Active link styling using .active class (cross-browser compatible) */
.nav a.active {
  color: white;
  /* blue-700 → sky-600 keeps white text above 4.5:1 across the whole pill */
  background: linear-gradient(to right, rgb(29 78 216), rgb(2 132 199));
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.dark .nav a.active {
  color: white;
  background: linear-gradient(to right, rgb(29 78 216), rgb(2 132 199));
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.5);
}

.bubble {
  position: absolute;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  pointer-events: none;
}

.bubble.hover {
  z-index: 0;
  background: rgb(229 231 235 / 0.8);
  opacity: 0;
}

.dark .bubble.hover {
  background: rgb(55 65 81 / 0.8);
}

.site-header {
  @apply fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out;
  @apply bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl;
  @apply border-b border-white/20 dark:border-gray-700/30;
  @apply shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)];
  @apply rounded-none;
}

/* Mobile scrolled: shrink into a floating pill */
.site-header[data-scrolled] {
  left: 1rem;
  right: 1rem;
  @apply border rounded-full;
}

/* Mobile: revert to full-width rectangle when menu is open, instantly */
@media (max-width: 1279px) {
  .site-header[data-scrolled][data-menu-open] {
    left: 0;
    right: 0;
    border-radius: 0;
    transition-duration: 0ms;
  }
}

@screen xl {
  /* Desktop initial: transparent full-width bar */
  .site-header {
    @apply top-2 left-0 right-0 bg-transparent dark:bg-transparent backdrop-blur-none border-none shadow-none rounded-none;
  }

  /* Desktop scrolled: centred pill matching content width */
  .site-header[data-scrolled] {
    left: max(1.5rem, calc(50% - 600px));
    right: max(1.5rem, calc(50% - 600px));
    @apply rounded-full bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl;
    @apply border border-white/20 dark:border-gray-700/30;
    @apply shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)];
  }
}
</style>
