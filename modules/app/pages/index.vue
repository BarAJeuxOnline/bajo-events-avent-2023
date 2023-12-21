<script setup lang="ts">
definePageMeta({
  name: 'Home',
  layout: 'default',
})

const { user, nickname, isAventGranted, member, loading } = storeToRefs(useDiscord())
</script>

<template>
  <SectionContainer :style="`background-image: url(img/background-00${Math.floor(Math.random() * 2) + 1}.webp);`" h-full min-h-2xl bg-cover>
    <Login v-if="!user" relative />

    <div v-else-if="loading" h-screen flex items-center justify-center>
      <Loader />
    </div>

    <div v-else-if="member">
      <h1 text-white text-shadow-lg>
        Calendrier de l'avent 2023
      </h1>

      <Card mt-8>
        <h3 mb-8 text-center>
          Hello ! {{ nickname }} <Icon name="i-twemoji-party-popper" mt--1 />
        </h3>

        <div v-if="isAventGranted" text-center>
          <p>
            Tu participes au calendrier de l'avent du Bar à Jeu Online.<br>
            Découvre le calendrier et inscrit toi à la tombola de Noel.
          </p>
          <p>
            <button
              bg-blue-600 text-white shadow-md btn
              @click="() => navigateTo('/avent')"
            >
              <Icon name="i-twemoji-party-popper" mr-2 /> Découvrir le calendrier de l'avent
            </button>
          </p>
        </div>

        <div v-else>
          <p alert variant-danger>
            Il semblerait que tu n'as pas encore accès au calendrier de l'avent 2023 car le rôle associé ne t'a pas été attribué sur le discord du Bar à Jeux Online.
          </p>
          <p>
            <strong>La condition d'accès est:</strong><br>
            - avoir participé au moins une fois au calendrier de l'avent entre le 1er et le 23 décembre 2023 (bonne ou mauvaise réponse)
          </p>
          <p>
            Si c'est ton cas, mais que tu n'as pas reçu le rôle, cela peut être un oubli de notre part, dans ce cas, contacte le staff sur le discord du Bar à Jeu Online pour y remédier.
          </p>
          <p>
            <NuxtLink
              href="https://discord.gg/bar-a-jeux-online-691614580945715231"
              external bg-blue-600 text-white shadow-md btn
            >
              <Icon name="i-mdi-discord" mr-2 /> Aller sur le Bar à Jeu Online.
            </Nuxtlink>
          </p>
        </div>
      </Card>
    </div>
  </SectionContainer>
</template>
