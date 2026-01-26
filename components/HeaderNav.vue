<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-900/50 data-[scrolled]:bg-white/95 data-[scrolled]:dark:bg-gray-900/95 data-[scrolled]:shadow-lg"
    :data-scrolled="isScrolled ? '' : undefined">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#hero" class="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
          {{ name }}
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8 items-center">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="transition-colors duration-200 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            {{ link.label }}
          </a>

          <!-- Theme Toggle Button -->
          <button
            @click="$emit('toggleTheme')"
            class="p-2 rounded-lg transition-all duration-200 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400"
            aria-label="Toggle theme"
          >
            <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu & Theme Toggle -->
        <div class="md:hidden flex items-center gap-2">
          <!-- Theme Toggle Button (Mobile) -->
          <button
            @click="$emit('toggleTheme')"
            class="p-2 rounded-lg transition-all duration-200 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400"
            aria-label="Toggle theme"
          >
            <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="transition-colors text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
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
        class="md:hidden mt-4 pb-4 space-y-4 border-t pt-4 border-gray-200 dark:border-gray-800"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="mobileMenuOpen = false"
          class="block transition-colors duration-200 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          {{ link.label }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
</script>
