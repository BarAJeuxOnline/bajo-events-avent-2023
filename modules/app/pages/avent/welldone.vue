<script setup lang="ts">
defineOptions({
  name: 'WellDone',
  middleware: ['avent'],
})
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

  <SectionContainer style="background-image: url('/img/background-002.webp');" min-h-2xl bg-cover>
    <img src="/img/codes/avent_full_with_cases.png" alt="Calendrier de l'avent 2023" class="h-full w-full object-cover" cursor-pointer transition-transform hover:scale-102 btn-animation>
  </sectioncontainer>
</template>
