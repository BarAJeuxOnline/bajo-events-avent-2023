import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const { data, error } = await client.from('event_avent_calendar').select().order('total_tickets', { ascending: false })

  if (error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot load calendars',
    })

  return {
    calendars: data || [],
  }
})