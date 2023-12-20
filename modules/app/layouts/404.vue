<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main h-full gradient-greendark>
    <NavigationBar />

    <slot />
  </main>
</template>
