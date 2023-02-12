import { Users } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const cookie = await readBody(event);

  if (!cookie) {
    throw createError({
      statusCode: 400,
      message: "unauthorized",
    });
  }

  const user = await Users.findOne({
    userAuthToken: cookie,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "session expired",
    });
  }

  return {
    message: "successfully logged in",
  };
});
