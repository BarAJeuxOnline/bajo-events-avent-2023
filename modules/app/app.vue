<script setup lang="ts">
import 'floating-vue/dist/style.css'
import '~/styles/main.css'

const { auth } = useSupabaseClient()

auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_OUT')
    navigateTo('/')
})

useDiscord()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
