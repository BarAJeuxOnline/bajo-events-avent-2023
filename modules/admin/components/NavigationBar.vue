<script setup lang="ts">
const { logout } = useDiscord()

const {
  member,
  nickname,
} = storeToRefs(useDiscord())
</script>

<template>
  <div pt-16 />
  <SectionContainer :padding="false" md:px-8 px-4 fixed top-0 z-200 w-full bg-beige-500 text-white shadow-lg>
    <div h-16 flex gap-4 centered>
      <NuxtLink to="/" btn>
        <Icon name="i-mdi-home" h-8 w-8 />
      </NuxtLink>

      <div flex-1 />

      <template v-if="member">
        <p mt-0 centered gap-4>
          <strong>{{ nickname }}</strong> <UserAvatar />
        </p>

        <button
          btn
          @click.prevent="() => logout()"
        >
          se déconnecter
        </button>
      </template>

      <button
        v-else
        btn
        @click.prevent="() => login()"
      >
        se connecter
      </button>
    </div>
  </SectionContainer>
</template>
