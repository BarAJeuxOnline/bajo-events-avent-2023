<script lang="ts" setup>
useNeige()
</script>

<template>
  <main h-full flex flex-col>
    <NavigationBar />
    <div flex-1>
      <slot />
    </div>
    <Footer />
  </main>
</template>
