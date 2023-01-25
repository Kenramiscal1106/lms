import bcrypt from "bcrypt";
// import { connectToDB } from "@/utils/database";
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
      success: true,
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
    event.node.res.statusCode = 500;
    return {
      success: false,
      message: "database error",
    };
  }
  return {
    success: true,
    message: "user successfully registered",
  };
});
