import { Courses } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    quizes: true,
  })
    .where("quizes")
    .elemMatch({ materialId: event.context.params?.pageid });
  if (targetCourse === null) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return targetCourse.quizes[0];
});
