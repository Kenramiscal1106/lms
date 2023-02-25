import { Query, QueryOptions } from "mongoose";
import { Courses } from "~~/utils/models";
import { UserSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "dbSession");
  const { limit, skip } = getQuery(event);
  let options: QueryOptions = {};
  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }
  if (skip && !Array.isArray(skip)) {
    options.skip = parseInt(skip);
  }
  if (limit && !Array.isArray(limit)) {
    options.limit = parseInt(limit);
  }
  let targetCourse = await Courses.findById(event.context.params?.courseid, {
    members: true,
  }).populate<{
    members: Pick<UserSchema, "lastName" | "firstName" | "username" | "_id">;
  }>({
    path: "members",
    options,
    select: ["lastName", "firstName", "username"],
  });
  return targetCourse;
});
