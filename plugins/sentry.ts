import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.SENTRY_DSN) {
    const router = useRouter()

    Sentry.init({
      dsn: runtimeConfig.public.SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router, { routeLabel: 'path' }),
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
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
