import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/database.types'

// TODO: improve this
// Gifts codes aren't stored in the database, so we need to hardcode them here
const GIFT_CODES = [
  'QWERTY',
  'QWERTY2',
  'QWERTY3',
]

export default eventHandler(async (event) => {
  const tas = await readBody(event)
  const client = serverSupabaseServiceRole<Database>(event)

  if (!tas?.length)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
    })

  const { data: { users }, errorUsers } = await client.auth.admin.listUsers()
  const { data: calendars, errorCalendar } = await client
    .from('event_avent_calendar').select()

  if (errorUsers || errorCalendar)
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot load users or calendars',
    })
  
  const toUpsert = []
  
  users.forEach(({ id }) => {
    const calendar = calendars.find(c => c.user === id)

    if (calendar) {
      if (tas.includes(id)) {
        const position = tas.findIndex(winnerId => winnerId === id)

        if (position !== false && !GIFT_CODES[position])
          throw createError({
            statusCode: 400,
            statusMessage: 'Invalid gift code',
          })

        toUpsert.push({
          id: calendar.id,
          win_position: position + 1,
          bga_gift_code: GIFT_CODES[position],
        })
      } else {
        toUpsert.push({
          id: calendar.id,
          win_position: tas.length + 1,
        })
      }
    }
  })

  const { data, error } = await client
    .from('event_avent_calendar')
    .upsert(toUpsert)

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot save calendars',
    })
  }

  return {
    data,
    toUpsert,
  }
})
