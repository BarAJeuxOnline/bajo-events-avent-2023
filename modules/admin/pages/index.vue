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
    <div row-container gap-4>
      <p>
        <NuxtLink to="/dashboard" btn>
          <Icon name="i-mdi-monitor-dashboard" mr-4 />Dashboard
        </NuxtLink>
      </p>
      <p>
        <NuxtLink to="/tas" btn>
          <Icon name="i-mdi-dice"  mr-4  />TAS
        </NuxtLink>
      </p>
    </div>
  </SectionContainer>
</template>