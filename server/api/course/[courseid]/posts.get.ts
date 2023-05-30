import type { QueryOptions } from "mongoose";
import { Courses } from "~/utils/models";
import { Post, UserSchema } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const { limit, skip } = getQuery(event);
  let options: QueryOptions = {};
  if (skip && typeof skip === "string") {
    options.skip = parseInt(skip);
  } else if (typeof skip === "number") {
    options.skip = skip;
  }
  if (limit && typeof limit === "string") {
    options.limit = parseInt(limit);
  } else if (typeof limit === "number") {
    options.limit = limit;
  }
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    posts: true,
  }).populate<{
    posts: (Omit<Post, "author"> & {
      author: Pick<UserSchema, "_id" | "firstName" | "lastName" | "username">;
    })[];
  }>({
    path: "posts",
    populate: [
      {
        path: "comments",
        select: {
          author: true,
          content: true,
        },
        populate: {
          path: "author",
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
      {
        path: "author",
        select: {
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    ],
    options,
  });
  if (!targetCourse) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return { posts: targetCourse.posts };
});
