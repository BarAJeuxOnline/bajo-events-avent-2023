<script setup lang="ts">
import 'floating-vue/dist/style.css'
import '~/styles/main.css'

const { auth } = useSupabaseClient()

auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_OUT')
    navigateTo('/')
})

const { isReady } = storeToRefs(useDiscord())
useAvent()

useSeoMeta({
  title: 'Calendrier de l\'avent 2023 - Bar à Jeu Online.',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage v-if="isReady" />
  </NuxtLayout>
</template>
