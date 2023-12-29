<script setup lang="ts">
defineOptions({
  name: 'Card',
})

defineProps<{
  title?: string
}>()
</script>

<template>
  <div rounded-2 bg="white/80" shadow-lg>
    <h5 v-if="title || $slots.title" border-b-1 px-8 py-4>
      <slot name="title">
        {{ title }}
      </slot>
    </h5>
    <div p-8>
      <slot />
    </div>
  </div>
</template>
