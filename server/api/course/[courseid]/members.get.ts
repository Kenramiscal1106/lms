import { Query, QueryOptions } from "mongoose";
import { Courses } from "~~/utils/models";
import { UserSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const { limit, skip } = getQuery(event);
  let options: QueryOptions = {};

  if (skip && typeof skip === "string") {
    options.skip = parseInt(skip);
  }
  if (limit && typeof limit === "string") {
    options.limit = parseInt(limit);
  }
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    members: true,
  }).populate<{
    members: Pick<UserSchema, "lastName" | "firstName" | "username" | "_id">[];
  }>({
    path: "members",
    options,
    select: ["lastName", "firstName", "username"],
  });

  if (!targetCourse) {
    throw createError({
      message: "not found",
      statusCode: 404,
    });
  }
  return { members: targetCourse.members };
});
