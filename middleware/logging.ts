export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUserSession();
  if (user.isLoggedIn) {
    return navigateTo("/");
  }
});
