import { Application } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()

app.use((ctx) => {
  ctx.response.body = 'Hello world!'
})

app.use(async (ctx, next) => {
  /* Do some checking of the request */
  await next()

  /* Do some finalising of the response */
  ctx.response.body = ctx.response.body += ' x2 !'
})

await app.listen({ port: 8000 })
