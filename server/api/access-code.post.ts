import { Users, Courses } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const { accessCode } = await readBody(event);

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
  console.log("update done");
  return {
    success: true,
  };
});
