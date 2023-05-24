export default defineEventHandler((event) => {
  const sessionCookie = getCookie(event, "dbSession");
  // console.log(event.path);
  if (
    !sessionCookie &&
    event.path !== "/favicon.ico" &&
    event.path.startsWith("/api") &&
    event.path !== "/api/login" &&
    event.path !== "/api/register"
  ) {
    throw createError({
      statusCode: 400,
      message: "unauthorized access",
    });
  }
  event.context.sessionCookie = sessionCookie;
});
