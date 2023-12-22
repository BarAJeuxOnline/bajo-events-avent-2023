<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { useMotions } from '@vueuse/motion'

definePageMeta({
  name: 'WellDone',
  layout: 'default',
  middleware: ['avent'],
})

const client = useSupabaseClient()

const side = ref('0')
const motions = useMotions()

const { isLoading: isLoadingCases } = useImage({ src: '/img/codes/avent_full_with_cases.png' })
const { isLoading: isLoadingCalendar } = useImage({ src: '/img/codes/avent_full_with_cases.png' })

const isLoading = computed(() => isLoadingCases.value || isLoadingCalendar.value)

async function downloadImage() {
  const { data } = await client
    .storage
    .from('avent')
    .download('avent_of_bajo.png')

  if (data) {
    const aElement = document.createElement('a')
    aElement.setAttribute('download', 'avent_of_bajo.png')
    const href = URL.createObjectURL(data)
    aElement.href = href
    aElement.setAttribute('target', '_blank')
    aElement.click()
    URL.revokeObjectURL(href)
  }
}
</script>

<template>
  <SectionContainer text-white>
    <div row-container>
      <div flex-1>
        <h1>Félicitation ! <Icon name="i-twemoji-confetti-ball" /> Tu as réussi à compléter tous les morceaux du calendrier de l'avent ! <Icon name="i-twemoji-clinking-glasses" /></h1>
        <p>Ce fond d'écran a été spécialement conçu pour cet évènement <Icon name="i-twemoji-two-hearts" /><br>Les animaux représentent les animaux totem du staff du Bar à Jeux Online. Ensemble, nous pouvons jouer à Ark Nova sans problème <Icon name="i-twemoji-face-with-hand-over-mouth" />.</p>
        <p>Tu peux maintenant l'admirer, le télécharger, le partager, etc ...</p>
        <p><Icon name="i-twemoji-sparkles" /> Pssst Psssssst, j'ai entendu dire que notre <span title="Chief Bot Officer" underline-dashed cursor-help>C.B.O.</span> aime cacher des easter eggs <Icon name="i-twemoji-egg" /> ...</p>
      </div>
      <div flex-2>
        <TicketsCounter />
      </div>
    </div>
    <p text-center>
      <button btn @click="downloadImage">
        Télécharger le fond d'écran
      </button>
    </p>
  </SectionContainer>

  <SectionContainer pattern-fence min-h-2xl bg-cover shadow-inset shadow-2xl>
    <div
      v-if="isLoading"
      h-screen
      flex
      items-center
      justify-center
    >
      <Loader />
    </div>

    <Transition
      v-else
      :css="false"
      mode="out-in"
      @leave="async (el, done) => {
        await motions.flipMotion.leave(done)
      }"
    >
      <div
        :key="side"
        v-motion="'flipMotion'"
        :initial="{
          rotateY: -90,
        }"
        :enter="{
          rotateY: 0,
        }"
        :leave="{
          rotateY: 90,
        }"
        aspect="[32/21]" cursor-pointer
        @click="() => side = side === '0' ? '1' : '0'"
      >
        <img
          :src="side === '0' ? '/img/codes/avent_full_with_cases.png' : '/img/codes/avent_of_bajo.png'"
          alt="Calendrier de l'avent 2023"
        >
      </div>
    </Transition>
    <div alert variant-info font-bold shadow-2xl mt-8>
      <p mt-0>
        N'hésite pas à retourner le calendrier pour observer l'image au complet sans les portes du calendrier. 🚪
      </p>
    </div>
  </SectionContainer>
</template>
