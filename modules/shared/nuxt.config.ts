import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
   modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    'floating-vue/nuxt',
    'nuxt-icon',
  ],

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    routeRules: {
      '/*': {
        cors: true,
      },
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
    server: {
      cors: true,
    }
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    join(currentDir, './styles/main.css'),
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: join(currentDir, './components'),
      pathPrefix: false,
    },
  ],
})