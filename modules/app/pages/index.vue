<script setup lang="ts">
definePageMeta({
  name: 'Home',
  layout: 'default',
})

const { user, nickname, isAventGranted, member, loading } = storeToRefs(useDiscord())
</script>

<template>
  <SectionContainer style="background-image: url(img/background-001.webp);" min-h-2xl bg-cover>
    <Login v-if="!user" relative />

    <div v-else-if="loading" h-screen flex items-center justify-center>
      <Loader />
    </div>

    <div v-else-if="member">
      <h1 text-white>
        Calendrier de l'avent 2023
      </h1>

      <Card mt-8>
        <h3 mb-8 text-center>
          Hello ! {{ nickname }} <Icon name="i-twemoji-party-popper" label="Discord" mr-2 mt--1 />
        </h3>
        <template v-if="isAventGranted">
          <p text-center>
            Tu participes au calendrier de l'avent du Bar à Jeu Online.<br>
            Découvre le calendrier et inscrit toi à la tombola de Noel.
          </p>
          <p text-center>
            <button
              bg-blue-600 text-white shadow-md btn
              @click="() => navigateTo('/avent')"
            >
              <Icon name="i-twemoji-party-popper" label="Discord" mr-2 /> Découvrir le calendrier de l'avent
            </button>
          </p>
        </template>
        <template v-else>
          <p>
            Il semblerait que tu n'as pas encore accès au calendrier de l'avent 2023.<br>
            Tu peux contacter le staff sur le discord du Bar à Jeu Online pour plus d'informations.
          </p>
        </template>
      </Card>
    </div>
  </SectionContainer>
</template>
