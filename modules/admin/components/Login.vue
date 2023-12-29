<script setup lang="ts">
const { signin } = useDiscord()
</script>

<template>
  <SectionContainer>
    <Card bg-white>
      <template #title>
        BAJO Connect
      </template>
      <p>Connection avec discord. Seul les administrateurs on accès à l'admin.</p>
      <p>
        <button
          w-full bg-blue-600 text-white btn
          @click.prevent="() => signin()"
        >
          <Icon name="i-mdi-discord" label="Discord" mr-2 /> Je me connecte avec Discord
        </button>
      </p>
    </Card>
  </SectionContainer>
</template>
