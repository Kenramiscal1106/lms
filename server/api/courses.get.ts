import { Courses } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const courses = await Courses.find(
    {},
    {
      name: true,
    }
  )
    .where("members")
    .in([event.context.userId]);

  return {
    courses,
  };
});
