<template>
  <header
    class="site-header"
    :data-scrolled="isScrolled ? '' : undefined">
    <div class="container px-6 py-4 mx-auto">
      <div class="flex items-center justify-between">
        <!-- Logo (Left) -->
        <a
          href="#hero"
          :aria-label="`Go to ${fullName} home section`"
          :title="fullName"
          class="z-10 text-2xl text-indigo-500 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
          @click.prevent="handleLinkClick('#hero')"
        >
          <strong>pb</strong>
        </a>

        <!-- Desktop Navigation (Center) -->
        <div class="absolute hidden -translate-x-1/2 lg:flex left-1/2">
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

        <!-- Theme Toggle (Right) -->
        <div class="items-center hidden lg:flex">
          <button
            type="button"
            class="p-2 text-gray-700 transition-all duration-200 dark:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            aria-label="Toggle theme"
            @click="emit('toggleTheme')"
          >
            <svg class="hidden w-5 h-5 dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu & Theme Toggle -->
        <div class="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            class="p-2 text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            aria-label="Toggle theme"
            @click="emit('toggleTheme')"
          >
            <svg class="hidden w-5 h-5 dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <button
            type="button"
            class="text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
            :aria-controls="mobileNavigationId"
            :aria-expanded="mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        aria-label="Mobile navigation"
        class="pt-4 pb-4 mt-4 space-y-4 border-t border-gray-200 lg:hidden dark:border-gray-800"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :aria-current="activeLink === link.href ? 'location' : undefined"
          :class="{
            'block transition-colors duration-200': true,
            'text-white bg-gradient-to-r from-indigo-700 to-purple-600 rounded-lg px-4 py-2': activeLink === link.href,
            'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400': activeLink !== link.href
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

const emit = defineEmits<{
  (e: 'toggleTheme'): void
}>()

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
    target.scrollIntoView({ behavior: 'smooth' })
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
  if (window.innerWidth >= 1024) {
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
  outline: 2px solid rgb(99 102 241);
  outline-offset: 2px;
}

.dark .nav a {
  color: rgb(209 213 219);
}

/* Active link styling using .active class (cross-browser compatible) */
.nav a.active {
  color: white;
  background: linear-gradient(to right, rgb(67 56 202), rgb(147 51 234)); /* from-indigo-700 to-purple-600 */
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.dark .nav a.active {
  color: white;
  background: linear-gradient(to right, rgb(67 56 202), rgb(147 51 234)); /* from-indigo-700 to-purple-600 */
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.5);
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
  @apply fixed top-2 left-0 right-0 z-50 transition-all duration-700 ease-in-out;
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

@screen lg {
  /* Desktop initial: transparent full-width bar */
  .site-header {
    @apply left-0 right-0 bg-transparent dark:bg-transparent backdrop-blur-none border-none shadow-none rounded-none;
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
