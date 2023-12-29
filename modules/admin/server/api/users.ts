import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const { data: { users }, error } = await client.auth.admin.listUsers()

  return {
    error,
    users,
  }
})