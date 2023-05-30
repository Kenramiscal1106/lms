import { Users } from "~/utils/models";

export default defineEventHandler(async (event) => {
  console.log(event.context);
  if (event.path.startsWith("/api") && event.path === "/api/courses") {
    const user = await Users.findOne({
      userAuthToken: event.context.sessionCookie,
    });
    if (!user) {
      throw createError({
        statusCode: 400,
        message: "session expired",
      });
    }
    event.context.userId = user._id;
  }
});
