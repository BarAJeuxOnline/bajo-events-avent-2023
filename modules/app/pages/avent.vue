<script setup lang="ts">
definePageMeta({
  name: 'Avent',
  layout: 'default',
  middleware: 'avent',
})

interface SupabaseEventAventCalendar {
  id: string
  member: string
  codes: string
  created_at: string
  updated_at: string
}

const client = useSupabaseClient()
const user = useSupabaseUser()

const codes = ref<string[]>([])
const calendar = ref<SupabaseEventAventCalendar | null>(null)
const isLoading = ref<boolean>(true)

onMounted(async () => {
  isLoading.value = true

  const { data } = await client
    .from('event_avent_calendar')
    .select('*')
    .eq('member', user.value?.id)

  // TODO: handle error

  if (data && data.length > 0) { calendar.value = data[0] }
  else {
    const { data } = await client
      .from('event_avent_calendar')
      .insert({
        member: user.value?.id,
        codes: [],
      })

    // TODO: handle error

    if (data && data.length > 0)
      calendar.value = data[0]
  }

  if (calendar.value)
    codes.value = calendar.value.codes

  isLoading.value = false
})

async function updateCodes(newCodes) {
  return await client
    .from('event_avent_calendar')
    .update({
      codes: toRaw(newCodes),
    })
    .eq('id', calendar.value?.id)
}

watchDebounced(codes, async (newCodes) => {
  const formattedCodes = newCodes.map(code => code && code.trim().slice(0, 4).toUpperCase())
  await updateCodes(formattedCodes)
  codes.value = formattedCodes
}, { debounce: 500, maxWait: 1000, deep: true })
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
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else grid grid-cols="2 md:5" gap="4 md:8">
      <div
        v-for="i in 24"
        :key="i"
        aspect="[4/3]" max-w="60 md:none" rounded-2 bg-white p-4 text-center shadow-md
      >
        <h2>{{ i }}</h2>
        <input
          v-model.trim="codes[i - 1]"
          type="text"
          placeholder="####"
          maxlength="4"
          w-full b-1 b-beige-400 rounded-full bg-white p-2 text-center
        >
      </div>
    </div>
  </SectionContainer>
</template>
