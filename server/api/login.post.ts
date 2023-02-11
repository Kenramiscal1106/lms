import bcrypt from "bcrypt";
import { Users } from "@/utils/models";
import { v4 as uuidv4 } from "uuid";

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
        message: "incorrect username and password",
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
      // server side only cookie so you can't use `document.cookie`
      httpOnly: false,
      // only requests from same site can send cookies
      // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
      sameSite: "strict",
      // only sent over HTTPS in production
      secure: process.env.NODE_ENV === "production",
      // set cookie to expire after a month
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch {
    // setResponseStatus(500);
    throw createError({
      statusCode: 500,
      message: "failed to update session",
    });
  }
  // setResponseStatus(200, "logged in");
  return {
    success: true,
    message: "successfully logged in",
  };
});
