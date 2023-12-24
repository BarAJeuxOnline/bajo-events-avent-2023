import type { Database } from '@/types/database.types'

interface Calendar {
  codes: string[] | null
  completed: boolean
  created_at: string
  gold_ticket: boolean
  id: string
  nbr_tickets: number | null
  total_tickets: number
  user: string
  validated_codes: string[] | null
  win_position: number | null
}

export const useAvent = defineStore('avent', () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient<Database>()

  const {
    isAventGranted,
  } = storeToRefs(useDiscord())

  const loading = ref(false)
  const updating = ref(false)
  const calendar = ref<Calendar | null>(null)

  async function loadAvent() {
    loading.value = true

    const { data, error } = await client
      .from('event_avent_calendar')
      .select('*')
      .eq('user', user.value?.id)
      .maybeSingle()

    if (error)
      console.error('cannot load user\'s calendar: ', error.message)

    else if (data)
      calendar.value = data

    loading.value = false
  }

  async function updateCodes(codes: string[]) {
    updating.value = true

    try {
      const { data, error } = await client.functions.invoke('avent-api/codes', {
        method: 'POST',
        body: {
          codes,
        },
      })

      if (error)
        throw error

      if (data)
        calendar.value = data
    }
    catch (error) {
      console.error(error)
    }

    updating.value = false
  }

  async function updateCodes(codes: string[]) {
    updating.value = true

    try {
      const { data, error } = await client.functions.invoke('avent-api/codes', {
        method: 'POST',
        body: {
          codes,
        },
      })

      if (error)
        throw error

      if (data)
        calendar.value = data
    }
    catch (error) {
      console.error(error)
    }

    updating.value = false
  }

  async function getGoldenTicket() {
    updating.value = true

    try {
      const { data, error } = await client.functions.invoke('avent-api/gold', {
        method: 'POST',
        body: {
          gold: btoa(`100 patates ${user.value?.id}`),
        },
      })

      if (error)
        throw error

      if (data)
        calendar.value = data
    }
    catch (error) {
      console.error(error)
    }

    updating.value = false
  }

  function $reset() {
    loading.value = false
    calendar.value = null
    updating.value = false
  }

  whenever(isAventGranted, loadAvent, { immediate: true })

  return {
    loading,
    updating,
    calendar,
    getGoldenTicket,
    updateCodes,
    $reset,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAvent, import.meta.hot))
