<template>
  <section id="contact" :class="[
    'py-20 px-6',
    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
  ]">
    <div class="container mx-auto max-w-4xl">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
        <p :class="[
          'text-xl max-w-2xl mx-auto',
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        ]">
          Have a project in mind? Let's work together to create something amazing
        </p>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" :class="[
        'p-8 md:p-12 rounded-xl shadow-2xl border',
        isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      ]">
        <div class="mb-6">
          <label for="name" class="block text-sm font-medium mb-2">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            :class="[
              'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all',
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
              formErrors.name ? 'border-red-500 focus:ring-red-500' : (isDarkMode ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500')
            ]"
            placeholder="Your name"
          />
        </div>

        <div class="mb-6">
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :class="[
              'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all',
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
              formErrors.email ? 'border-red-500 focus:ring-red-500' : (isDarkMode ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500')
            ]"
            placeholder="your.email@example.com"
          />
        </div>

        <div class="mb-6">
          <label for="message" class="block text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="6"
            :class="[
              'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none',
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
              formErrors.message ? 'border-red-500 focus:ring-red-500' : (isDarkMode ? 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500')
            ]"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Send Message
        </button>
      </form>

      <!-- Social Links -->
      <div class="mt-12 text-center">
        <p :class="[
          'mb-6',
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        ]">Or connect with me on social media</p>
        <div class="flex justify-center space-x-6">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 border',
              isDarkMode ? 'bg-gray-800 hover:bg-indigo-600 border-gray-700 hover:border-indigo-500' : 'bg-white hover:bg-indigo-600 border-gray-200 hover:border-indigo-500 hover:text-white'
            ]"
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

interface SocialLink {
  name: string
  icon: string
  url: string
}

const props = defineProps<{
  socialLinks: SocialLink[]
  isDarkMode: boolean
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
    alert('Thank you for your message! I will get back to you soon.')
  }
}

// Email validation helper
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>
