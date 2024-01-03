<script setup lang="ts">
definePageMeta({
  name: 'Tombola',
  layout: 'default',
  middleware: ['avent'],
})

const { nickname } = useDiscord()
const { calendar } = useAvent()
</script>

<template>
  <SectionContainer text-white text-shadow>
    <div row-container>
      <div flex-1>
        <h1 text-shadow-lg>
          <Icon name="i-twemoji-confetti-ball" />
          Tombola de Noel 2023
        </h1>

        <p>
          Hello <strong>{{ nickname }}</strong>,<br>
          Bonne année ludique 2024, bonne santé et meilleurs voeux. Merci pour ta participation au calendrier de l'avent du BAJO.
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
    </p>
  </SectionContainer>

  <SectionContainer pattern-fence min-h-2xl shadow-inset shadow-2xl>
    <template v-if="calendar?.win_position > 0">
      <Card v-if="calendar?.win_position > 3" v-motion-slide-bottom max-w-md mx-auto>
        <h3 mt-0>
          Malheureusement, tu n'as pas été tiré au sort pour cette fois-ci.
        </h3>
        <h5 mt-16>
          Retente ta chance au prochain évènement <Icon name="i-twemoji-birthday-cake" />
        </h5>
      </Card>

      <Card v-else-if="calendar?.win_position <= 3" v-motion-slide-bottom max-w-md mx-auto>
        <h3 mt-0>
          Tu a gagné un mois d'abonnement premium sur la plateforme<br>
          <span underline>Board Game Arena</span>.
        </h3>
        <h5>Le code cadeau est</h5>
        <p block-4 font-bold bg-beige-200 rounded-6 shadow-inner text-green-500 text-2xl text-center>
          {{ calendar?.bga_gift_code || 'NOPE' }}
        </p>
        <p text-center>
          <a btn btn-lg bg-blue-5 text-white w-full href="https://boardgamearena.com/giftcodes" target="_blank">Utiliser mon code cadeau sur BGA</a>
        </p>

        <p>
          Pour rappel le délai de retrait des lots est d’une semaine, tu as donc une semaine pour l'utiliser ou l'enregistrer dans tes notes pour l'utiliser plus tard. Une fois ce délai passé, le site sera désactivé.
        </p>

        <p text-help>
          Quelques informations complémentaires :
          <ul list-circle pl-4>
            <li>L'abonnement cadeau a été acheté le 3 janvier 2024, il sera valable jusqu'au 3 janvier 2025.</li>
            <li>Si le code est activé le 14 février 2024, et qu'il s'agit d'un cadeau d'un mois, l'abonnement Premium offert se termine le 14 mars 2024.</li>
            <li>Si le code est activé sur un compte qui est déjà Premium, il prolongera le compte Premium pour la durée du cadeau, après l'expiration de l'abonnement Premium.</li>
            <li>Les codes d’abonnement Premium BGA non utilisés expireront dans un an. Le staff se réserve le droit de réattribuer les lots non utilisés 1 mois avant leur expiration pour éviter tout gâchis.</li>
          </ul>
        </p>

        <h5 mt-16>
          RDV au prochain évènement <Icon name="i-twemoji-birthday-cake" />
        </h5>
      </Card>

      <Card mt-16>
        <p mt-0 text-lg>
          À très vite pour des soirées jeux endiablées 🥰
        </p>
        <p>
          ...
        </p>
      </Card>
    </template>

    <template v-else>
      <Card max-w-md mx-auto>
        <h3 mt-0>
          Le TAS n'a pas encore eu lieu, reviens plus tard.
        </h3>
      </Card>
    </template>
  </SectionContainer>
</template>
