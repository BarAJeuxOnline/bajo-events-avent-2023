<script setup lang="ts">
definePageMeta({
  name: 'Confirm',
  layout: 'default',
})

const user = useSupabaseUser()

const {
  member,
  isAventGranted,
} = storeToRefs(useDiscord())

whenever(member, async () => {
  await nextTick()
  if (isAventGranted.value)
    navigateTo('/avent')
  else
    navigateTo('/')
})

const showButton = useTimeout(5000)
</script>

<template>
  <div>
    <p text-white>
      <Loader />
      <template v-if="!user">
        Chargement de la liste du père Noel
      </template>
      <template v-else-if="!member">
        Chargement de la liste des lutins
      </template>
      <template v-else>
        Préparation des cadeaux pour les enfants sages
      </template>
      ...
    </p>
    <p v-if="showButton">
      <button btn>
        Retourner à l'accueil
      </button>
    </p>
  </div>
</template>
