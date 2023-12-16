import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.SENTRY_DSN && !import.meta.env.SSR && !import.meta.env.DEV) {
    const router = useRouter()

    Sentry.init({
      app: vueApp,
      dsn: runtimeConfig.public.SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router, { routeLabel: 'path' }),
        }),
        new Sentry.Replay(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    })
  }
})
