// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'EN', file: 'en.js' },
      { code: 'es', name: 'ES', file: 'es.js' }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },
  css: ['~/assets/css/main.scss'],
  app: {
    head: {
      title: 'Yively Alvarez | Senior Frontend Developer',
      meta: [
        { name: 'description', content: 'Portfolio of Yively Alvarez, Senior Frontend Developer with 7 years of experience in Vue.js, Nuxt.js, and scaling web applications.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap' }
      ]
    }
  }
})
