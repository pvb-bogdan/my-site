import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '@fontsource-variable/nunito/index.css',
    '~/assets/css/tailwind.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/seo', '@nuxt/image', '@nuxtjs/i18n', '@nuxt/icon'],

  // Icons come from the locally installed Iconify JSON sets (Lucide for UI, Simple Icons
  // for brands) and render as inline SVG, so nothing is fetched from api.iconify.design.
  icon: {
    mode: 'svg',
    serverBundle: 'local',
    fallbackToApi: false,
    clientBundle: {
      // Icon names stored in data/*.json are found by the scan as well
      scan: {
        globInclude: ['components/**/*.vue', 'pages/**/*.vue', 'error.vue', 'data/**/*.json'],
        globExclude: ['node_modules', 'dist', '.nuxt', '.output']
      }
    }
  },

  i18n: {
    restructureDir: '.',
    strategy: 'prefix_except_default',
    defaultLocale: 'ro',
    locales: [
      {
        code: 'ro',
        language: 'ro-RO',
        name: 'Romana',
        file: 'ro.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    baseUrl: 'https://petrebogdan.com'
  },

  site: {
    url: 'https://petrebogdan.com',
    name: 'Bogdan Petre'
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    enabled: true,
    allow: ['/'],
  },

  app: {
    head: {
      title: 'Bogdan Petre – Web & Print Designer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Lets the browser render scrollbars and form controls in the active theme
        { name: 'color-scheme', content: 'light dark' },
        {
          name: 'description',
          content:
            'Portfolio of Bogdan Petre, web & print designer with 15+ years of experience: websites, catalogs, menus and brand identities.'
        },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      script: [
        {
          // Runs before first paint so the saved (or OS) theme is applied without a light flash
          innerHTML:
            "(function(){try{var savedTheme=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;if(savedTheme==='dark'||(!savedTheme&&prefersDark)){document.documentElement.classList.add('dark')}}catch(error){}})()",
          tagPosition: 'head'
        }
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