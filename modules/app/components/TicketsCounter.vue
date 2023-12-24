<script setup lang="ts">
defineOptions({
  name: 'Avent',
})

const { calendar, loading } = storeToRefs(useAvent())
</script>

<template>
  <GoldTicket v-motion-roll-right flex-2 font-extrabold>
    <p m-0 underline underline-offset-8 uppercase text-2xl>
      bajo tickets
    </p>
    <p text-shadow-md>
      <Loader v-if="loading" text-4xl />
      <span v-else text-6xl>{{ calendar?.total_tickets ?? 0 }}</span>
    </p>
  </GoldTicket>
</template>

<style>
</style>
