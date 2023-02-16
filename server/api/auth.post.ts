import { Users } from "@/utils/models";
import { CourseSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const cookie = await readBody(event);

  if (!cookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const user = await Users.findOne({
    userAuthToken: cookie,
  }).populate<{ courses: Pick<CourseSchema, "_id" | "name"> }>("courses", {
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
