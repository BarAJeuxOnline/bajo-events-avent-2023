import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { CORS } from 'https://deno.land/x/oak_cors@v0.1.1/mod.ts'
import { getClient, getUser } from '../_shared/client.ts'
import { CODES } from '../_shared/codes.ts'

function isNewYear() {
  const date = new Date()
  const year = date.getFullYear()

  if (year >= 2024)
    return true
  else
    return false
}

async function getPayload(context: any) {
  const body = context.request.body()

  if (body.type === 'json') {
    return await body.value
  }
  else if (body.type === 'form') {
    const pairs = await body.value
    const payload: any = {}

    for (const [key, value] of pairs)
      payload[key] = value

    return payload
  }
}

async function getCalendarOrCreate(client, userId: string) {
  const { data: calendar } = await client
    .from('event_avent_calendar')
    .select()
    .eq('user', userId)
    .maybeSingle()

  if (!calendar) {
    const { data: newCalendar } = await client
      .from('event_avent_calendar')
      .insert({
        user: userId,
        codes: [],
      })
      .select()
      .single()

    if (!newCalendar)
      throw new Error('Calendar not found, cannot create new one')

    return newCalendar
  }

  return calendar
}

function validateCodes(codes: string[]) {
  const validatedCodes: string[] = []

  codes.forEach((code, index) => {
    if (code && CODES[index] === code)
      validatedCodes[index] = code
  })

  return validatedCodes
}

const router = new Router()
router
  .get('/avent-api', (context) => {
    context.response.body = 'Hello world! Happy Avent!'
  })
  .post('/avent-api/codes', async (context) => {
    try {
      const client = getClient(context)
      const user = await getUser(context)

      if (!user)
        throw new Error('User not found')

      const payload = await getPayload(context)
      const codes = payload?.codes

      if (!codes || !Array.isArray(codes)) {
        throw new Error('Invalid codes')
      }
      else {
        const calendar = await getCalendarOrCreate(client, user.id)
        const validatedCodes = validateCodes(codes)

        if (!calendar)
          throw new Error('Calendar not found')

        const { data: updatedCalendar, error } = await client
          .from('event_avent_calendar')
          .update({
            codes,
            ...(isNewYear()
              ? {}
              : {
                  validated_codes: validatedCodes,
                  nbr_tickets: validatedCodes.filter(v => !!v).length,
                  completed: validatedCodes.filter(v => !!v).length === 24,
                  total_tickets: validatedCodes.filter(v => !!v).length + (calendar.gold_ticket ? 5 : 0),
                }),
          })
          .eq('id', calendar.id)
          .select()
          .single()

        if (error) {
          throw new Error(error.message)
        }
        else {
          context.response.headers.set('Content-Type', 'application/json')
          context.response.body = JSON.stringify(updatedCalendar)
        }
      }
    }
    catch (error) {
      context.response.status = 400
      context.response.body = error.message
    }
  })
  .post('/avent-api/gold', async (context) => {
    try {
      const client = getClient(context)
      const user = await getUser(context)

      if (!user) { throw new Error('User not found') }

      else {
        const calendar = await getCalendarOrCreate(client, user.id)

        const payload = await getPayload(context)
        const gold = payload?.gold

        if (!gold)
          throw new Error('Invalid gold')
        else if (atob(gold) !== `100 patates ${user.id}`)
          throw new Error('Invalid gold')

        if (calendar.gold_ticket)
          throw new Error('Gold ticket already used')

        if (isNewYear())
          throw new Error('Happy new year !! you can\'t validate gold ticket anymore')

        const { data: updatedCalendar, error } = await client
          .from('event_avent_calendar')
          .update({
            gold_ticket: true,
            total_tickets: calendar.nbr_tickets + 5,
          })
          .eq('id', calendar.id)
          .select()
          .single()

        if (error) {
          throw new Error(error.message)
        }
        else {
          context.response.headers.set('Content-Type', 'application/json')
          context.response.body = JSON.stringify(updatedCalendar)
        }
      }
    }
    catch (error) {
      context.response.status = 400
      context.response.body = error.message
    }
  })

const app = new Application()

app.use(CORS({
  origin: '*',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
}))

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
