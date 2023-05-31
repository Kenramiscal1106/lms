import { Users } from "~/utils/models";

export default defineEventHandler(async (event) => {
  if (event.path === "/api/courses" || event.path.startsWith("/api/course")) {
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
