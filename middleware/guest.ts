export default defineNuxtRouteMiddleware((to, from) => {
  if (useAuth().loggedIn) {
    console.log(`Navigation to "${to}" is denied by guest middleware`)
    return navigateTo(from)
  }
})
