import { Users, Courses } from "@/utils/models";
import { CourseSchema } from "~~/utils/types";

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
