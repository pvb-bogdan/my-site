<template>
  <div class="flex items-center p-0.5 rounded-lg bg-gray-200/70 dark:bg-gray-800/70" :aria-label="t('lang.switch')" role="group">
    <button
      v-for="localeCode in localeButtons"
      :key="localeCode"
      type="button"
      class="text-xs font-semibold transition-colors rounded-md min-w-11 min-h-11 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
      :class="locale === localeCode ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-sky-400'"
      :aria-pressed="locale === localeCode"
      :aria-label="localeNames[localeCode]"
      :lang="localeCode"
      @click="changeLocale(localeCode)"
    >
      {{ t(`lang.${localeCode}`) }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const localeButtons = ['ro', 'en'] as const

// Each language is named in its own language, so it is announced correctly via `lang`
const localeNames: Record<(typeof localeButtons)[number], string> = {
  ro: 'Română',
  en: 'English'
}

const changeLocale = async (nextLocale: (typeof localeButtons)[number]) => {
  if (locale.value === nextLocale) {
    return
  }

  await setLocale(nextLocale)
}
</script>
