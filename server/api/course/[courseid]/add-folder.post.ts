import { Users, Courses } from "~/utils/models";

export default defineEventHandler(
  async (
    event
  ): Promise<{
    success: boolean;
    message: string;
    type: string;
  }> => {
    // we want the routes to only be accessed by the teacher
    const targetCourse = await Courses.findById(
      event.context.params?.courseid,
      {
        members: true,
      }
    );
    if (!targetCourse) {
      throw createError({
        statusCode: 400,
        message: "user is null/targetCourse not found",
      });
    }

    if (
      typeof targetCourse.members.find(
        (member) => member.toString() === event.context.userId.toString()
      ) === "undefined"
    ) {
      throw createError({
        statusCode: 400,
        message: "you're not a member",
      });
    }

    const body = await readBody(event);
    Promise.allSettled([
      targetCourse.updateOne({
        $push: {
          folderStructure: {
            name: body.name,
            type: "folder",
            children: [],
          },
        },
      }),
    ]);
    return {
      success: true,
      type: "success",
      message: "updated successfully",
    };
  }
);
