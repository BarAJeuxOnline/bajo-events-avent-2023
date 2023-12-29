<script setup lang="ts">
definePageMeta({
  name: 'Home',
  layout: 'default',
})

const { user } = storeToRefs(useDiscord())
</script>

<template>
  <Login v-if="!user" relative />
  <SectionContainer v-else text-white>
    <h1 class="text-4xl font-bold">Admin</h1>
    <p class="text-xl">Bienvenue sur l'interface d'administration du calendrier de l'avent 2023.</p>
    <p>
      <NuxtLink to="/dashboard" btn>
        Dashboard
      </NuxtLink>
    </p>
  </SectionContainer>
</template>