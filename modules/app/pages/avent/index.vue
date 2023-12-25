<script setup lang="ts">
definePageMeta({
  name: 'Avent',
  layout: 'default',
  middleware: ['avent'],
})

const { updateCodes } = useAvent()
const { calendar, updating, loading } = storeToRefs(useAvent())

const codesModel = ref<string[]>([])
const isChristmas = computed(() => {
  const now = new Date()
  const month = now.getMonth()
  const day = now.getDate()

  return month === 11 && day === 25
})

whenever(calendar, async (newCalendar) => {
  if (newCalendar.completed) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return navigateTo('/avent/calendar')
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
        <h1 text-shadow-lg>
          <Icon name="i-twemoji-calendar" />
          Calendrier de l'avent 2023
        </h1>

        <p>
          Il est temps de rassembler les cases du calendrier de l'avent tombées au fur et à mesure des jours et de les enregistrer ici. <Icon name="i-twemoji-floppy-disk" /><br>
          Complète au moins une case pour valider ta participation à la tombola de Noel. <Icon name="i-twemoji-santa-claus" /><br>
          Chaque case enregistrée est un ticket vers la gloire. <Icon name="i-twemoji-sparkles" />
        </p>
        <p>
          C'est Noel ! Une surprise t’attend si tu réussis à compléter le calendrier en entier. <Icon name="i-twemoji-wrapped-gift" />
        </p>
        <p>Tu as jusqu’à la fin de l’année, c’est à dire le 31 décembre 2023 à 23h59 pour le compléter. La tombola se déroulera le jour de la reprise des animations sur le BAJO, le <strong>2 janvier à 20h</strong> ! <Icon name="i-twemoji-hugging-face" /></p>
      </div>

      <div flex-2>
        <TicketsCounter />
      </div>
    </div>

    <div v-if="isChristmas">
      <p text-center>
        <button
          v-motion-pop
          bg-blue-600 text-white shadow-md btn btn-lg
          @click="() => navigateTo('/avent/calendar')"
        >
          <Icon name="i-twemoji-wrapped-gift" mr-2 /> Découvrir le calendrier de l'avent
        </button>
      </p>
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
