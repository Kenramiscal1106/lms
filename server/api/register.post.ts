import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Users } from "@/utils/models";

export default defineEventHandler(async (event) => {
  const { firstname, lastname, password, username } = await readBody(event);

  const user = await Users.findOne({
    firstName: firstname,
    lastName: lastname,
  });

  if (user) {
    return {
      success: false,
      message: "user already set",
    };
  }
  try {
    await Users.create({
      firstName: firstname,
      lastName: lastname,
      username: username,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: uuidv4(),
    });
  } catch {
    throw createError({
      statusCode: 500,
      data: {
        success: false,
        message: "user failed to register",
      },
    });
  }
  return {
    success: true,
    message: "user successfully registered",
  };
});
