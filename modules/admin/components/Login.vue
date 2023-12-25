<script setup lang="ts">
const { signin } = useDiscord()
</script>

<template>
  <SectionContainer>
    <h1 text-white text-shadow-lg>
      BAJO Connect
    </h1>

    <Card mt-8>
      <p mx-auto mt-8 max-w-md>
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
