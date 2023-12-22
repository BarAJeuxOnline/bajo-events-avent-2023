import vsharp from 'vite-plugin-vsharp'
import pkg from './package.json'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  target: 'server',

  runtimeConfig: {
    public: {
      SENTRY_DSN: process.env.NUXT_PUBLIC_SENTRY_DSN || null,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      guildId: process.env.NUXT_PUBLIC_DISCORD_GUILD_ID || null,
    },
  },

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@pinia/nuxt',
  ],

  imports: {
    // presets: [
    //   {
    //     from: '@vueuse/core',
    //     imports: ['set', 'get'],
    //   }
    // ],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    // preset: 'node-server',
    output: {
      dir: './dist',
    },
    sourceMap: false,
    externals: {
      external: Object.keys(pkg.dependencies),
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
    plugins: [
      vsharp(),
    ],
  },

  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_KEY || '',
    redirect: true,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/avent', '/avent/welldone', '/public/*'],
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
})
