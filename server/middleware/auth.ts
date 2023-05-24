export default defineEventHandler((event) => {
  const sessionCookie = getCookie(event, "dbSession");
  console.log(event.path);
  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized access",
    });
  }
  event.context.sessionCookie = sessionCookie;
});
