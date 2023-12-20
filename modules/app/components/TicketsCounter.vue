<script setup lang="ts">
defineOptions({
  name: 'Avent',
})

const { calendar, loading } = storeToRefs(useAvent())
</script>

<template>
  <div flex-2 relative m-4 from-amber-500 via-amber-200 to-amber-700 bg-gradient-linear bg-gradient-to-r p-8 text-center font-bold text-neutral-5 text-white>
    <span underline underline-offset-8 text-shadow-md>Nombre de tickets obtenus:</span><br>
    <Loader v-if="loading" text-4xl />
    <span v-else pt-2 text-4xl font-bold text-shadow-md>{{ calendar?.nbr_tickets || 0 }}</span> <Icon name="i-twemoji-admission-tickets" label="Discord" mt--4 text-2xl />
    <div absolute inset-4 border-b-1 border-t-1 border-white border-dashed />
    <div absolute inset-y-2 left-4 border-l-1 border-white border-dashed after:absolute before:absolute after:left--2 after:top--4 before:bottom--4 before:right--2 after:block before:block after:h-4 after:w-4 before:h-4 before:w-4 after:rounded-full before:rounded-full after:bg-green-500 before:bg-green-500 after:shadow-xl before:shadow-xl after:content-empty before:content-empty />
    <div absolute inset-y-2 right-4 border-r-1 border-white border-dashed after:absolute before:absolute after:left--2 after:top--4 before:bottom--4 before:right--2 after:block before:block after:h-4 after:w-4 before:h-4 before:w-4 after:rounded-full before:rounded-full after:bg-green-500 before:bg-green-500 after:shadow-xl before:shadow-xl after:content-empty before:content-empty />
  </div>
</template>

<style>
</style>
