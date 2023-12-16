export default defineNuxtRouteMiddleware((_to, _from) => {
  const {
    isAventGranted,
  } = storeToRefs(useDiscord())

  if (!isAventGranted.value)
    navigateTo('/')
})
