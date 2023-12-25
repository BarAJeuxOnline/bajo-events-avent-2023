import pkg from './package.json'

export default defineNuxtConfig({
  extends: ['@bajo-avent/shared'],

  modules: [
    '@nuxtjs/supabase',
  ],

  ssr: false,

  runtimeConfig: {
    public: {
      SENTRY_DSN: process.env.NUXT_PUBLIC_SENTRY_DSN || null,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      guildId: process.env.NUXT_PUBLIC_DISCORD_GUILD_ID || null,
    },
  },

  nitro: {
    sourceMap: false,
    externals: {
      external: Object.keys(pkg.dependencies),
    },
  },

  app: {
    head: {
      meta: [
        { name: 'description', content: 'Admin Avent 2023' },
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
