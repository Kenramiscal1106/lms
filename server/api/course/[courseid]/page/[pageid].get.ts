import { Courses } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    pages: true,
  })
    .where("pages")
    .elemMatch({ materialId: event.context.params?.pageid });
  if (targetCourse === null) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  const result = targetCourse.pages[0];
  if (result === null) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return result;
});
