<template>
  <!-- Stable label + aria-pressed (per WAI-ARIA toggle-button pattern); the tooltip names the next action -->
  <button
    type="button"
    class="flex items-center justify-center text-gray-700 transition-colors rounded-lg min-w-11 min-h-11 hover:bg-gray-200/80 dark:hover:bg-gray-800 dark:text-yellow-400 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
    :aria-label="t('aria.darkMode')"
    :aria-pressed="isDark"
    :title="isDark ? t('aria.switchToLight') : t('aria.switchToDark')"
    @click="toggleTheme"
  >
    <Icon name="lucide:sun" class="hidden w-5 h-5 dark:block" aria-hidden="true" />
    <Icon name="lucide:moon" class="w-5 h-5 dark:hidden" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()
</script>
