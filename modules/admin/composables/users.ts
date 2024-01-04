import type { User } from '@supabase/gotrue-js/src/lib/types'

interface DiscordUser {
  id: string
  username: string
  global_name: string
  avatar: string
}

type MergedUser = User & {
  user?: DiscordUser
  nick?: string
  avatar?: string
  roles: string[]
}

interface Calendar {
  codes: string[] | null
  completed: boolean
  created_at: string
  gold_ticket: boolean
  id: string
  nbr_tickets: number | null
  total_tickets: number
  validated_codes: string[] | null
  win_position: number | null
  bga_gift_code: string | null
  user: string | MergedUser | null
}

type CalendarWithUser = Calendar & { user: MergedUser }

const STAFF_ROLE_ID = '818112629607235594'

export const useData = defineStore('data', () => {

  const { data: dataUsers, error: errorUsers, pending: pendingUsers } = useFetch('/api/users')
  const { data: dataCalendars, error: errorCalendar, pending: pendingCalendar } = useFetch('/api/calendars')
  const pending = computed(() => pendingUsers.value || pendingCalendar.value)

  const users = computed<MergedUser[]>(() => {
    // merging discord metadata and filtering out staff
    const data = dataUsers.value as { users: User[] } | null
  
    return data?.users.map(u => ({
      ...u,
      ...u.user_metadata.guildMember || {},
    })).filter(u => !u.roles?.includes(STAFF_ROLE_ID)) ?? []
  })

  const calendars = computed<Calendar[]>(() => {
    const data = dataCalendars.value as { calendars: Calendar[] } | null
  
    return data?.calendars.map(c => ({
      ...c,
      user: users.value.find(u => u.id === c.user) || null,
    })).filter(c => c.user) ?? []
  })

  function getNick(user: MergedUser): string {
    return user?.nick || user?.user?.global_name || user?.user?.username || 'un lutin'
  }

  function $reset() {
  }

  return {
    loading: pending,
    users,
    calendars,
    getNick,
    $reset,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useData, import.meta.hot))
