import { Courses } from "~~/utils/models";
import { UserSchema } from "~~/utils/types";

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
