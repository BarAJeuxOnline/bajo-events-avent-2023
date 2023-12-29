export default defineNuxtRouteMiddleware((_to, _from) => {
  const { user, isReady, isOwner } = storeToRefs(useDiscord())

  if (!isReady.value)
    return until(isReady).toBe(true, { timeout: 10000 })

  if (!user || !isOwner.value)
    return navigateTo('/')
})
