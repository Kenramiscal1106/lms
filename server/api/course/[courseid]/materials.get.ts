import { Courses } from "~~/utils/models";

export default defineEventHandler(async (event) => {
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    folderStructure: true,
  });

  if (!targetCourse) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return { folderStructure: targetCourse.folderStructure };
});
