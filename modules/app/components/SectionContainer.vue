<script setup lang="ts">
defineOptions({
  name: 'SectionContainer',
})

withDefaults(defineProps<{
  padding?: boolean
}>(), {
  padding: true,
})
</script>

<template>
  <div
    :class="{
      'py-16 md:px-8 px-4': padding,
    }"
  >
    <section mx-auto container>
      <slot />
    </section>
  </div>
</template>
