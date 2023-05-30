// import type { QueryOptions } from "mongoose";
import mongoose from "mongoose";
import { Courses, Posts } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const post = new Posts({
    author: new mongoose.Types.ObjectId(body.authorId),
    content: body.content,
    comments: [],
    courseId: new mongoose.Types.ObjectId(event.context.params?.courseid),
    isComment: false,
  });
  const targetCourse = Courses.findByIdAndUpdate(
    event.context.params?.courseid,
    {
      $push: {
        posts: post._id,
      },
    }
  ).exec();

  post.save();
  return {
    success: true,
  };
});
