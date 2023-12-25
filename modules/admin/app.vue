<script setup lang="ts">
const { auth } = useSupabaseClient()

auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_OUT')
    navigateTo('/')
})

useSeoMeta({
  title: 'Admin - Calendrier de l\'avent 2023 - Bar à Jeu Online.',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
