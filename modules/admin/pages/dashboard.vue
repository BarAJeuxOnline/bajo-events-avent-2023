<script setup lang="ts">
definePageMeta({
  name: 'Dashboard',
  layout: 'default',
  middleware: 'auth',
})

const STAFF_ROLE_ID = '818112629607235594'

const { data: dataUsers, error: errorUsers, pending: pendingUsers } = await useFetch('/api/users')
const { data: dataCalendars, error: errorCalendar, pending: pendingCalendar } = await useFetch('/api/calendars')
const pending = computed(() => pendingUsers.value || pendingCalendar.value)

const users = computed(() => {
  // merging discord metadata and filtering out staff
  return dataUsers.value?.users.map(u => ({
    ...u,
    ...u.user_metadata.guildMember,
  })).filter(u => !u.roles.includes(STAFF_ROLE_ID)) ?? []
})

const calendars = computed(() => {
  return dataCalendars.value?.calendars.map(c => ({
    ...c,
    user: users.value.find(u => u.id === c.user),
  })).filter(c => c.user) ?? []
})

function getNick(user) {
  return user?.nick || user?.user?.global_name || user?.user?.username || 'un lutin'
}
</script>

<template>
  <SectionContainer>
    <h1 class="text-white text-shadow-lg">Dashboard</h1>

    <Loader v-if="pending" />

    <div row-container>
      <Card title="Nombre de membres">
        <h1 mt-0>{{ users.length }}</h1>
      </Card>
      <Card title="Nombre de Calendrier">
        <h1 mt-0>{{ calendars.length }}</h1>
      </Card>
      <Card title="Complété">
        <h1 mt-0>{{ calendars.filter(c => c.completed).length }}</h1>
      </Card>
      <Card title="Golden Ticket">
        <h1 mt-0>{{ calendars.filter(c => c.gold_ticket).length }}</h1>
      </Card>
    </div>

    <Card title="Calendars">
      <div flex flex-col gap-4>
        <Card v-for="calendar in calendars" :key="calendar.id">
          <div grid grid-cols-5>
            <p mt-0 font-bold text-lg>{{ getNick(calendar.user) }}</p>
            <p mt-0>
              <span uppercase text-xs text-gray>Nombre de tickets</span><br>
              <span>{{ calendar.total_tickets }}</span>
            </p>
            <p mt-0>
              <span uppercase text-xs text-gray>Complété</span><br>
              <span>{{ calendar.completed ? 'oui' : 'non' }}</span>
            </p>
            <p mt-0>
              <span uppercase text-xs text-gray>Golden ticket</span><br>
              <span>{{ calendar.gold_ticket ? 'trouvé' : 'non' }}</span>
            </p>
            <p mt-0>
              <span uppercase text-xs text-gray>a débuté le</span><br>
              <span>{{ new Date(calendar.created_at).toLocaleDateString() }}</span>
            </p>
          </div>
        </Card>
      </div>
    </Card>
  </SectionContainer>
</template>