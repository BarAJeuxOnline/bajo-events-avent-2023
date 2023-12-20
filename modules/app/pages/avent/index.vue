<script setup lang="ts">
definePageMeta({
  name: 'Avent',
  layout: 'default',
  middleware: 'avent',
})

const { updateCodes } = useAvent()
const { calendar, updating, loading } = storeToRefs(useAvent())

const codesModel = ref<string[]>([])

whenever(calendar, (newCalendar) => {
  if (newCalendar.completed)
    navigateTo('/avent/welldone')

  else
    codesModel.value = newCalendar.codes?.slice() || []
}, { immediate: true })

watchDebounced(codesModel, async (newCodes) => {
  const raw = toRaw(newCodes)
  const formattedCodes = raw.map(code => code && code.trim().slice(0, 4).toUpperCase())

  if (formattedCodes.toString() === calendar.value?.codes?.toString())
    return

  await updateCodes(formattedCodes)
}, { debounce: 1000, maxWait: 2000, deep: true })
</script>

<template>
  <SectionContainer text-white>
    <div row-container>
      <div flex-1>
        <h1>Calendrier</h1>

        <p>
          Bravo ! Tu as participé au calendrier de l'avent du Bar à Jeu Online 2023,
          Il est temps de rassembler les cases du calendrier tombées au fur et à mesure
          des jours et de les enregistrers ici.
        </p>

        <p>
          Réussi à compléter au moins une case pour valider ta participation à la tombola de Noel 2023.
          Chaque case enregistrée est un ticket vers la gloire.
        </p>
        <p>
          Je me demande se qu'il se passera si tu réussis à compléter tout le calendrier ?
        </p>
      </div>
      <div flex-2>
        <TicketsCounter />
      </div>
    </div>
  </SectionContainer>

  <SectionContainer style="background-image: url(img/background-002.webp);" min-h-2xl bg-cover>
    <div v-if="!loading" grid grid-cols="2 md:5" gap="4 md:8">
      <div
        v-for="i in 24"
        :key="i"
        aspect="[4/3]" max-w="60 md:none" relative flex items-center justify-center rounded-2 bg-white text-center shadow-md
      >
        <div v-if="calendar?.validated_codes?.[i - 1]" absolute inset-0 flex items-center justify-center bg="white/20">
          <img :src="`/img/codes/case_${i}_${calendar.validated_codes[i - 1]}.png`" max-w-full w-full>
        </div>
        <template v-else>
          <div v-if="updating" absolute inset-0 bg="white/70" flex items-center justify-center>
            <Loader h-8 w-8 text-gray-300 />
          </div>
          <div p-4>
            <h2 mt-0>
              {{ i }}
            </h2>
            <input
              v-model.trim="codesModel[i - 1]"
              type="text"
              placeholder="####"
              maxlength="4"
              w-full b-1 b-beige-400 rounded-full bg-white p-2 text-center
            >
          </div>
        </template>
      </div>
    </div>
  </sectioncontainer>
</template>
