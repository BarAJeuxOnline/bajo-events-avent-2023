<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main h-full bg-emerald-5>
    <NavigationBar />
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <slot />
    <div>
      <button btn text-sm m="3 t8" @click="router.back()">
        Retour
      </button>
    </div>
    <Footer />
  </main>
</template>
