import { Users, Courses } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const { accessCode } = await readBody(event);
  const sessionCookie = await getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      message: "unauthorized",
    });
  }

  const targetCourse = await Courses.findById(accessCode);
  const user = await Users.findOne({
    userAuthToken: sessionCookie,
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
        userAuthToken: sessionCookie,
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
