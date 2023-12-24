<script setup lang="ts">
definePageMeta({
  name: 'Avent',
  layout: 'default',
  middleware: ['avent'],
})

const { updateCodes } = useAvent()
const { calendar, updating, loading } = storeToRefs(useAvent())
const codesModel = ref<string[]>([])

whenever(calendar, async (newCalendar) => {
  if (newCalendar.completed) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return navigateTo('/avent/welldone')
  }

  else if (codesModel.value.length === 0) { codesModel.value = newCalendar.codes?.slice() || [] }
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
  <SectionContainer text-white text-shadow>
    <div row-container>
      <div flex-1>
        <h1>Calendrier</h1>

        <p>
          Bravo ! Tu as participé au calendrier de l'avent du Bar à Jeu Online 2023.<br>
          Il est temps de rassembler les cases du calendrier tombées au fur et à mesure des jours et de les enregistrer ici. <Icon name="i-twemoji-floppy-disk" />
        </p>

        <p>
          Réussi à compléter au moins une case pour valider ta participation à la tombola de Noel 2023.
          <Icon name="i-twemoji-sparkles" /> Chaque case enregistrée est un ticket vers la gloire.
        </p>

        <p>
          Que se passera t'il si tu réussis à compléter tout le calendrier ? <Icon name="i-twemoji-see-no-evil-monkey" /><br>
          C'est Noel ! Aide toi de tes proches sur le BAJO pour essayer de le compléter ~ Un blackmarket <Icon name="i-twemoji-eyes" /> <Icon name="i-twemoji-face-with-peeking-eye" />
        </p>
      </div>
      <div flex-2>
        <TicketsCounter />
      </div>
    </div>
  </SectionContainer>

  <SectionContainer pattern-fence min-h-2xl shadow-inset shadow-2xl>
    <div
      v-if="!loading" v-motion-slide-bottom grid grid-cols="2 md:5"
      gap="4 md:8"
    >
      <div
        v-for="i in 24"
        :key="i"
        aspect="[4/3]" max-w="60 md:none" relative flex items-center justify-center rounded-2 bg-white text-center shadow-md overflow-hidden
      >
        <div v-if="calendar?.validated_codes?.[i - 1]" absolute inset-0 flex items-center justify-center>
          <img :src="`/img/codes/case_${i}_${calendar.validated_codes[i - 1]}.png`" max-w-full w-full>
        </div>
        <div v-else p-4 relative>
          <Loader v-if="updating" h-4 w-4 lg:h-6 lg:w-6 text-green-300 absolute top-2 left-2 />
          <h2 mt-0 md:text-2xl lg:text-5xl>
            {{ i }}
          </h2>
          <input
            v-model.trim="codesModel[i - 1]"
            type="text"
            placeholder="####"
            maxlength="4"
            w-full b-1 b-beige-400 rounded-full bg-white p-2 text-center mt-2 md:mt-0 lg:mt-2
          >
        </div>
      </div>
    </div>
  </SectionContainer>
</template>
