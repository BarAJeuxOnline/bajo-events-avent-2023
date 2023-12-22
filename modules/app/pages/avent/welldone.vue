<script setup lang="ts">
definePageMeta({
  name: 'WellDone',
  layout: 'default',
  middleware: ['avent'],
})

const side = ref(0)
</script>

<template>
  <SectionContainer text-white>
    <div row-container>
      <div flex-1>
        <h1>Félicitation !</h1>
        <p>Tu as réussi à compléter tout les morceaux du calendrier de l'avent et tu peux maintenant l'admirer ! Ce calendier a spécialement était conçus pour cet évènement</p>
      </div>
      <div flex-2>
        <TicketsCounter />
      </div>
    </div>
  </SectionContainer>

  <SectionContainer bg-emerald-5 min-h-2xl bg-cover>
    <img v-if="side === 0" src="/img/codes/avent_full_with_cases.png" alt="Calendrier de l'avent 2023" class="h-full w-full object-cover" cursor-pointer transition-transform hover:scale-102 btn-animation @click="() => side = 1">
    <img v-if="side === 1" src="/img/codes/avent_of_bajo.png" alt="Calendrier de l'avent 2023" class="h-full w-full object-cover" cursor-pointer transition-transform hover:scale-102 btn-animation @click="() => side = 0">
  </sectioncontainer>
</template>
