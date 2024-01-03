export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAventGranted, member, user } = storeToRefs(useDiscord())
  const { calendar, loading, christmas, newYear } = storeToRefs(useAvent())

  if (user.value && !member.value)
    await until(member).not.toBeNull({ timeout: 10000 })

  if (!isAventGranted.value)
    return navigateTo('/')

  if (loading.value)
    await until(loading).toBe(false, { timeout: 10000 })

  if (to.path === '/avent/calendar' && !(calendar.value?.completed || christmas.value))
    return navigateTo('/avent')

  if (to.path === '/avent/tas' && !newYear.value)
    return navigateTo('/avent')
})
