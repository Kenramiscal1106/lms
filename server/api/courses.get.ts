import { Users } from "@/utils/models";
import { CourseSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const user = await Users.findOne(
    {
      userAuthToken: sessionCookie,
    },
    {
      courses: true,
      username: true,
    }
  ).populate<{ courses: Pick<CourseSchema, "name" | "_id">[] }>("courses", {
    name: true,
  });

  // console.log(user);
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
