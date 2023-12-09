<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const home = computed(() => user.value ? '/avent' : '/')

async function logout() {
  const { error } = await client.auth.signOut()
  if (error)
    return console.error(error)
  navigateTo('/')
}
</script>

<template>
  <SectionContainer :padding="false" fixed top-0 z-200 w-full bg-beige-500 text-white shadow-lg>
    <div h-16 flex justify-between>
      <nav>
        <NuxtLink :to="home">
          <Icon name="i-mdi-home" />
        </NuxtLink>

        <button
          v-if="user"
          btn
          @click.prevent="() => logout()"
        >
          se déconnecter
        </button>
      </nav>
    </div>
  </SectionContainer>
</template>
