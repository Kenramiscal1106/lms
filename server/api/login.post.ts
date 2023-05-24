import bcrypt from "bcrypt";
import { Users } from "@/utils/models";
import { v4 as uuidv4 } from "uuid";

const WEEK = 60 * 60 * 24;

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const user = await Users.findOne({
    username,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        message: "incorrect username or password",
      },
    });
  }

  if (!user.passwordHash) {
    throw createError({
      statusCode: 500,
      data: {
        success: false,
        message: "password hash on database not present",
      },
    });
  }
  const pwCompare = await bcrypt.compare(password, user.passwordHash);
  console.log(pwCompare);
  if (!pwCompare) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        message: "incorrect username or password",
      },
    });
  }
  try {
    user.userAuthToken = uuidv4();
    user.save();
    setCookie(event, "dbSession", user.userAuthToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: WEEK,
    });
  } catch {
    throw createError({
      statusCode: 500,
      message: "failed to update session",
    });
  }
  return {
    success: true,
    message: "successfully logged in",
  };
});
