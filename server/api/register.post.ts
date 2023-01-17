import bcrypt from "bcrypt";
// import { connectToDB } from "@/utils/database";
import { v4 as uuidv4 } from "uuid";
import { Users } from "@/utils/models";

export default defineEventHandler(async (event) => {
  // connectToDB();
  const { firstname, lastname, password } = await readBody(event);

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
  await Users.create({
    firstName: firstname,
    lastName: lastname,
    passwordHash: await bcrypt.hash(password, 10),
    userAuthToken: uuidv4(),
  });
  return {
    success: true,
    message: "user successfully registered",
  };
});
