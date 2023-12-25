<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { useMotions } from '@vueuse/motion'

definePageMeta({
  name: 'Calendar',
  layout: 'default',
  middleware: ['avent'],
})

const { getGoldenTicket } = useAvent()
const { calendar } = storeToRefs(useAvent())
const client = useSupabaseClient()
const side = ref('0')
const flip = ref(0)
const motions = useMotions()

const { isLoading: isLoadingCases } = useImage({ src: '/img/codes/avent_full_with_cases.webp' })
const { isLoading: isLoadingCalendar } = useImage({ src: '/img/codes/avent_full_with_cases.webp' })

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

whenever(() => flip.value === 10, async () => {
  getGoldenTicket()
}, { immediate: true })
</script>

<template>
  <div v-if="flip >= 10" v-motion-pop fixed inset-0 z-1000 centered bg="dark/50" flex-col>
    <button btn text-white @click="flip = -1">
      Ranger le ticket d'or<Icon name="i-mdi-close" icon-sm />
    </button>

    <GoldTicket v-motion-pop flex-2 font-extrabold px-16 mt-8>
      <p m-0 underline underline-offset-8 uppercase text-2xl>
        golden tickets
      </p>
      <p text-shadow-md text-6xl uppercase underline underline-offset-8>
        you win !
      </p>
      <p text-lg>
        5 tickets supplémentaire
      </p>
    </GoldTicket>

    <img absolute bottom-0 right-4 md:h-auto h="1/3" src="https://media0.giphy.com/media/sYGpCB44tS077gG909/giphy.gif?cid=ecf05e47ay73997okw58f21ph8j5okrwjf5ec65rvvqmots2&ep=v1_stickers_search&rid=giphy.gif&ct=s">
  </div>

  <SectionContainer text-white>
    <div row-container>
      <div flex-1>
        <template v-if="calendar?.completed">
          <h1>
            Félicitation ! <Icon name="i-twemoji-confetti-ball" />
          </h1>
          <p>
            Tu as réussi à compléter tout les morceaux du calendrier de l'avent ! <Icon name="i-twemoji-clinking-glasses" /> Spécialement conçu pour cet évènement,
            ce calendrier peut également servir de fond d’écran. Les animaux totem du staff du Bar à Jeux Online. y sont représentés.
          </p>
        </template>
        <template v-else>
          <h1>
            <Icon name="i-twemoji-wrapped-gift" mt--2 /> Joyeux Noel
          </h1>
          <p>
            Nous vous présentons le calendrier spécialement conçu pour cet évènement,
            ce calendrier peut également servir de fond d’écran. Les animaux totem du staff du Bar à Jeux Online. y sont représentés.
          </p>
        </template>

        <p>Tu peux maintenant l'admirer, le télécharger, le partager ... <Icon name="i-twemoji-sparkles" /></p>

        <p>
          Pssst Psssssst, j'ai entendu dire que notre <span v-tooltip="'Chief Bot Officer'" underline-dashed cursor-help>C.B.O.</span>
          aime cacher des easter eggs en dehors des fêtes de Pâques... <Icon name="i-twemoji-moai" />
        </p>
      </div>

      <div flex-2>
        <TicketsCounter />
      </div>
    </div>

    <p row-container gap-4>
      <NuxtLink btn to="/avent">
        <Icon name="i-mdi-arrow-left" icon-xs /> Retourner sur mes cases
      </NuxtLink>
      <button btn @click="downloadImage">
        <Icon name="i-mdi-download" icon-xs /> Télécharger le fond d'écran
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
        if (flip >= 0 && !calendar?.gold_ticket) {
          flip += 1
        }
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
        aspect="[32/21]" cursor-pointer select-none
        @click="() => side = side === '0' ? '1' : '0'"
      >
        <img
          :src="side === '0' ? '/img/codes/avent_full_with_cases.webp' : '/img/codes/avent_of_bajo.webp'"
          alt="Calendrier de l'avent 2023"
        >
      </div>
    </Transition>

    <div alert variant-info font-bold shadow-2xl mt-8>
      <p mt-0>
        N'hésite pas à retourner (en cliquant dessus) le calendrier pour observer l'image au complet sans les portes du calendrier. 🚪
      </p>
    </div>
  </SectionContainer>
</template>
