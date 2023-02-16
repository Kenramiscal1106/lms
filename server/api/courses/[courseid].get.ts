import { Courses } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    name: true,
    members: true,
  }).populate("members", {
    firstName: true,
    lastName: true,
    username: true,
  });

  return targetCourse;
});
