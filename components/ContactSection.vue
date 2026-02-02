<template>
  <section id="contact" class="px-6 py-20 bg-gray-100 dark:bg-gray-800/50">
    <div class="container max-w-4xl mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold md:text-5xl">{{ t('contact.title') }}</h2>
        <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="p-8 bg-white border border-gray-200 shadow-2xl md:p-12 rounded-xl dark:bg-gray-900 dark:border-gray-800">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm font-medium">{{ t('contact.form.name') }}</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            :class="[
              'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 dark:bg-gray-800',
              formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
            ]"
            :placeholder="t('contact.form.namePlaceholder')"
          />
        </div>

        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium">{{ t('contact.form.email') }}</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :class="[
              'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 dark:bg-gray-800',
              formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
            ]"
            :placeholder="t('contact.form.emailPlaceholder')"
          />
        </div>

        <div class="mb-6">
          <label for="message" class="block mb-2 text-sm font-medium">{{ t('contact.form.message') }}</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="6"
            :class="[
              'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none bg-gray-50 dark:bg-gray-800',
              formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
            ]"
            :placeholder="t('contact.form.messagePlaceholder')"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full px-8 py-4 font-semibold text-white transition-all duration-200 transform bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-xl"
        >
          {{ t('contact.form.submit') }}
        </button>
      </form>

      <!-- Social Links -->
      <div class="mt-12 text-center">
        <p class="mb-6 text-gray-600 dark:text-gray-400">{{ t('contact.social') }}</p>
        <div class="flex justify-center space-x-6">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-12 h-12 transition-all duration-200 transform bg-white border border-gray-200 rounded-lg hover:scale-110 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white dark:bg-gray-800 dark:hover:bg-indigo-600 dark:border-gray-700 dark:hover:border-indigo-500"
            :aria-label="social.name"
          >
            <span class="text-xl">{{ social.icon }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface SocialLink {
  name: string
  icon: string
  url: string
}

defineProps<{
  socialLinks: SocialLink[]
}>()

// Contact form
const form = ref({
  name: '',
  email: '',
  message: ''
})

const formErrors = ref({
  name: false,
  email: false,
  message: false
})

const { t } = useI18n()

// Form submission handler
const handleSubmit = () => {
  // Simple validation
  formErrors.value = {
    name: !form.value.name,
    email: !form.value.email || !isValidEmail(form.value.email),
    message: !form.value.message
  }

  // Check if form is valid
  if (!Object.values(formErrors.value).some(error => error)) {
    console.log('Form submitted:', form.value)
    // Reset form
    form.value = { name: '', email: '', message: '' }
    alert(t('contact.form.success'))
  }
}

// Email validation helper
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>
