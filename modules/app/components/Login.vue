<script setup lang="ts">
const { signin } = useDiscord()
</script>

<template>
  <SectionContainer>
    <h1 text-white text-shadow-lg>
      BAJO Connect
    </h1>

    <Card mt-8>
      <h5 mx-auto max-w-md>
        Connecte toi avec ton compte Discord pour accéder au calendrier de l'avent 2023 du BAJO <Icon name="i-twemoji-party-popper" />
      </h5>

      <p mx-auto mt-8 max-w-md>
        <button
          w-full bg-blue-600 text-white btn
          @click.prevent="() => signin()"
        >
          <Icon name="i-mdi-discord" label="Discord" mr-2 /> Je me connecte avec Discord
        </button>
      </p>

      <p mt-16 text-center text-help>
        Ce site ainsi que la base de donnée s'auto détruira automatiquement après le passage de l'homme en rouge. <Icon name="i-twemoji-christmas-tree" label="Discord" mr-2 />
      </p>
    </Card>
  </SectionContainer>
</template>
