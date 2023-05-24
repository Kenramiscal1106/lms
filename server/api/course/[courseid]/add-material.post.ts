import { Users, Courses } from "~/utils/models";
import { v4 as randomUUID } from "uuid";

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
  const materialUID = randomUUID();
  let pushObj: any = {};
  if (body.type === "quiz") {
    pushObj[body.type + "es"] = {
      name: body.name,
      materialId: materialUID,
      published: false,
      deadline: "",
      instructions: "",
      items: [],
    };
  } else {
    pushObj[body.type + "s"] = {
      name: body.name,
      materialId: materialUID,
      published: false,
      deadline: "",
    };
  }
  console.log(pushObj);
  switch (body.type) {
    case "assignment": {
      pushObj.assignments.instructions = "";
      break;
    }

    case "page": {
      pushObj.pages.text = "";
      break;
    }

    case "forum": {
      pushObj.forums.query = "";
      break;
    }
  }
  Promise.allSettled([
    targetCourse.updateOne({
      $push: {
        folderStructure: {
          name: body.name,
          type: body.type,
          to: materialUID,
        },
      },
    }),
    targetCourse.updateOne({
      $push: pushObj,
    }),
  ]);
  return {
    success: true,
    message: "updated successfully",
  };
});
