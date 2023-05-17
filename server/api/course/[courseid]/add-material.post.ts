import { Users, Courses } from "~/utils/models";

export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "dbSession");

  if (!sessionCookie) {
    throw createError({
      statusCode: 400,
      message: "expired/false session",
    });
  }
  // we want the routes to only be accessed by the teacher
  const targetCourse = await Courses.findById(event.context.params?.courseid, {
    members: true,
  });
  const user = await Users.findOne({
    userAuthToken: sessionCookie,
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

  targetCourse.update(
    {
      $push: {
        folderStructure: {
          name: body.name,
          type: body.type,
        },
      },
    },
    {},
    () => {
      console.log("triggered push");
    }
  );
  return {
    success: undefined,
  };
});
