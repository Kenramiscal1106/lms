import { Users } from "@/utils/models";
import { CourseSchema, UserSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const cookie = await readBody(event);

  if (!cookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const user = await Users.findOne(
    {
      userAuthToken: cookie,
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

  return user;
});
