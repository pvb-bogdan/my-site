<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-900/50 data-[scrolled]:bg-white/95 data-[scrolled]:dark:bg-gray-900/95 data-[scrolled]:shadow-lg"
    :data-scrolled="isScrolled ? '' : undefined">
    <div class="container px-6 py-4 mx-auto">
      <div class="flex items-center justify-between">
        <!-- Logo (Left) -->
        <a href="#hero" class="z-10 text-2xl font-bold text-indigo-400 transition-colors hover:text-indigo-300">
          {{ name }}
        </a>

        <!-- Desktop Navigation (Center) -->
        <div class="absolute hidden -translate-x-1/2 lg:flex left-1/2">
          <nav class="nav">
            <div class="bubble active" ref="activeBubble"></div>
            <div class="bubble hover" ref="hoverBubble"></div>
            <a
              v-for="(link, index) in navLinks"
              :key="link.href"
              :href="link.href"
              :class="{ active: activeIndex === index }"
              @click.prevent="handleLinkClick(index, link.href)"
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
            @click="$emit('toggleTheme')"
            class="p-2 text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400"
            aria-label="Toggle theme"
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
            @click="$emit('toggleTheme')"
            class="p-2 text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400"
            aria-label="Toggle theme"
          >
            <svg class="hidden w-5 h-5 dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            aria-label="Toggle menu"
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
      <div
        v-if="mobileMenuOpen"
        class="pt-4 pb-4 mt-4 space-y-4 border-t border-gray-200 lg:hidden dark:border-gray-800"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="handleMobileClick"
          class="block text-gray-700 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface NavLink {
  label: string
  href: string
}

defineProps<{
  name: string
  navLinks: NavLink[]
  isScrolled: boolean
}>()

defineEmits<{
  toggleTheme: []
}>()

const mobileMenuOpen = ref(false)
const activeIndex = ref(0)
const activeBubble = ref<HTMLElement | null>(null)
const hoverBubble = ref<HTMLElement | null>(null)

const handleLinkClick = (index: number, href: string) => {
  activeIndex.value = index
  updateActiveBubble()
  // Smooth scroll to section
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleMouseEnter = (e: Event) => {
  const target = e.target as HTMLElement
  if (hoverBubble.value && target) {
    const rect = target.getBoundingClientRect()
    const nav = target.closest('.nav')
    if (nav) {
      const navRect = nav.getBoundingClientRect()
      hoverBubble.value.style.left = `${rect.left - navRect.left}px`
      hoverBubble.value.style.top = `${rect.top - navRect.top}px`
      hoverBubble.value.style.width = `${rect.width}px`
      hoverBubble.value.style.height = `${rect.height}px`
      hoverBubble.value.style.opacity = '1'
    }
  }
}

const handleMouseLeave = () => {
  if (hoverBubble.value) {
    hoverBubble.value.style.opacity = '0'
  }
}

const updateActiveBubble = () => {
  nextTick(() => {
    const activeLink = document.querySelector('.nav a.active') as HTMLElement
    if (activeBubble.value && activeLink) {
      const rect = activeLink.getBoundingClientRect()
      const nav = activeLink.closest('.nav')
      if (nav) {
        const navRect = nav.getBoundingClientRect()
        activeBubble.value.style.left = `${rect.left - navRect.left}px`
        activeBubble.value.style.top = `${rect.top - navRect.top}px`
        activeBubble.value.style.width = `${rect.width}px`
        activeBubble.value.style.height = `${rect.height}px`
      }
    }
  })
}

const handleMobileClick = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  updateActiveBubble()
  // Update bubble position on scroll to handle active section changes
  window.addEventListener('resize', updateActiveBubble)
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
  transition: color 0.2s;
  border-radius: 12px;
}

.dark .nav a {
  color: rgb(209 213 219);
}

.nav a.active {
  color: white;
}

.dark .nav a.active {
  color: white;
}

.bubble {
  position: absolute;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  pointer-events: none;
}

.bubble.active {
  z-index: 1;
  background: linear-gradient(135deg, rgb(99 102 241), rgb(79 70 229));
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.dark .bubble.active {
  background: linear-gradient(135deg, rgb(79 70 229), rgb(67 56 202));
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.5);
}

.bubble.hover {
  z-index: 0;
  background: rgb(229 231 235 / 0.8);
  opacity: 0;
}

.dark .bubble.hover {
  background: rgb(55 65 81 / 0.8);
}
</style>
