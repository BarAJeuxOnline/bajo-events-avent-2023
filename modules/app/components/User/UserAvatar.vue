<script setup lang="ts">
import { useImage } from '@vueuse/core'

defineOptions({
  name: 'UserAvatar',
})

const user = useSupabaseUser()
const {
  member,
  avatarUrl,
} = storeToRefs(useDiscord())

const styleAttr = computed(() => {
  if (member.value && avatarUrl.value)
    return { backgroundImage: `url(${avatarUrl.value})` }

  else if (member.value && !avatarUrl.value)
    return { backgroundImage: `url(https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.user_metadata?.username}&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&eyesColor=ffffff&mouthColor=ffffff)` }

  else
    return null
})

const { isLoading } = useImage(computed(() => ({ src: avatarUrl.value })))
</script>

<template>
  <div v-if="isLoading" inline-block h-8 w-8 rounded-full bg-cover shadow ring-2 ring-emerald>
    <Loader />
  </div>
  <div v-else inline-block h-8 w-8 rounded-full bg-cover shadow ring-2 ring-emerald :style="styleAttr" />
</template>
