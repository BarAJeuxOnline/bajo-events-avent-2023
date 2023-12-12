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
        Hello ! {{ nickname }}
      </h1>

      <Card>
        <template #title>
          <Icon name="i-twemoji-party-popper" label="Discord" mr-2 /> Calendrier de l'avent 2023
        </template>

        <template v-if="isAventGranted">
          <p>
            Participe au calendrier de l'avent du Bar à Jeu Online 2023.<br>
            Et inscrit toi à la tombola de Noel 2023.
          </p>
          <p text-center>
            <button
              btn bg-blue-600 text-white shadow-md
              @click="() => navigateTo('/avent')"
            >
              <Icon name="i-twemoji-party-popper" label="Discord" mr-2 /> Ouvrir le calendrier de l'avent
            </button>
          </p>
          <figure relative p-4>
            <NuxtLink to="/avent">
              <img
                src="https://cdn.discordapp.com/attachments/800014103481417747/1180134982493163630/Calendrier_de_lavant_-_cases.jpg?ex=65858bd9&is=657316d9&hm=855da4a6931ba09eb31e7283072d7b4e8221be7f4c1f2f2e3950929fb042d6e7&"
                alt="Calendrier de l'avent 2023"
                max-w-md w-full rounded-2 shadow-lg
              >
            </NuxtLink>
          </figure>
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
