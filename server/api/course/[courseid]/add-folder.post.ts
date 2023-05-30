import { Users, Courses } from "~/utils/models";

export default defineEventHandler(async (event) => {
  // we want the routes to only be accessed by the teacher
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    members: true,
  });
  const user = await Users.findOne({
    userAuthToken: event.context.sessionCookie,
  });
  if (!targetCourse || user === null) {
    throw createError({
      statusCode: 400,
      message: "user is null/targetCourse not found",
    });
  }

  if (
    typeof targetCourse.members.find(
      (member) => member.toString() === user._id.toString()
    ) === "undefined"
  ) {
    throw createError({
      statusCode: 400,
      message: "you're not a member",
    });
  }

  const body = await readBody(event);

  targetCourse.updateOne(
    {
      $push: {
        folderStructure: {
          name: body.name,
          type: "folder",
          children: [],
        },
      },
    },
    {}
  );
  return {
    success: undefined,
  };
});
