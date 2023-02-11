import { Users } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const sessionCookie = await getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const user = await Users.findOne({
    userAuthToken: sessionCookie,
  })
    .populate("courses")
    .select("courses");

  console.log(user);
  if (!user) {
    throw createError({
      statusCode: 400,
      message: "session expired",
    });
  }

  return {
    courses: user.courses,
  };
});
