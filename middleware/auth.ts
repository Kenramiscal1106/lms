import { useUserSession } from "~~/composables/authUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUserSession();
  if (!user.isLoggedIn) {
    return navigateTo({
      path: "/login",
      query: {
        next: encodeURIComponent(from.path),
      },
    });
  }
});
