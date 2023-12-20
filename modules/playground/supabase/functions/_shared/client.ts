import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import type { Database } from '../../../database.types'

export function getClient({ request }: { request: Request }): Database {
  try {
    return createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: request.headers.get('Authorization')! },
        },
      },
    )
  }
  catch (error) {
    if (error)
      throw error
  }
}

export async function getUser({ request }: { request: Request }) {
  try {
    const supabaseClient = getClient({ request })
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    return user
  }
  catch (error) {
    if (error)
      throw error
  }
}
