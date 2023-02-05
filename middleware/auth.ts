// import { Users } from "@/utils/models";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const session = useCookie("dbSession");

  const data = await $fetch("/api/auth");
  console.log({ to, from });
  // if (to.path === "/login" && error.value !== null) return;
  if (to.path === "/login" || to.path === "/register") return;
  if (data !== null) {
    // console.log(error.value);
    return navigateTo("/login");
  }
  /* if (!session && from.path !== "/login") {
    navigateTo("/login");
  }
  if (!process.server) return;
  const user = await Users.findOne({
    userAuthToken: session.value,
  });

  if (!user && from.path !== "/login") {
    navigateTo("/login");
  } */
  /* 
  const session = event.cookies.get('session')

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // find the user based on the session
  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, role: true },
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role.name,
    }
  }

  
  */
});
