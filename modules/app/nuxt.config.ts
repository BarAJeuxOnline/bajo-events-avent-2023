import vsharp from 'vite-plugin-vsharp'
import pkg from './package.json'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-icon',
  ],

  ssr: false,

  runtimeConfig: {
    public: {
      SENTRY_DSN: process.env.NUXT_PUBLIC_SENTRY_DSN || null,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      guildId: process.env.NUXT_PUBLIC_DISCORD_GUILD_ID || null,
    },
  },

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    sourceMap: false,
    externals: {
      external: Object.keys(pkg.dependencies),
    },
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
    },
    plugins: [
      vsharp(),
    ],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Calendrier de l`avent du Bar à jeux online' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_KEY || '',
    redirect: true,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/avent', '/avent/calendar', '/public/*'],
    },
    cookieName: 'bajo',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true,
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },

  devtools: {
    enabled: true,
    experimental: {
      timeline: true,
    },
  },
})
