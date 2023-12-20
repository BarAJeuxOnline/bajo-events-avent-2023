<script setup lang="ts">
const { logout } = useDiscord()

const {
  member,
  nickname,
} = storeToRefs(useDiscord())
</script>

<template>
  <div pt-16 />
  <SectionContainer :padding="false" fixed top-0 z-200 w-full bg-beige-500 text-white shadow-lg>
    <div h-16 flex items-center justify-between>
      <NuxtLink to="/" btn btn-animation>
        <Icon name="i-mdi-home" h-8 w-8 />
      </NuxtLink>

      <template v-if="member">
        <span align-middle>
          <strong>{{ nickname }}</strong> <UserAvatar />
        </span>

        <button
          btn
          @click.prevent="() => logout()"
        >
          se déconnecter
        </button>
      </template>
    </div>
  </SectionContainer>
</template>
