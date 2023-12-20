<script setup lang="ts">
definePageMeta({
  name: 'Confirm',
  layout: 'default',
})

const user = useSupabaseUser()
const route = useRoute()

// error=server_error&error_code=500&error_description=Unable+to+exchange+external+code:+iiIMZR5kkKFv321suEKSVDqHXFcZjq
const error = computed(() => route.query.error
  ? {
      type: route.query.error,
      code: route.query.error_code,
      description: route.query.error_description,
    }
  : null)

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

onMounted(() => {
  if (error.value)
    showButton.value = true
})
</script>

<template>
  <div>
    <Card v-if="error" class="!bg-red-200" m-4 text-red-600>
      <h5 pt-0>
        Echec de connexion, une erreur est survenue
      </h5>
      <p>{{ error.description }}</p>
      <p>
        <RouterLink text-white btn to="/">
          Retourner à l'accueil
        </RouterLink>
      </p>
    </Card>

    <p v-else-if="showButton">
      <RouterLink text-white btn to="/">
        Retourner à l'accueil
      </RouterLink>
    </p>

    <p v-else text-white>
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
  </div>
</template>
