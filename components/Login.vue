<script setup lang="ts">
const { signin } = useDiscord()
</script>

<template>
  <SectionContainer>
    <div rounded-2 bg-white p-8 shadow-emerald>
      <h3>Avent 2023</h3>
      <p>
        Connecte toi avec ton compte Discord pour accéder au calendrier de l'avent 2023 spécial du BAJO <Icon name="i-twemoji-party-popper" />
      </p>

      <p text-right>
        <button
          btn bg-blue-600 text-white
          @click.prevent="() => signin()"
        >
          <Icon name="i-mdi-discord" label="Discord" mr-2 /> Discord Connect
        </button>
      </p>
    </div>
  </SectionContainer>
</template>
