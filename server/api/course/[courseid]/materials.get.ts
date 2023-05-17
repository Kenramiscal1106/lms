import { Courses } from "~~/utils/models";
import { UserSchema } from "~~/utils/types";

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

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
