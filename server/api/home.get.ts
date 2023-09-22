import { Courses } from "@/utils/models";
import { Post, UserSchema } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const courses = await Courses.find(
    {},
    {
      name: true,
      posts: true,
    }
  )
    .where("members")
    .in([event.context.userId])
    .populate<{
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
        {
          path: "course",
          select: {
            name: true,
          },
        },
      ],
    });
  if (courses.length === 0) {
    return {
      posts: [],
    };
  }
  const posts = courses
    .map((course) => course.posts)
    .reduce((prevPosts, nextPosts) => [...prevPosts, ...nextPosts])
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  return {
    posts,
  };
});
