export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAventGranted, member, user } = storeToRefs(useDiscord())
  const { calendar, loading } = storeToRefs(useAvent())

  if (user.value && !member.value)
    await until(member).not.toBeNull({ timeout: 10000 })

  if (!isAventGranted.value)
    return navigateTo('/')

  if (loading.value)
    await until(loading).toBe(false, { timeout: 10000 })

  if (to.path === '/avent/welldone' && !calendar.value?.completed)
    return navigateTo('/avent')

  if (to.path === '/avent' && calendar.value?.completed)
    return navigateTo('/avent/welldone')
})
