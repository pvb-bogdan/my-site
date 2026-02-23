import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
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

  seo: {
    name: 'Petre Bogdan - Web Designer & Frontend Developer',
    description: 'Personal portfolio of Petre Bogdan - Web Designer and Frontend Developer specializing in Vue, Nuxt, and modern web technologies.',
    url: 'https://petrebogdan.com',
    image: 'https://petrebogdan.com/og-image.png',
  },

  app: {
    head: {
      title: 'Petre Bogdan - Web Designer & Frontend Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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

  modules: ['@nuxtjs/seo'],
})
