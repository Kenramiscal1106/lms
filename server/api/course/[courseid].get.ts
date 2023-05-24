import { Courses } from "~~/utils/models";

export default defineEventHandler(async (event) => {
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    name: true,
  });

  if (targetCourse === null) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return { name: targetCourse.name };
});
