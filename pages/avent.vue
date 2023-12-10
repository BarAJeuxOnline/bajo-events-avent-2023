<script setup lang="ts">
definePageMeta({
  name: 'Avent',
  layout: 'default',
})
</script>

<template>
  <SectionContainer style="background-image: url(img/background-002.webp);" min-h-2xl bg-cover>
    <!--
      <button btn btn-lg btn-square>
        Un beau Button
      </button>
    -->

    <div grid grid-cols-5 gap-4>
      <div v-for="i in 24" h-32 w-40 rounded-2 bg-white p-4 text-center shadow-md>
        <h2>{{ i }}</h2>
        <input type="text" placeholder="####" w-full b-1 b-beige-400 rounded-full bg-white p-2 text-center>
      </div>
    </div>
  </SectionContainer>
</template>
