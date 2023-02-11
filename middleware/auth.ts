import { useUserSession } from "~~/composables/authUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUserSession();
  console.log(user.isLoggedIn);
  if (!user.isLoggedIn) return navigateTo("/login");
});
