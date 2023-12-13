interface DiscordUser {
  id: string
  username: string
  discriminator: string
  global_name: string
  avatar: string
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  banner?: string
  accent_color?: number
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premium_type?: number
  public_flags?: number
  avatar_decoration?: string
}

interface DiscordGuildMember {
  user?: DiscordUser
  nick?: string
  avatar?: string
  roles: string[]
  joined_at: string // ISO8601 timestamp
  premium_since?: string // ISO8601 timestamp
  deaf: boolean
  mute: boolean
  flags: number
  pending?: boolean
  permissions?: string
  communication_disabled_until?: string // ISO8601 timestamp
}

// rôles ids are public on discord so is not a problem to put them here as constants
const CALENDAR_ROLE_ID = '1180161464812703944'
const STAFF_ROLE_ID = '818112629607235594'
const OWNER_ROLE_ID = '697549192985444382'

export const useDiscord = defineStore('discord', () => {
  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()

  const guildId = useRuntimeConfig().public.guildId
  const member = ref<DiscordGuildMember | null>(null)
  const loading = ref(false)
  const tentative = ref(0)

  // const isAdmin = computed(() => member.value?.permissions ? (Number.parseInt(member.value?.permissions) & 0x8) === 0x8 : false)
  const isOwner = computed(() => member.value?.roles?.includes(OWNER_ROLE_ID))
  const isStaff = computed(() => member.value?.roles?.includes(STAFF_ROLE_ID))
  const isAventGranted = computed(() => member.value?.roles?.includes(CALENDAR_ROLE_ID) || isStaff.value || isOwner.value)
  const nickname = computed(() => member.value?.nick || member.value?.user?.global_name || 'un lutin')
  const avatarUrl = computed(() => user.value?.user_metadata?.avatar_url || null)

  async function loadGuildMember(providerToken?: string | null): Promise<void> {
    loading.value = true
    tentative.value += 1

    const token = providerToken || await getToken()

    try {
      if (!token)
        throw new Error('401: Unauthorized')

      const response = await fetch(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const result = await response.json()

      if (response.status >= 400 && response.status < 500) {
        if (response.status === 429)
          return retryAfter(result?.retry_after || 60 * 1000)

        else if (response.status === 401 || response.status === 403)
          return logout()
      }

      if (result && result.user?.id)
        await saveGuildMember(result)

      else
        return logout()
    }
    catch (error) {
      if (import.meta.env.DEV)
        console.error('an error occured', error)

      if (error.message === '401: Unauthorized' || error.message === '403: Unauthorized')
        return logout()

      else if (error.message === 'You are being rate limited.')
        return retryAfter(error.retry_after || 60 * 1000)

      else
        loading.value = false
    }
  }

  async function retryAfter(after: number): Promise<void> {
    if (tentative.value < 3) {
      await new Promise(resolve => setTimeout(resolve, (after * 1000) + 1000))
      console.warn('try to retry fetching discord after ratelimit:', after)
      return loadGuildMember()
    }

    return logout()
  }

  async function signin() {
    const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`
    await auth.signInWithOAuth({ provider: 'discord', options: { redirectTo, scopes: 'guilds, guilds.members.read' } })
  }

  async function logout() {
    await auth.signOut()
    $reset()
  }

  async function saveGuildMember(guildMember: DiscordGuildMember | null): Promise<void> {
    await auth.updateUser({
      data: {
        guildMember: guildMember || undefined,
      },
    })

    member.value = guildMember
    loading.value = false
  }

  async function getToken() {
    try {
      const { data } = await auth.getSession()
      return data?.session?.provider_token
    }
    catch (error) {
      console.error(error)
    }
  }

  function $reset() {
    member.value = null
    tentative.value = 0
    loading.value = false
  }

  auth.onAuthStateChange(async (event, session) => {
    // we are updating metadata only when the user is logged in
    if (import.meta.env.DEV)
      console.info('auth.onAuthStateChange', event, session)

    const { provider_token, user } = session || {}
    const guildMember = user?.user_metadata.guildMember

    if (event === 'SIGNED_IN' && !loading.value && !member.value)
      await useAsyncData('member', () => loadGuildMember(provider_token))

    if (event === 'USER_UPDATED') {
      if (guildMember)
        member.value = guildMember
      else
        await logout()
    }

    if (event === 'INITIAL_SESSION' && guildMember)
      member.value = guildMember

    else if (event === 'SIGNED_OUT')
      $reset()
  })

  return {
    loading,
    tentative,
    user,
    member,
    isOwner,
    isStaff,
    isAventGranted,
    avatarUrl,
    nickname,
    signin,
    logout,
    $reset,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDiscord, import.meta.hot))
