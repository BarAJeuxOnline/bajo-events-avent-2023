<script setup lang="ts">
definePageMeta({
  name: 'Avent',
  layout: 'default',
})

const {
  isAventGranted,
} = storeToRefs(useDiscord())

if (!isAventGranted.value)
  navigateTo('/')
</script>

<template>
  <SectionContainer text-white>
    <h1>Calendrier</h1>

    <p>
      Bravo ! Tu as participé au calendrier de l'avent du Bar à Jeu Online 2023,
      Il est temps de rassembler les cases du calendrier tombées au fur et à mesure
      des jours et de les enregistrers ici.
    </p>
    <!-- check roles calendar 2023, if not show error page  -->
    <p>
      Réussi à compléter au moins une case pour valider ta participation à la tombola de Noel 2023.
      Chaque case enregistrée est un ticket vers la gloire.
    </p>
    <p>
      Je me demande se qu'il se passera si tu réussis à compléter tout le calendrier ?
    </p>
  </SectionContainer>
  <SectionContainer style="background-image: url(img/background-002.webp);" min-h-2xl bg-cover>
    <div grid grid-cols="2 md:5" gap="4 md:8">
      <div
        v-for="i in 24"
        :key="i"
        aspect="[4/3]" max-w="60 md:none" rounded-2 bg-white p-4 text-center shadow-md
      >
        <h2>{{ i }}</h2>
        <input type="text" placeholder="####" w-full b-1 b-beige-400 rounded-full bg-white p-2 text-center>
      </div>
    </div>
  </SectionContainer>
</template>
