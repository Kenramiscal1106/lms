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

  const posts = courses
    .map((course) => course.posts)
    .reduce((prevPosts, nextPosts) => [...prevPosts, ...nextPosts])
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  return {
    posts,
  };
});
