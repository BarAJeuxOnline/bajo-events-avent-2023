<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value)
    navigateTo('/avent')
})

async function connect() {
  await auth.signInWithOAuth({ provider: 'discord', options: { redirectTo } })
}
</script>

<template>
  <!-- signin form with supabase and discord auth -->
  <button
    @click="() => connect()"
  >
    <Icon
      name="i-mdi-discord"
      label="Discord"
    />
  </button>
</template>
