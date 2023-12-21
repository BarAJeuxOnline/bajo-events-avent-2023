<script setup>
const error = useError()

function handleError() {
  clearError({
    redirect: '/',
  })
}
</script>

<template>
  <NuxtLayout>
    <template v-if="error">
      <!-- 404 -->
      <SectionContainer
        v-if="error.statusCode === 404"
        text-center text-white text-shadow-lg
      >
        <h1 mt-16 text-8xl>
          404
        </h1>
        <h3>T'es perdu ?</h3>
        <h3>Retrouve pleins d'amis joueurs sur notre fabuleux Discord !</h3>
        <div mt-16>
          <iframe mx-auto src="https://discord.com/widget?id=691614580945715231&amp;theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" data-dashlane-frameid="845" />
        </div>
      </SectionContainer>

      <!-- Other -->
      <SectionContainer v-else>
        <h1>Dang</h1>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
        <p>It looks like something broke.</p>
        <p>Sorry about that.</p>
      </SectionContainer>
    </template>

    <SectionContainer>
      <p text-center text-white>
        Retourner
        <a link @click="handleError">
          à l'acceuil
        </a>
      </p>
    </SectionContainer>
  </NuxtLayout>
</template>
