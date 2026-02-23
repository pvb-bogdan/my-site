import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '@fontsource-variable/nunito',
    '~/assets/css/tailwind.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/seo'],

  seo: {
    site: {
      url: 'https://petrebogdan.com',
      name: 'Petre Bogdan - Web Designer & Frontend Developer'
    },

    sitemap: {
      enabled: true,
    },

    robots: {
      enabled: true,
      rules: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  },

  app: {
    head: {
      title: 'Petre Bogdan - Web Designer & Frontend Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Personal portfolio of Petre Bogdan - Web Designer and Frontend Developer specializing in Vue, Nuxt, and modern web technologies.'
        },
        {
          property: 'og:title',
          content: 'Petre Bogdan - Web Designer & Frontend Developer'
        },
        {
          property: 'og:description',
          content:
            'Personal portfolio of Petre Bogdan - Web Designer and Frontend Developer specializing in Vue, Nuxt, and modern web technologies.'
        },
        {
          property: 'og:image',
          content: 'https://petrebogdan.com/og-image.png'
        },
        {
          property: 'og:url',
          content: 'https://petrebogdan.com'
        },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ],
    },
  },
})