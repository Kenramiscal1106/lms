import { Courses } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    quizes: true,
  });
  if (targetCourse === null) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  const [quizDoc] = targetCourse.quizes.filter(
    (quiz) => quiz.materialId === event.context.params?.quizid
  );
  if (!quizDoc) {
    throw createError({
      statusCode: 404,
      message: "not found",
    });
  }
  return quizDoc;
});
