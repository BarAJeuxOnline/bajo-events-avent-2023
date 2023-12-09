<script setup lang="ts">
definePageMeta({
  name: 'Confirm',
  layout: 'default',
})

const user = useSupabaseUser()

watch(user, () => {
  if (user.value)
    return navigateTo('/avent')
}, { immediate: true })
</script>

<template>
  <div>
    <p class="u-text-black">
      Redirecting...
    </p>
  </div>
</template>
