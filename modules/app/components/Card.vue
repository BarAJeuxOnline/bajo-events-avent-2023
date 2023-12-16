<script setup lang="ts">
defineOptions({
  name: 'Card',
})
</script>

<template>
  <div
    rounded-2 bg-white shadow-lg
  >
    <h5 v-if="$slots.title" border-b-1 px-8 py-4>
      <slot name="title" />
    </h5>
    <div p-8>
      <slot />
    </div>
  </div>
</template>
