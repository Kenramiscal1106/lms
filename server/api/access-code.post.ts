import { Users, Courses } from "@/utils/models";
import { isValidObjectId } from "mongoose";

export default defineEventHandler(async (event) => {
  const { accessCode } = await readBody(event);
  if (!isValidObjectId(accessCode)) {
    throw createError({
      statusCode: 400,
      message: "bad Request",
    });
  }
  const targetCourse = await Courses.findById(accessCode);
  const user = await Users.findOne({
    userAuthToken: event.context.sessionCookie,
  });
  if (!targetCourse && !user) {
    throw createError({
      statusCode: 400,
      message: "bad Request",
    });
  }
  await Promise.allSettled([
    Users.updateOne(
      {
        userAuthToken: event.context.sessionCookie,
      },
      {
        $push: {
          courses: accessCode,
        },
      }
    ),
    Courses.findByIdAndUpdate(accessCode, {
      $push: {
        members: user && user._id,
      },
    }),
  ]);
  return {
    success: true,
  };
});
