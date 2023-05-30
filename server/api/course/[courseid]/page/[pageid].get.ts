import { Courses } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    pages: true,
  });
  if (targetCourse === null) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  const [pageDoc] = targetCourse.pages.filter(
    (page) => page.materialId === event.context.params?.pageid
  );
  if (!pageDoc) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return pageDoc;
});
