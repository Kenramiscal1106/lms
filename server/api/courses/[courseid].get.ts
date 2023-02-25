import { Courses } from "~~/utils/models";
import { UserSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const targetCourse = await Courses.findById(
    event.context.params?.courseid
  ).populate<{
    members: Pick<UserSchema, "lastName" | "firstName" | "username" | "_id">[];
  }>("members", {
    firstName: true,
    lastName: true,
    username: true,
  });

  return targetCourse;
});
