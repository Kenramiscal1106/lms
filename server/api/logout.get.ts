export default defineEventHandler((event) => {
  setCookie(event, "dbSession", "");
  return {
    message: "successfully logged out",
  };
});
