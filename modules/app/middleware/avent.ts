export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isAventGranted, member, user } = storeToRefs(useDiscord())

  if (user.value)
    await until(member).not.toBeNull({ timeout: 10000 })

  if (!isAventGranted.value)
    return navigateTo('/')

  const { calendar } = storeToRefs(useAvent())

  if (to.path === '/avent/welldone') {
    if (!calendar.value?.completed)
      return navigateTo('/avent')
  }
  else if (to.path === '/avent') {
    if (calendar.value?.completed)
      return navigateTo('/avent/welldone')
  }
})
