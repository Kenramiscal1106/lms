import { Users } from "@/utils/models";
import { CourseSchema, UserSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const user = await Users.findOne(
    {
      userAuthToken: event.context.sessionCookie,
    },
    {
      _id: true,
      courses: true,
      firstName: true,
      lastName: true,
      username: true,
      role: true,
    }
  ).populate<{ courses: Pick<CourseSchema, "_id" | "name">[] }>("courses", {
    name: true,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "session expired",
    });
  }

  return {
    _id: user._id.toString(),
    courses: user.courses,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    role: user.role,
  };
});
