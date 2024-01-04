<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'

definePageMeta({
  name: 'TAS',
  layout: 'default',
  middleware: 'auth',
})

const TIMEOUT = 1500

const { getNick } = useData()
const { loading, calendars } = storeToRefs(useData())

const winners = ref([])
const inProgress = ref(false)

const 

const tickets = computed(() => calendars.value.map(calendar =>
  winners.value.find(w => w.id === calendar.user?.id) ?
    [] :
    new Array(calendar.total_tickets).fill(calendar.user)
).flat())

function chooseAWinner() {
  const ticketsRef = tickets.value
  winners.value.push(ticketsRef[Math.floor(Math.random() * ticketsRef.length)])
}

async function launchTAS() {
  inProgress.value = true
  await nextTick()
  await promiseTimeout(TIMEOUT)
  chooseAWinner()
  await promiseTimeout(TIMEOUT)
  chooseAWinner()
  await promiseTimeout(TIMEOUT)
  chooseAWinner()
  await nextTick()
  inProgress.value = false
}

function resetTAS() {
  winners.value = []
}

async function saveWinners() {
  const { data, error } = await useFetch('/api/tas', {
    method: 'POST',
    body: JSON.stringify(winners.value.map(w => w.id)),
  })
}
</script>

<template>
  <SectionContainer>
    <h1 class="text-white text-shadow-lg">Tombola 2024</h1>

    <p v-if="loading"><Loader />loading data ...</p>

    <p row-container gap-4>
      <button
       bg-blue-600 text-white shadow-md btn btn-lg
       v-if="inProgress === false && winners.length === 0"
       :disabled="winners.length > 0"
       @click="() => { launchTAS() }"
      >
        Lancer la tombola
      </button>
      <button
      text-white shadow-md btn btn-lg
        v-if="winners.length > 0 && inProgress === false"
        :disabled="winners.length === 0"
        @click="() => { resetTAS() }"
      >
        Reset
      </button>
      <button
       shadow-md btn variant-success btn-lg
        v-if="winners.length > 0 && inProgress === false"
        @click="() => { saveWinners() }"
      >
        <Icon name="i-twemoji-confetti-ball" mr-2 /> Bravo ! Sauvegarder les résultats
      </button>
    </p>

    <p v-if="inProgress">
      Tirage au sort en cours ... <Loader />
    </p>
  </SectionContainer>

  <SectionContainer pattern-fence shadow-inner>
    <div row-container justify-center>
      <Card v-for="winner in winners" v-motion-pop>
        <template #title>{{ getNick(winner) }}</template>
        <p>Avec {{ calendars.find(c => c.user.id === winner.id).total_tickets }} tickets</p>
        <p text-2xl text-center>
          <Icon name="i-twemoji-confetti-ball" />
          <Icon name="i-twemoji-confetti-ball" />
          <Icon name="i-twemoji-confetti-ball" />
        </p>
      </Card>
    </div>

    <div mt-16 alert variant-success v-if="winners.length === 3" v-motion-pop max-w-md mx-auto>
      Bravo, les 3 gagnants ont été tirés au sort ! Retrouvez les résultats sur vos espaces sur le site https://avent.barajeuxonline.fr.
    </div>
  </SectionContainer>
</template>