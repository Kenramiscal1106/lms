// import type { QueryOptions } from "mongoose";
import mongoose from "mongoose";
import { Courses, Posts } from "~/utils/models";

export default defineEventHandler(
  async (
    event
  ): Promise<{
    success: boolean;
    message: string;
    type: string;
  }> => {
    const body = await readBody(event);

    const post = new Posts({
      author: event.context.userId,
      content: body.content,
      comments: [],
      course: new mongoose.Types.ObjectId(event.context.params?.courseid),
      isComment: false,
    });
    try {
      Promise.allSettled([
        Courses.findByIdAndUpdate(event.context.params?.courseid, {
          $push: {
            posts: post._id,
          },
        }).exec(),

        post.save(),
      ]);
    } catch {
      throw createError({
        statusCode: 500,
        message: "unable to write to database",
        data: {
          success: false,
          type: "error",
          message: "unable to write to database (status: 500)",
        },
      });
    }
    return {
      success: true,
      type: "error",
      message: "uploaded post",
    };
  }
);
